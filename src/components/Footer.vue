<template>
  <div class="footer">
    <v-footer dark padless class="footer-height">
      <v-card flat tile class="indigo lighten-1 white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon.icon"
            class="mx-4 white--text"
            icon
            :href="icon.link"
          >
            <v-icon size="24px">
              {{ icon.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text
          class="white--text pt-0"
          style="height: 200px; padding: 50px 200px 0 200px"
        >
          Work with the Genshin Impact community. Help your fellow players find
          new tips and tricks for builds, share your opinion on game mechanics
          or functionality, and most of all, have fun playing this amazing
          cross-platform Gacha game. If you have anything to share with the dev
          team, please do not hesitate to reach out via LinkedIn or email.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Citrus Dungeon</strong>
        </v-card-text>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    icons: [
      { icon: "mdi-earth", link: "http://www.viktorglaes.com/" },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/in/viktor-glaes/",
      },
      { icon: "mdi-github", link: "https://github.com/viktorglaes" },
    ],
  }),
};
</script>

<style lang="scss">
.footer {
  text-align: center;
  .footer-height {
    // height: 300px;
  }
}
</style>
