<template>
  <div class="characters-view">
    <div class="characters-background"></div>
    <div class="characters-title">
      <span style="color: #1976d268">Genshin Impact</span>
      <span style="color: #fff"> Characters</span>
    </div>

    <v-container>
      <v-row no-gutters style="margin-top: 30px">
        <v-col
          md="3"
          v-for="character in allCharacters"
          :key="character._id"
          style="col"
        >
          <v-card dark tile flat class="card" @click="navigateTo(character)">
            <div class="img">
              <img
                :src="character.img"
                alt=""
                style="width: 100%; position: absolute; bottom: 110px; left: 0%"
              />
              <div class="layer">
                <p>Weapon: {{ character.weapon }}</p>
                <p>
                  <!-- Rarity: {{ character.rarity }} -->
                  <v-icon
                    v-for="n in character.rarity"
                    :key="n"
                    right
                    color="yellow"
                  >
                    mdi-star
                  </v-icon>
                </p>
              </div>
            </div>

            <v-card-text>{{ character.name }}</v-card-text>
            <v-card-text>{{ character.type }}</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Characters",
  computed: {
    ...mapGetters(["allCharacters"]),
  },
  data() {
    return {
      // characters: [
      //   {
      //     name: "Amber",
      //     id: 0,
      //     img:
      //       "https://uploadstatic-sea.mihoyo.com/contentweb/20191009/2019100914372396510.png",
      //     type: "Pyro",
      //   },
      //   {
      //     name: "Kaeya",
      //     id: 1,
      //     img:
      //       "https://www.siliconera.com/wp-content/uploads/2020/10/Genshin-Impact_20201009190947-710x400.jpg",
      //     type: "Cryo",
      //   },
      //   {
      //     name: "Lisa",
      //     id: 2,
      //     type: "Electro",
      //   },
      //   {
      //     name: "Jean",
      //     id: 3,
      //     type: "Anemo",
      //   },
      //   {
      //     name: "Mona",
      //     id: 4,
      //     type: "Hydro",
      //   },
      //   {
      //     name: "Fischl",
      //     id: 5,
      //     type: "Electro",
      //   },
      // ],
    };
  },
  methods: {
    ...mapActions(["getAllCharacters", "getCharacter"]),
    navigateTo(character) {
      this.getCharacter(character);
      this.$router.push(`/characters/${character._id}`);
    },
  },
  mounted() {
    this.getAllCharacters();
  },
};
</script>

<style lang="scss">
.characters-view {
  margin: 0 220px 0 220px;

  .characters-background {
    position: absolute;
    height: 1100px;
    width: 100%;
    background-color: #1976d268;
    margin: auto;
    transform: rotate(75deg);
    z-index: 0;
  }

  .characters-title {
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
