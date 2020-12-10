<template>
  <div class="profile">
    <v-row>
      <div>
        <div v-if="user.favorite_character">
          <v-img
            :src="user.favorite_character.img"
            max-height="600"
            min-height="600"
            max-width="500"
            min-width="500"
            style="border: 1px solid gray;"
          ></v-img>
        </div>
        <div v-else>
          <v-img
            src="https://genshin-impact-bucket.s3.us-east-2.amazonaws.com/genshin/amber.png"
            max-height="600"
            min-height="600"
            max-width="500"
            min-width="500"
            style="border: 1px solid gray;"
          ></v-img>
        </div>
        <v-card
          dark
          style="border-top-left-radius: 0px; border-top-right-radius: 0px;"
        >
          <v-card-title style="padding-left: 20px">
            {{ user.username }}
          </v-card-title>

          <div class="card-options">
            <div class="card-select">
              <v-select
                :items="allCharacters"
                :label="
                  user.favorite_character === undefined
                    ? `Favorite Character`
                    : user.favorite_character.name
                "
                item-text="name"
                v-model="selectedCharacter"
                outlined
                return-object
              ></v-select>
            </div>
            <div class="card-btn">
              <v-card-actions>
                <v-btn @click="updateUser">Save</v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </div>

      <v-col>
        <h2>My Guides</h2>
        <div class="cards" v-if="myGuides.length > 0">
          <div v-for="guide in myGuides" :key="guide._id" class="card">
            <v-card>
              <v-card-title>{{ guide.title }}</v-card-title>
              <v-card-subtitle>{{
                guide.date.substring(0, 10)
              }}</v-card-subtitle>
            </v-card>
          </div>
        </div>
        <div class="no-data-text" v-else>
          You have no guides yet. View and create guides
          <router-link to="/guides/create-guide">here</router-link>.
        </div>
      </v-col>
      <v-col>
        <h2>My Posts</h2>
        <div class="cards" v-if="myPosts.length > 0">
          <div v-for="post in myPosts" :key="post._id" class="card">
            <v-card>
              <v-card-title>{{ post.title }}</v-card-title>
              <v-card-subtitle>{{
                post.date.substring(0, 10)
              }}</v-card-subtitle>
            </v-card>
          </div>
        </div>
        <div class="no-data-text" v-else>
          You have no posts yet. View and create posts
          <router-link to="/posts/create-post">here</router-link>.
        </div>
      </v-col>

      <v-col>
        <h2>My Comments</h2>
        <div class="cards" v-if="myComments.length > 0">
          <div v-for="comment in myComments" :key="comment._id" class="card">
            <v-card>
              <v-card-subtitle
                >{{ comment.text }}
                <div style="font-size: 12px; font-weight: 500">
                  Commented on: {{ comment.branch.title }}
                </div></v-card-subtitle
              >
            </v-card>
          </div>
        </div>
        <div class="no-data-text" v-else>
          Fear not traveler. You just haven't made any comments.
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Profile",
  computed: {
    ...mapGetters([
      "user",
      "allCharacters",
      "allGuides",
      "allPosts",
      "allComments",
    ]),
    // favoriteCharacter() {
    //   if (this.selectedCharacter) {
    //     let name = this.selectedCharacter.toLowerCase();
    //     return `https://genshin-impact-bucket.s3.us-east-2.amazonaws.com/genshin/${name}.png`;
    //   } else {
    //     return `https://genshin-impact-bucket.s3.us-east-2.amazonaws.com/genshin/amber.png`;
    //   }
    // },
    myGuides() {
      return this.allGuides.filter((guide) => guide.userId === this.user._id);
    },
    myPosts() {
      return this.allPosts.filter((post) => post.userId === this.user._id);
    },
    myComments() {
      return this.allComments.filter(
        (comment) => comment.userId === this.user._id
      );
    },
  },
  data() {
    return {
      selectedCharacter: null,
    };
  },
  methods: {
    ...mapActions(["getProfile", "updateFavoriteChar", "getAllCharacters"]),
    updateUser() {
      let updatedUser = this.user;
      updatedUser.favorite_character = this.selectedCharacter;
      this.user.favorite_character = this.selectedCharacter;
      this.updateFavoriteChar(updatedUser);
    },
  },
  mounted() {
    if (this.allCharacters.length === 0) {
      this.getAllCharacters();
    }
  },
};
</script>

<style lang="scss">
.profile {
  margin-left: 10px;
  .cards {
    height: 750px;
    overflow-y: scroll;

    .card {
      padding: 5px;
    }
  }
  .no-data-text {
    font-size: 14px;
    font-style: italic;
  }

  .card-options {
    padding: 10px;

    .card-select {
    }
    .card-btn {
      margin-top: -15px;
    }
  }
}
</style>
