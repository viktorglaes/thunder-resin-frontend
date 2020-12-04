import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/community",
    name: "Community",
    component: () => import("../views/Community.vue"),
  },
  {
    path: "/guides",
    name: "Guides",
    component: () => import("../views/Guides.vue"),
  },
  {
    path: "/characters",
    name: "Characters",
    component: () => import("../views/Characters.vue"),
  },
  {
    path: "/weapons",
    name: "Weapons",
    component: () => import("../views/Weapons.vue"),
  },
  {
    path: "/community/posts/:postId",
    name: "Post",
    component: () => import("../views/ViewPost.vue"),
  },
  {
    path: "/community/create-post",
    name: "CreatePost",
    component: () => import("../views/CreatePost.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/guides/create-guide",
    name: "CreateGuide",
    component: () => import("../views/CreateGuide.vue"),
  },
  {
    path: "/guides/:guideId",
    name: "Guide",
    component: () => import("../views/ViewGuide.vue"),
  },
  {
    path: "/weapons/:weaponId",
    name: "Weapon",
    component: () => import("../views/ViewWeapon.vue"),
  },
  {
    path: "/characters/:characterId",
    name: "Character",
    component: () => import("../views/ViewCharacter.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
