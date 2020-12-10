<template>
  <div class="create-post-view">
    <v-icon
      size="42"
      color="primary"
      style="position: absolute; left: 2px; top: 3px; cursor: pointer"
      @click="navigateBack"
    >
      mdi-chevron-left-circle
    </v-icon>

    <div class="form">
      <div>
        <div class="title">Create Post</div>
        <div v-if="isLoggedIn">
          <v-text-field
            label="Author"
            outlined
            readonly
            :value="user.username"
          ></v-text-field>
        </div>
        <div v-else>
          <v-text-field
            label="Author"
            placeholder="Author"
            outlined
            v-model="author"
          ></v-text-field>
        </div>

        <v-text-field
          label="Title"
          placeholder="Title"
          outlined
          v-model="title"
        ></v-text-field>
        <v-textarea
          outlined
          name="input-7-4"
          label="What's on your mind..."
          v-model="text"
        ></v-textarea>
        <v-btn @click="createPost()">Post</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreatePost",
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
  },
  data() {
    return {
      title: null,
      text: null,
      author: null,
    };
  },
  methods: {
    ...mapActions(["submitPost", "getProfile"]),
    createPost() {
      let post = {
        title: this.title,
        text: this.text,
        userId: this.user._id ? this.user._id : "",
        author: this.author ? this.author : this.user.username,
        votes: [],
      };
      this.submitPost(post).then((res) => {
        if (res.data.success) {
          this.$router.push("/community");
        }
      });
    },
    navigateBack() {
      this.$router.push("/community");
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.getProfile();
    }
  },
};
</script>

<style lang="scss">
.create-post-view {
  text-align: center;

  .form {
    border: 1px solid rgb(110, 110, 110);
    margin: 20px 0 20px 0;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    width: 800px;
    padding: 20px;

    .title {
      text-align: left;
    }
  }
}
</style>
