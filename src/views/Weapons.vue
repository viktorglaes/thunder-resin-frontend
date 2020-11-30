<template>
  <div class="weapons-view">
    <div class="weapons-background"></div>
    <div class="weapons-title">
      <span style="color: #1976d268">Genshin Impact</span>
      <span style="color: #fff"> Weapons</span>
    </div>

    <v-container>
      <v-row no-gutters style="margin-top: 30px">
        <v-col md="3" v-for="weapon in allWeapons" :key="weapon.id" style="col">
          <v-card dark tile flat class="card">
            <div class="img">
              <img
                :src="weapon.img"
                alt=""
                style="height: 150px; position: absolute; bottom: 130px; left: 65px"
              />
              <div class="layer">
                <p>
                  <!-- Rarity: {{ character.rarity }} -->
                  <v-icon
                    v-for="n in weapon.rarity"
                    :key="n"
                    right
                    color="yellow"
                  >
                    mdi-star
                  </v-icon>
                </p>
              </div>
            </div>

            <v-card-text>{{ weapon.name }}</v-card-text>
            <v-card-text>{{ weapon.type }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Weapons",
  computed: {
    ...mapGetters(["allWeapons"]),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getAllWeapons"]),
  },
  mounted() {
    this.getAllWeapons();
  },
};
</script>

<style lang="scss">
.weapons-view {
  margin: 0 220px 0 220px;

  .weapons-background {
    position: absolute;
    height: 1100px;
    width: 100%;
    background-color: #1976d268;
    margin: auto;
    transform: rotate(75deg);
    z-index: 0;
  }

  .weapons-title {
    // font-size: 32px;
    // color: #fff;
    text-transform: uppercase;
    padding: 10px;
    font-size: 14px;
    z-index: 2;
    position: absolute;
  }

  .col {
    text-align: center;
    padding: 5px;

    .card {
      cursor: pointer;

      .img {
        width: 100%;
        height: 200px;
      }

      .layer {
        // position: absolute;
        // text-align: center;
        top: 2px;
        // left: 30%;
        // width: 132px;
        // height: 132px;
        padding-top: 60px;
        display: none;
        font-weight: 600;
      }

      :hover .layer {
        display: block;
      }

      :hover img {
        opacity: 0.2;
      }
    }
  }
}
</style>
