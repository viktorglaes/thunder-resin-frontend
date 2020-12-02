<!-- <template>
  <v-card class="mx-auto">
    <v-toolbar>
      <v-toolbar-title>Guides</v-toolbar-title>

      <v-btn
        color="primary"
        fab
        small
        style="margin: auto;"
        to="/guides/create-guide"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list three-line>
      <template v-for="(guide, index) in allGuides">
        <v-list-item :key="guide.title" style="cursor: pointer">
          <v-list-item-avatar>
            <v-img :src="guide.character.img"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="guide.title"></v-list-item-title>
            <v-list-item-subtitle v-html="guide.author"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider
          v-if="index != allGuides.length - 1"
          :key="index"
          :inset="true"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template> -->

<template>
  <div class="community-view">
    <v-btn elevation="2" color="primary" to="guides/create-guide"
      >Create Guide</v-btn
    >
    <div class="post-container">
      <div v-for="guide in allGuides" :key="guide.id" class="posts">
        <div class="cards">
          <v-card elevation="2" :hover="true" @click="navigateTo(guide)">
            <div class="card-container">
              <div class="container-left">
                <v-avatar size="80" style="margin-left: 15px;">
                  <v-img :src="guide.character.img"></v-img>
                </v-avatar>
              </div>
              <div class="container-right">
                <v-card-title>{{ guide.title }}</v-card-title>
                <v-card-subtitle>Posted by: {{ guide.author }}</v-card-subtitle>
                <v-card-text v-if="guide.text.length > 450">
                  <pre> {{ guide.text.substring(0, 450) }}...</pre></v-card-text
                >
                <v-card-text v-else>
                  <pre> {{ guide.text }}</pre></v-card-text
                >
              </div>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["allGuides"]),
  },
  data: () => ({
    items: [
      { header: "Today" },
      {
        avatar:
          "https://uploadstatic-sea.mihoyo.com/contentweb/20191009/2019100914372396510.png",
        title: "Amber Main DPS Build",
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar:
          "https://www.gensh.in/fileadmin/Database/Characters/Sucrose/Character_Sucrose_XL.png",
        title: "Sucrose FTP Abyss Monster",
        subtitle: `<span class="text--primary">Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { divider: true, inset: true },
      {
        avatar:
          "https://genshinimpact.wiki.fextralife.com/file/Genshin-Impact/klee-genshin-wiki-guide.png",
        title: "Klee C6 P2P",
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { divider: true, inset: true },
      {
        avatar:
          "https://uploadstatic-sea.mihoyo.com/contentweb/20191009/2019100910335338023.png",
        title: "Kaeya World 7 Solo Guide",
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { divider: true, inset: true },
      {
        avatar:
          "https://genshinimpact.wiki.fextralife.com/file/Genshin-Impact/bennett-genshin-wiki-guide.png",
        title: "Bennett the 25000k healer",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),

  methods: {
    ...mapActions(["getAllGuides", "getGuide"]),
    navigateTo(guide) {
      this.getGuide(guide);
      this.$router.push(`/guides/${guide._id}`);
    },
    // createGuide() {
    //   this.$router.push("/guides/create-guide");
    // },
  },
  mounted() {
    this.getAllGuides();
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

    .card-container {
      display: flex;

      .container-left {
        display: flex;
        align-items: center;
        justify-content: center;
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
    }
  }
}
</style>
