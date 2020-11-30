<template>
  <div class="create-post-view">
    <v-icon
      large
      color="primary"
      style="position: absolute; left: 2px; top: 3px cursor: pointer"
    >
      mdi-chevron-left-circle
    </v-icon>
    <h1>Create Post</h1>
    <div class="form">
      <v-text-field
        label="Author"
        placeholder="Author"
        solo
        v-model="author"
      ></v-text-field>
      <v-text-field
        label="Title"
        placeholder="Title"
        solo
        v-model="title"
      ></v-text-field>
      <v-textarea
        solo
        name="input-7-4"
        label="What's on your mind..."
        v-model="text"
      ></v-textarea>
      <v-btn @click="createPost()">Post</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CreatePost",
  data() {
    return {
      title: null,
      text: null,
      author: null,
    };
  },
  methods: {
    ...mapActions(["submitPost"]),
    createPost() {
      let post = {
        title: this.title,
        text: this.text,
        author: this.author,
      };
      this.submitPost(post).then((res) => {
        if (res.data.success) {
          this.$router.push("/community");
        }
      });
    },
  },
};
</script>

<style lang="scss">
.create-post-view {
  text-align: center;

  .form {
    border: 1px solid black;
    margin: auto;
    width: 600px;
    padding: 20px;
  }
}
</style>
