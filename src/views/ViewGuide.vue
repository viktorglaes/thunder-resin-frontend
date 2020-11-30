<template>
  <div class="viewpost-view">
    <v-icon
      large
      color="primary"
      style="position: absolute; z-index: 2; left: 2px; top: 3px"
      @click="navigateBack"
    >
      mdi-chevron-left-circle
    </v-icon>
    <v-card elevation="2" style="z-index: 1">
      <v-card-title>{{ currentGuide.title }}</v-card-title>
      <v-card-subtitle>{{ currentGuide.author }}</v-card-subtitle>
      <v-card-text>{{ currentGuide.text }}</v-card-text>
    </v-card>

    <!-- <div class="comments">
      <template>
        <v-card class="mx-auto" tile>
          <div v-for="comment in comments" :key="comment.id">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-subtitle>{{
                  comment.author
                }}</v-list-item-subtitle>
                <p>{{ comment.comment }}</p>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-card>
      </template>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ViewGuide",
  computed: {
    ...mapGetters(["currentGuide"]),
  },
  data() {
    return {
      comments: [
        {
          author: "Tom",
          id: 0,
          comment: "Hello there",
        },
        {
          author: "Tim",
          id: 1,
          comment: "Noice to have someone new join the community",
        },
        {
          author: "Todd",
          id: 2,
          comment: "GTFO",
        },
      ],
    };
  },
  methods: {
    navigateBack() {
      this.$router.push("/guides");
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
}
</style>
