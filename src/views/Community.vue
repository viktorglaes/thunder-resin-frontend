<template>
  <div class="community-view">
    <v-btn elevation="2" color="primary" @click="createPost()"
      >Create Post</v-btn
    >
    <div class="post-container">
      <div v-for="post in allPosts" :key="post._id" class="posts">
        <div class="cards">
          <v-card elevation="2" :hover="true" @click="navigateTo(post)">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>Posted by: {{ post.author }}</v-card-subtitle>
            <v-card-text v-if="post.text.length > 240"
              ><pre>{{ post.text.substring(0, 240) }}...</pre></v-card-text
            >
            <v-card-text v-else>
              <pre>{{ post.text }}</pre>
            </v-card-text>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Community",
  computed: {
    ...mapGetters(["allPosts"]),
  },
  data() {
    return {};
  },

  methods: {
    ...mapActions(["getPost", "getAllPosts"]),
    navigateTo(post) {
      this.getPost(post);
      this.$router.push(`/community/posts/${post._id}`);
    },
    createPost() {
      this.$router.push("/community/create-post");
    },
  },
  mounted() {
    this.getAllPosts();
  },
};
</script>

<style lang="scss">
.community-view {
  text-align: center;
  padding: 20px;

  .post-container {
    margin-top: 20px;
    text-align: left;
  }

  .cards {
    padding: 10px;

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
  }
}
</style>
