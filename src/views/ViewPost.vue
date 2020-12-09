<template>
  <div class="viewpost-view">
    <v-icon
      size="42"
      color="primary"
      style="position: absolute; z-index: 2; left: 2px; top: 3px; cursor: pointer"
      @click="navigateBack"
    >
      mdi-chevron-left-circle
    </v-icon>
    <div class="post-container">
      <div class="container-left">
        <v-card
          elevation="2"
          style="z-index: 1;"
          min-width="900"
          max-width="900"
        >
          <v-card-title>{{ currentPost.title }}</v-card-title>

          <v-card-subtitle>{{ currentPost.author }}</v-card-subtitle>
          <v-card-text
            ><pre>{{ currentPost.text }}</pre></v-card-text
          >
        </v-card>
        <div class="comment" v-if="isLoggedIn">
          <v-text-field
            style="margin: 20px 0 0 5px;"
            placeholder="Comment..."
            v-model="text"
            @keydown.enter="submitComment"
          ></v-text-field>
          <div class="comment-buttons">
            <v-btn style="margin-right: 5px" text @click="cancelComment"
              >Cancel</v-btn
            >
            <v-btn color="primary" @click="submitComment">Comment</v-btn>
          </div>
        </div>
        <div v-else class="comment">
          <p style="margin: 20px 0 0 5px;">
            Please <router-link to="/login">sign in</router-link> to vote and
            comment.
          </p>
        </div>

        <div class="comments">
          <template>
            <v-card class="mx-auto" tile>
              <div v-for="comment in allComments" :key="comment._id">
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-subtitle>{{
                      comment.author
                    }}</v-list-item-subtitle>
                    {{ comment.text }}
                  </v-list-item-content>
                </v-list-item>
                <v-divider style="margin: 0 14px 0 14px"></v-divider>
              </div>
            </v-card>
          </template>
        </div>
      </div>
      <div class="container-right">
        <v-card min-width="300">
          <v-card-title>Post Info</v-card-title>
          <v-card-subtitle>Some simple post data</v-card-subtitle>
          <div class="post-info">
            <v-icon size="32" color="blue">
              mdi-comment-multiple
            </v-icon>
            <span style="margin-left: 10px; font-size: 12px"
              >{{ allComments.length }}
              <span v-if="allComments.length == 1"> comment</span>
              <span v-else> comments</span>
            </span>
          </div>
          <div class="post-votes">
            <div>
              <v-btn
                class="mx-2"
                :disabled="oldVote === 1 || oldVote === 3"
                fab
                :dark="oldVote === 0 || oldVote === 2"
                small
                color="green"
                value="1"
                @click="vote($event)"
              >
                <v-icon>
                  mdi-thumb-up
                </v-icon>
              </v-btn>
              <div class="btn-text" style="color: green;">{{ upVotes }}</div>
            </div>
            <div>
              <v-btn
                class="mx-2"
                :disabled="oldVote === 0 || oldVote === 3"
                fab
                :dark="oldVote === 1 || oldVote === 2"
                small
                color="red"
                value="0"
                @click="vote($event)"
              >
                <v-icon>
                  mdi-thumb-down
                </v-icon>
              </v-btn>
              <div class="btn-text" style="color: red;">{{ downVotes }}</div>
            </div>
            <div class="txt-small-vote" v-if="haveVoted && isLoggedIn">
              You voted
              <b
                ><span style="color: green" v-if="oldVote">up</span
                ><span style="color: red" v-else>down</span></b
              >.
            </div>
            <div class="txt-small-vote" v-else-if="!isLoggedIn">
              You are not logged in.
            </div>
          </div>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ViewPost",
  computed: {
    ...mapGetters(["currentPost", "user", "allComments", "isLoggedIn"]),
    upVotes() {
      return this.currentPost.votes.filter((vote) => vote.type === 1).length;
    },
    downVotes() {
      return this.currentPost.votes.filter((vote) => vote.type === 0).length;
    },
    haveVoted() {
      let res = this.currentPost.votes.find(
        (vote) => vote.userId === this.user._id
      );
      if (res) {
        return true;
      }
      return false;
    },
    oldVote() {
      if (this.isLoggedIn) {
        let res = this.haveVoted;
        if (res) {
          let thisVote = this.currentPost.votes.find(
            (vote) => vote.type !== null && vote.userId == this.user._id
          );
          return thisVote.type;
        } else {
          return 2; // NOT VOTED YET
        }
      } else {
        return 3; // NOT LOGGED IN
      }
    },
  },
  data() {
    return {
      text: null,
    };
  },
  mounted() {
    this.getAllComments(this.$route.params.postId);
  },
  methods: {
    ...mapActions(["getAllComments", "createComment", "updatePost", "getPost"]),
    navigateBack() {
      this.$router.push("/community");
    },
    vote(e) {
      let voteValue = parseInt(e.currentTarget.value);

      if (this.isLoggedIn) {
        if (this.haveVoted === true) {
          this.currentPost.votes.find((vote) => {
            if (vote.userId === this.user._id) {
              vote.type = voteValue;
            }
          });
        } else {
          let newVote = {
            userId: this.user._id,
            type: voteValue,
          };
          this.currentPost.votes.push(newVote);
        }

        let post = {
          id: this.currentPost._id,
          votes: this.currentPost.votes,
        };
        //maybe write async function to change record in db then reload
        this.updatePost(post);
      } else {
        return;
      }
    },
    cancelComment() {
      this.text = null;
    },
    submitComment() {
      let branch = {
        id: this.$route.params.postId,
        type: this.$route.name.toLowerCase(),
      };

      let comment = {
        text: this.text,
        author: this.user.username ? this.user.username : "Anonymous",
        userId: this.user._id ? this.user._id : "",
        branch: branch,
      };

      this.createComment(comment).then((res) => {
        if (res.data.success) {
          this.getAllComments(this.$route.params.postId);
          this.text = null;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.viewpost-view {
  padding: 20px;

  .post-votes {
    padding: 15px 0 10px 5px;
    display: flex;
    // border: 1px solid black;

    .btn-text {
      text-align: center;
      font-weight: 500;
    }
  }

  .post-container {
    display: flex;

    .container-left {
      .comment {
        margin-bottom: 60px;
        position: relative;
        .comment-buttons {
          position: absolute;
          right: 0px;
        }
      }
    }
    .container-right {
      margin-left: 20px;

      .post-info {
        padding: 0 0 0 15px;
      }
    }
  }
  .comments {
    margin-top: 20px;
  }

  pre {
    font-size: 14px;
    font-family: Arial, Helvetica, sans-serif;
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  .txt-small-vote {
    font-size: 12px;
    margin-right: auto;
    margin-top: 15px;
  }
}
</style>
