<template>
  <div class="home-view">
    <!-- <div class="fill">
      <img alt="Vue logo" src="../assets/genshin_impact.png" />
    </div> -->
    <div class="background-image">
      <div class="login-form">
        <div class="login-title">
          Sign In
        </div>
        <div class="login-inputs">
          <v-text-field
            label="Solo"
            placeholder="Username"
            solo
            v-model="username"
          ></v-text-field>
          <v-text-field
            :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show3 ? 'text' : 'password'"
            name="input-10-2"
            placeholder="Password"
            class="input-group--focused"
            solo
            @click:append="show3 = !show3"
            v-model="password"
          ></v-text-field>
          <div class="button-container">
            <div>
              <v-btn color="primary" dark @click="loginUser()">
                Sign In
              </v-btn>
            </div>
            <div class="link">
              <router-link to="">Create Account</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      show3: false,
      password: null,
      username: null,
    };
  },
  methods: {
    ...mapActions(["login", "getProfile"]),
    loginUser() {
      let user = {
        username: this.username,
        password: this.password,
      };

      this.login(user)
        .then((res) => {
          console.log(user, res);
          if (res.data.success) {
            this.$router.push("/");
            this.getProfile();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
.home-view {
  .background-image {
    // max-width: 100%;
    max-height: 100%;
    background-image: url(../assets/genshin_impact.png);
    background-repeat: no-repeat;
    padding: 1000px 0;
    background-position-x: 40%;
    background-position-y: -150px;

    .login-form {
      position: absolute;
      height: 305px;
      width: 400px;
      background-color: #272727;
      left: 5%;
      top: 10%;
      -webkit-box-shadow: 0px 3px 35px -5px #000000;
      box-shadow: 0px 3px 35px -5px #000000;
      border-radius: 5px;

      .login-title {
        color: #fff;
        text-align: center;
        padding: 10px;
        font-size: 28px;
        font-weight: 500;
      }

      .login-inputs {
        padding: 20px;
        // background-color: white;

        .button-container {
          display: flex;
        }

        .link {
          margin: auto;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
