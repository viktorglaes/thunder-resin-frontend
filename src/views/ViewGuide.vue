<template>
  <div class="viewguide-view">
    <v-icon
      size="42"
      color="primary"
      style="position: absolute; z-index: 2; left: 2px; top: 3px; background-color: white"
      @click="navigateBack"
    >
      mdi-chevron-left-circle
    </v-icon>
    <div style="display: flex; z-index: 1;">
      <div>
        <v-img
          :src="currentGuide.character.img"
          max-height="450"
          min-height="430"
          max-width="650"
          min-width="650"
          style="border: 1px solid gray; border-top-left-radius: 5px; border-top-right-radius: 5px; z-index: 1;"
        ></v-img>
        <v-card
          dark
          style="border-top-left-radius: 0px; border-top-right-radius: 0px;"
        >
          <v-card-title
            >{{ currentGuide.character.name }}
            <div class="layer">
              <div style="margin: 0 0 5px 10px;">
                <!-- Rarity: {{ character.rarity }} -->
                <v-icon
                  v-for="n in currentGuide.character.rarity"
                  :key="n"
                  right
                  color="yellow"
                >
                  mdi-star
                </v-icon>
              </div>
            </div>
          </v-card-title>
          <v-card-subtitle
            >{{ currentGuide.character.type }} -
            {{ currentGuide.character.weapon }}</v-card-subtitle
          >
          <div class="card-buttons">
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
            <div style="display: flex">
              <div style="color: green; margin: auto">
                {{ upVotes }}
              </div>
              <div style="color: #b90e0e; margin: auto">
                {{ downVotes }}
              </div>
            </div>
          </div>
          <!-- <v-card dark style="margin-top: 20px;">
            
          </v-card> -->
          <v-card-text>Written By: {{ currentGuide.author }}</v-card-text>
        </v-card>
      </div>

      <div class="guide-card">
        <v-card
          elevation="2"
          style="z-index: 1; min-height: 576px; margin-right: 10px;"
          dark
        >
          <v-card-title>{{ currentGuide.title }} </v-card-title>
          <v-card-subtitle>{{ currentGuide.playstyle }}</v-card-subtitle>

          <div>
            <v-card-title>Recommended Weapons</v-card-title>
            <v-row>
              <v-col
                v-for="weapon in currentGuide.recommendedWeapons"
                :key="weapon._id"
                style="margin-left: 20px;"
                md="1"
              >
                <v-avatar size="80" style="margin: auto;">
                  <img :src="weapon.img" alt="#" />
                </v-avatar>
              </v-col>
            </v-row>
          </div>

          <div style="margin-bottom: 8px">
            <v-card-title>Talent Priority</v-card-title>
            <v-row>
              <v-col
                v-for="(talent, index) in currentGuide.talentOrder"
                :key="talent"
                style="margin-left: 20px;"
              >
                <div>{{ index + 1 }} - {{ talent }}</div>
                <!-- <v-avatar size="80" style="margin: auto;">
                  <img :src="weapon.img" alt="#" />
                </v-avatar> -->
              </v-col>
            </v-row>
          </div>
          <v-divider></v-divider>
          <v-card-text>
            <pre> {{ currentGuide.text }} </pre></v-card-text
          >
        </v-card>
      </div>
    </div>

    <!-- <div style="background-color: #1E1E1E; color: white; margin-top: 20px;">
      <v-card-subtitle>By: {{ currentGuide.author }}</v-card-subtitle>
    </div>
    <v-text-field label="Regular"></v-text-field> -->

    <!-- <v-card dark style="margin-top: 20px;">
      <v-card-text>Written By: {{ currentGuide.author }}</v-card-text>
    </v-card> -->

    <!-- consider moving cards closer to 5px or less -->

    <div class="comment" v-if="isLoggedIn">
      <v-text-field
        style="margin-left: 5px; margin-top: 20px;"
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
      <p style="margin: 20px 0 0 10px;">
        Please <router-link to="/login">sign in</router-link> to comment.
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
                <p style="font-size: 14px">{{ comment.text }}</p>
              </v-list-item-content>
            </v-list-item>
            <v-divider style="margin: 0 14px 0 14px"></v-divider>
          </div>
        </v-card>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ViewGuide",
  computed: {
    ...mapGetters(["currentGuide", "user", "allComments", "isLoggedIn"]),
    upVotes() {
      return this.currentGuide.votes.filter((vote) => vote.type === 1).length;
    },
    downVotes() {
      return this.currentGuide.votes.filter((vote) => vote.type === 0).length;
    },
    haveVoted() {
      let res = this.currentGuide.votes.find(
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
          let thisVote = this.currentGuide.votes.find(
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
    this.getAllComments(this.$route.params.guideId);
  },
  methods: {
    ...mapActions([
      "getGuide",
      "getProfile",
      "getAllComments",
      "createComment",
      "updateGuide",
    ]),
    navigateBack() {
      this.$router.push("/guides");
    },
    vote(e) {
      let voteValue = parseInt(e.currentTarget.value);

      if (this.isLoggedIn) {
        if (this.haveVoted === true) {
          this.currentGuide.votes.find((vote) => {
            if (vote.userId === this.user._id) {
              vote.type = voteValue;
            }
          });
        } else {
          let newVote = {
            userId: this.user._id,
            type: voteValue,
          };
          this.currentGuide.votes.push(newVote);
        }

        let guide = {
          id: this.currentGuide._id,
          votes: this.currentGuide.votes,
        };
        //maybe write async function to change record in db then reload
        this.updateGuide(guide);
      } else {
        return;
      }
    },
    cancelComment() {
      this.text = null;
    },
    submitComment() {
      let branch = {
        id: this.$route.params.guideId,
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
          this.getAllComments(this.$route.params.guideId);
          this.text = null;
        }
      });
    },
  },
};
</script>

<style lang="scss">
.viewguide-view {
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

  .guide-card {
    min-width: 965px;
    max-width: 100%;
    margin-left: 20px;
  }

  .card-buttons {
    position: absolute;
    right: 10px;
    top: 25px;
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
