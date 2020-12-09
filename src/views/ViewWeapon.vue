<template>
  <div class="viewweapon-view">
    <v-icon
      size="42"
      color="primary"
      style="position: absolute; z-index: 2; left: 2px; top: 3px; cursor: pointer;"
      @click="navigateBack"
    >
      mdi-chevron-left-circle
    </v-icon>
    <v-card elevation="4" style="padding: 25px;">
      <v-row style="min-height: 300px">
        <v-col md="2" style="margin: auto">
          <div style="padding: 0 0 0 65px; ">
            <v-img
              :src="currentWeapon.img"
              max-height="150"
              min-height="150"
              max-width="150"
              min-width="150"
              style="z-index: 1; "
            ></v-img>
          </div>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col md="3">
          <v-container fluid class="pa-0 ma-0 container-right">
            <div class="overview">
              <v-card elevation="0">
                <div class="card-inner-block">
                  <h3 style="margin-bottom: 5px;">Overview</h3>
                  <div class="flex-box">
                    <div class="box-left">
                      <div>Type:</div>
                      <div>Base ATK:</div>
                      <div>Secondary:</div>
                      <div>Passive:</div>
                      <div>Bonus:</div>
                    </div>

                    <div class="box-right">
                      <div>{{ currentWeapon.type }}</div>
                      <div>{{ currentWeapon.atk }}</div>
                      <div>{{ currentWeapon.secondary }}</div>
                      <div>{{ currentWeapon.passive }}</div>
                      <div>{{ currentWeapon.bonus }}</div>
                    </div>
                  </div>
                </div>
              </v-card>
            </div>
          </v-container>
        </v-col>
        <v-divider vertical></v-divider>
        <v-col>
          <div>
            <v-card elevation="0">
              <div class="card-inner-block">
                <h3>Ascensions</h3>
                <template>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Ascension
                          </th>
                          <th class="text-left">
                            Max Level
                          </th>
                          <th class="text-left">
                            Mora
                          </th>
                          <th class="text-left">
                            Weapon Ascension Material
                          </th>
                          <th class="text-left">
                            Common Material 1
                          </th>
                          <th class="text-left">
                            Common Material 2
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="ascension in currentWeapon.ascensions"
                          :key="ascension.name"
                        >
                          <td>{{ ascension.order }}</td>
                          <td>{{ ascension.max_level }}</td>
                          <td>{{ ascension.mora }}</td>
                          <td>
                            <img :src="ascension.weapon_mat.img" alt="" />{{
                              ascension.weapon_mat.name
                            }}
                            {{ ascension.quantity_weapon_mat }}x
                          </td>
                          <td>
                            <img :src="ascension.common_1_mat.img" alt="" />{{
                              ascension.common_1_mat.name
                            }}
                            {{ ascension.quantity_common_1 }}x
                          </td>
                          <td>
                            <img :src="ascension.common_2_mat.img" alt="" />{{
                              ascension.common_2_mat.name
                            }}
                            {{ ascension.quantity_common_2 }}x
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </div>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <!-- <div style="display: flex;"> -->

    <!-- </div> -->
    <v-toolbar flat elevation="2" style="border-radius: 0px;">
      <v-toolbar-title
        ><v-card-title
          >{{ currentWeapon.name }}
          <div class="layer">
            <div style="margin: 0 0 5px 10px;">
              <v-icon
                v-for="n in currentWeapon.rarity"
                :key="n"
                right
                color="red"
              >
                mdi-star
              </v-icon>
            </div>
          </div>
        </v-card-title>
      </v-toolbar-title>
    </v-toolbar>
    <div class="container-weapon">
      <h2>Other Interesting Weapons</h2>
      <template>
        <v-sheet class="mx-auto" elevation="">
          <v-slide-group
            v-model="model"
            class="pa-4"
            show-arrows
            :center-active="true"
          >
            <v-slide-item
              v-for="weapon in otherWeapons"
              :key="weapon._id"
              style="text-align: center"
            >
              <v-card
                color="dark"
                class="ma-4"
                height="250"
                width="250"
                @click="navigateTo(weapon)"
                elevation="2"
              >
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <v-img
                      max-width="150"
                      :src="weapon.img"
                      alt=""
                      style="z-index: 1"
                    ></v-img>
                  </v-scale-transition>
                </v-row>
                <div style="margin-top: -30px; z-index: 2">
                  {{ weapon.name }}
                </div>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-sheet>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ViewCharacter",
  computed: {
    ...mapGetters(["currentWeapon", "allWeapons"]),
    // baseStats() {
    //   return this.currentCharacter.stats[0];
    // },
    otherWeapons() {
      return this.allWeapons.filter(
        (weapon) =>
          weapon.type === this.currentWeapon.type &&
          weapon._id !== this.currentWeapon._id
      );
    },
  },
  data() {
    return {
      model: null,
    };
  },
  methods: {
    ...mapActions(["getWeapon"]),
    navigateBack() {
      this.$router.push("/weapons");
    },
    navigateTo(weapon) {
      this.getWeapon(weapon);
      this.$router.push(`/weapons/${weapon._id}`);
    },
  },
};
</script>

<style lang="scss">
.viewweapon-view {
  // margin-bottom: 20px;
  /* color: #1e1e1e63 */

  .container-right {
    // border-left: 1px solid #f0f0f0;
    // background-color: #1e1e1e17;
  }

  .card-inner-block {
    padding: 15px;
    min-height: 285px;

    .flex-box {
      display: flex;

      .box-right {
        margin-left: 10px;
      }
    }

    div {
      font-size: 14px;
    }
  }

  .tab-content-left {
    justify-content: left;
  }

  // .overview {
  //   padding: 20px;
  //   border-top: 1px solid rgb(189, 189, 189);
  // }

  .overview > *:not(:last-child) {
    display: block;
    margin-bottom: 10px;
  }
  .column {
    display: flex;
    .column-title {
      font-weight: 600;
      padding-left: 10px;
    }

    .column-text {
      margin-top: auto;
      margin-bottom: auto;
      padding: 10px;
    }

    .column-img {
      background-color: grey;
      width: 100px;
      border-radius: 50%;
    }
  }

  .container-weapon {
    padding: 25px;
  }
}
</style>
