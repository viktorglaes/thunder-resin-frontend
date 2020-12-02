<template>
  <div class="home-view">
    <div class="background-image">
      <div class="guides">
        <div class="background-title">Latest Guides</div>
        <v-row no-gutters>
          <v-col
            v-for="guide in latestGuidesArray"
            :key="guide.id"
            class="column-post col-md-4"
          >
            <v-card class="pa-2 post" tile outlined @click="navigateTo(post)">
              <div class="home-title">{{ guide.title }}</div>

              <div class="home-text" v-if="guide.text.length > 100">
                {{ post.text.substring(0, 100) }}...
              </div>
              <div class="home-text" v-else>{{ guide.text }}</div>
              <div class="home-author">Posted by: {{ guide.author }}</div>
            </v-card>
          </v-col>
        </v-row>
        <v-btn text class="ma-2 white--text btn-view" to="/guides">
          View All
          <v-icon right color="primary">
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </div>
      <div class="posts">
        <div class="background-title">Latest Posts</div>
        <v-row no-gutters>
          <v-col
            v-for="post in latestPostsArray"
            :key="post.id"
            class="column-post col-md-4"
          >
            <v-card class="pa-2 post" tile outlined @click="navigateTo(post)">
              <div class="home-title">{{ post.title }}</div>

              <div class="home-text" v-if="post.text.length > 100">
                {{ post.text.substring(0, 100) }}...
              </div>
              <div class="home-text" v-else>{{ post.text }}</div>
              <div class="home-author">Posted by: {{ post.author }}</div>
            </v-card>
          </v-col>
        </v-row>
        <v-btn text class="ma-2 white--text btn-view" to="/community">
          View All
          <v-icon right color="primary">
            mdi-arrow-right
          </v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {},
  computed: {
    ...mapGetters(["allPosts", "allGuides"]),
    latestPostsArray() {
      if (this.allPosts.length > 3) {
        return this.allPosts.slice(Math.max(this.allPosts.length - 3, 1));
      }
      return this.allPosts;
    },
    latestGuidesArray() {
      if (this.allGuides.length > 3) {
        return this.allGuides.slice(Math.max(this.allGuides.length - 3, 1));
      }
      return this.allGuides;
    },
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getAllPosts", "getPost", "getAllGuides"]),
    navigateTo(post) {
      this.getPost(post);
      this.$router.push(`/community/posts/${post.id}`);
    },
  },
  mounted() {
    this.getAllPosts();
    this.getAllGuides();
  },
};
</script>

<style lang="scss">
.home-view {
  .background-image {
    // max-width: 100%;
    height: auto;
    background-image: url(../assets/genshin_impact.png);
    background-repeat: no-repeat;
    padding: 1000px 0;
    background-position-x: 40%;
    background-position-y: -150px;
    margin-bottom: -232px;

    .guides {
      position: absolute;
      width: 100%;
      top: 400px;
      height: 275px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
    }

    .posts {
      position: absolute;
      width: 100%;
      top: 800px;
      height: 275px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
    }
    .column-post {
      padding: 10px;
      opacity: 100%;

      .post {
        height: 140px;
      }
    }
    .btn-view {
      position: absolute;
      right: 10px;
    }
  }
  .background-title {
    font-size: 24px;
    padding: 10px;
    text-transform: uppercase;
  }

  .home-title {
    font-size: 24px;
    font-weight: 600;
  }

  .home-text {
    bottom: 5px;
    font-size: 14px;
  }

  .home-author {
    position: absolute;
    bottom: 5px;
    font-size: 12px;
    font-weight: 600;
  }
}
</style>
