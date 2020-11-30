<template>
  <div class="community-view">
    <v-btn elevation="2" color="primary" @click="createPost()"
      >Create Post</v-btn
    >
    <div class="post-container">
      <div v-for="post in allPosts" :key="post.id" class="posts">
        <div class="cards">
          <v-card elevation="2" :hover="true" @click="navigateTo(post)">
            <v-card-title>{{ post.id }} {{ post.title }}</v-card-title>
            <v-card-subtitle>Posted by: {{ post.author }}</v-card-subtitle>
            <v-card-text v-if="post.text.length > 450"
              >{{ post.text.substring(0, 450) }}...</v-card-text
            >
            <v-card-text v-else>{{ post.text }}</v-card-text>
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
  }
}
</style>
