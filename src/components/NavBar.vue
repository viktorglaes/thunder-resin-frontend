<template>
  <v-app id="inspire">
    <v-app-bar app dark flat>
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs centered class="ml-n9" color="grey darken-1">
        <v-tab v-for="item in items" :key="item.id" :to="item.to">
          {{ item.title }}
        </v-tab>
      </v-tabs>
      <div v-if="isLoggedIn" class="nav-buttons">
        <v-btn @click="logoutUser" style="margin-right:20px;">Sign out</v-btn>
        <v-avatar
          class="hidden-sm-and-down"
          color="grey darken-1 shrink"
          size="32"
        ></v-avatar>
      </div>
      <div class="nav-buttons" v-else>
        <div style="margin-right: 10px;">
          <!-- <router-link to="/login"> -->
          <v-btn text to="/login">
            Sign In
          </v-btn>
          <!-- </router-link> -->
        </div>
        <div>
          <!-- <router-link to="/register"> -->
          <v-btn color="primary" to="/register">
            Register
          </v-btn>
          <!-- </router-link> -->
        </div>
      </div>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
  data: () => ({
    drawer: null,
    items: [
      { title: "Home", icon: "mdi-image", to: "/" },
      { title: "Community", icon: "mdi-image", to: "/community" },
      { title: "Guides", icon: "mdi-view-dashboard", to: "/guides" },
      { title: "Characters", icon: "mdi-image", to: "/characters" },
      { title: "Weapons", icon: "mdi-image", to: "/weapons" },
      { title: "About", icon: "mdi-help-box", to: "/about" },
    ],
  }),
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style lang="scss">
.nav-buttons {
  display: flex;
  position: absolute;
  right: 20px;
}
</style>
