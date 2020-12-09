<template>
  <div class="viewcharacter-view">
    <v-icon
      size="42"
      color="primary"
      style="position: absolute; z-index: 2; left: 2px; top: 3px; cursor: pointer;"
      @click="navigateBack"
    >
      mdi-chevron-left-circle
    </v-icon>
    <div style="display: flex;">
      <div>
        <v-img
          :src="currentCharacter.img"
          max-height="450"
          min-height="430"
          max-width="650"
          min-width="650"
          style="z-index: 1;"
        ></v-img>
      </div>

      <v-container fluid class="pa-0 ma-0 container-right">
        <div class="overview">
          <v-card>
            <div class="card-inner-block">
              <h3>Overview</h3>
              <div>Type: {{ currentCharacter.type }}</div>
              <div>Weapon: {{ currentCharacter.weapon }}</div>
              <div>
                Ascension Material:
                {{ currentCharacter.ascensions[1].mat_1.name }},
                {{ currentCharacter.ascensions[1].mat_2.name }},
                {{ currentCharacter.ascensions[0].specialty.name }},
                {{ currentCharacter.ascensions[0].common.name }}
              </div>
            </div>
          </v-card>

          <v-card>
            <div class="card-inner-block">
              <h3>Base Stats</h3>
              <div>Base HP: {{ baseStats.hp.substring(0, 3) }}</div>
              <div>Base ATK: {{ baseStats.atk.substring(0, 2) }}</div>
              <div>Base DEF: {{ baseStats.def.substring(0, 2) }}</div>
              <div style="text-transform: capitalize;">
                Secondary Stat: {{ currentCharacter.stats[0].sp }}
              </div>
            </div>
          </v-card>
          <v-card>
            <div class="card-inner-block">
              <h3>Talent Level-Up Materials</h3>
              <v-row>
                <v-col
                  v-for="talentMaterial in currentCharacter.talent_materials"
                  :key="talentMaterial.name"
                  style="margin-left: 20px;"
                >
                  <v-avatar size="25" style="margin: auto;">
                    <img :src="talentMaterial.img" alt="#" />
                  </v-avatar>
                  {{ talentMaterial.name }}
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>
      </v-container>
    </div>
    <template>
      <v-toolbar flat dark style="border-radius: 0px;">
        <v-toolbar-title
          ><v-card-title
            >{{ currentCharacter.name }}
            <div class="layer">
              <div style="margin: 0 0 5px 10px;">
                <v-icon
                  v-for="n in currentCharacter.rarity"
                  :key="n"
                  right
                  color="yellow"
                >
                  mdi-star
                </v-icon>
              </div>
            </div>
          </v-card-title>
        </v-toolbar-title>
      </v-toolbar>
      <v-card flat min-height="500">
        <v-tabs vertical>
          <v-tab class="tab-content-left">
            <v-icon left>
              mdi-poll
            </v-icon>
            Stats
          </v-tab>
          <v-tab class="tab-content-left">
            <v-icon left>
              mdi-dumbbell
            </v-icon>
            Talents
          </v-tab>
          <v-tab class="tab-content-left">
            <v-icon left>
              mdi-account-star
            </v-icon>
            Ascensions
          </v-tab>
          <v-tab class="tab-content-left">
            <v-icon left>
              mdi-graphql
            </v-icon>
            Constellations
          </v-tab>
          <v-tab class="tab-content-left">
            <v-icon left>
              mdi-looks
            </v-icon>
            Story Arc
          </v-tab>

          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <template>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Level
                          </th>
                          <th class="text-left">
                            HP
                          </th>
                          <th class="text-left">
                            ATK
                          </th>
                          <th class="text-left">
                            DEF
                          </th>
                          <th
                            class="text-left"
                            style="text-transform: uppercase;"
                          >
                            {{ currentCharacter.stats[0].sp }}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="stat in currentCharacter.stats"
                          :key="stat.name"
                        >
                          <td>{{ stat.level }}</td>
                          <td>{{ stat.hp }}</td>
                          <td>{{ stat.atk }}</td>
                          <td>{{ stat.def }}</td>
                          <td>{{ stat.sp_stat }}%</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="talent in currentCharacter.talents"
                    :key="talent.name"
                    md="6"
                  >
                    <div class="column">
                      <div>
                        <img :src="talent.img" alt="" class="column-img" />
                      </div>
                      <div>
                        <div class="column-title" style="">
                          {{ talent.name }}
                        </div>
                        <div class="column-text">
                          {{ talent.text }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <template>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">
                            Ascension
                          </th>
                          <th class="text-left">
                            Level
                          </th>
                          <th class="text-left">
                            Mora
                          </th>
                          <th class="text-left">
                            Material 1
                          </th>
                          <th class="text-left">
                            Material 2
                          </th>
                          <th class="text-left">
                            Specialty
                          </th>
                          <th class="text-left">
                            Common
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="ascension in currentCharacter.ascensions"
                          :key="ascension.order"
                        >
                          <td>{{ ascension.order }}</td>
                          <td>{{ ascension.req_level }}</td>
                          <td>{{ ascension.mora }}</td>
                          <td>
                            <img
                              :src="ascension.mat_1.img"
                              alt=""
                              style="margin-left: auto; margin-right: auto"
                            />
                            <div>
                              {{ ascension.mat_1.name }}
                              {{ ascension.quantity_1 }}x
                            </div>
                          </td>
                          <td>
                            <img :src="ascension.mat_2.img" alt="" />
                            <div>
                              {{ ascension.mat_2.name }}
                              {{ ascension.quantity_2 }}x
                            </div>
                          </td>
                          <td>
                            <img :src="ascension.specialty.img" alt="" />
                            <div>
                              {{ ascension.specialty.name }}
                              {{ ascension.quantity_specialty }}x
                            </div>
                          </td>
                          <td>
                            <img :src="ascension.common.img" alt="" />
                            <div>
                              {{ ascension.common.name }}
                              {{ ascension.quantity_common }}x
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </template>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                <v-row>
                  <v-col
                    v-for="constellation in currentCharacter.constellations"
                    :key="constellation.name"
                    md="6"
                  >
                    <div class="column">
                      <div>
                        <img
                          :src="constellation.img"
                          alt=""
                          class="column-img"
                        />
                      </div>
                      <div>
                        <div class="column-title">
                          {{ constellation.name }}
                        </div>
                        <div class="column-text">
                          {{ constellation.text }}
                        </div>
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat>
              <v-card-text>
                Story
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ViewCharacter",
  computed: {
    ...mapGetters(["currentCharacter"]),
    baseStats() {
      return this.currentCharacter.stats[0];
    },
    // baseAtk() {
    //   console.log("atk");
    // },
    // baseDef() {
    //   console.log("def");
    // },
  },
  methods: {
    ...mapActions([]),
    navigateBack() {
      this.$router.push("/characters");
    },
  },
};
</script>

<style lang="scss">
.viewcharacter-view {
  // margin-bottom: 20px;
  /* color: #1e1e1e63 */

  .container-right {
    border-left: 1px solid #f0f0f0;
    // background-color: #1e1e1e17;

    .card-inner-block {
      padding: 15px;

      div {
        font-size: 14px;
      }
    }
  }

  .tab-content-left {
    justify-content: left;
  }

  .overview {
    padding: 20px;
    border-top: 1px solid rgb(189, 189, 189);
  }

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
}
</style>
