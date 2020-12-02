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
    <v-card elevation="2" style="z-index: 1;">
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
        Please <router-link to="/login">sign in</router-link> to comment.
      </p>
    </div>
    <div>
      <v-btn class="mx-2" fab dark small color="green" @click="voteUp">
        <v-icon>
          mdi-thumb-up
        </v-icon>
      </v-btn>
      <v-btn class="mx-2" fab dark small color="red" @click="voteDown">
        <v-icon>
          mdi-thumb-down
        </v-icon>
      </v-btn>
      <div style="display: flex">
        <div style="color: green;">{{ upVotes }}</div>
        <div style="color: red;">{{ downVotes }}</div>
      </div>
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
                <p>{{ comment.text }}</p>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </template>
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
    voteUp() {
      let vote = {
        userId: this.user._id,
        type: 1,
      };

      this.currentPost.votes.push(vote);

      let post = {
        id: this.currentPost._id,
        votes: this.currentPost.votes,
      };

      this.updatePost(post);
    },
    voteDown() {
      let vote = {
        userId: this.user._id,
        type: 0,
      };

      this.currentPost.votes.push(vote);

      let post = {
        id: this.currentPost._id,
        votes: this.currentPost.votes,
      };

      this.updatePost(post);
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

  .comment {
    margin-bottom: 60px;
    .comment-buttons {
      position: absolute;
      right: 20px;
    }
  }
}
</style>
