<template>
  <div class="viewcharacter-view">
    <div style="display: flex; z-index: 1;">
      <div>
        <v-img
          :src="currentCharacter.img"
          max-height="450"
          min-height="430"
          max-width="650"
          min-width="650"
          style="z-index: 1;"
        ></v-img>
        <!-- <v-card dark style="border-radius: 0px;">
          <v-card-title
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
          <v-card-subtitle
            >{{ currentCharacter.type }} -
            {{ currentCharacter.weapon }}
          </v-card-subtitle>

          we need talent level mats, char ascension mats, talents,
          constellations
        </v-card> -->
      </div>

      <v-container fluid class="pa-0 ma-0 container-right">
        <template>
          <v-card min-height="500">
            <v-toolbar color="blue" flat dark style="border-radius: 0px;">
              <v-toolbar-title
                ><v-card-title
                  >{{ currentCharacter.name }}
                  <div class="layer">
                    <div style="margin: 0 0 5px 10px;">
                      <!-- Rarity: {{ character.rarity }} -->
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
                <v-card-subtitle style="color: white"
                  >{{ currentCharacter.type }} -
                  {{ currentCharacter.weapon }}
                </v-card-subtitle>
              </v-toolbar-title>
            </v-toolbar>
            <v-tabs vertical>
              <v-tab class="tab-content-left">
                <v-icon left>
                  mdi-access-point
                </v-icon>
                Base Stats
              </v-tab>
              <v-tab class="tab-content-left">
                <v-icon left>
                  mdi-account
                </v-icon>
                Talents
              </v-tab>
              <v-tab class="tab-content-left">
                <v-icon left>
                  mdi-lock
                </v-icon>
                Ascensions
              </v-tab>
              <v-tab class="tab-content-left">
                <v-icon left>
                  mdi-access-point
                </v-icon>
                Constellations
              </v-tab>
              <v-tab class="tab-content-left">
                <v-icon left>
                  mdi-access-point
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
                    <div
                      v-for="talent in currentCharacter.talents"
                      :key="talent.name"
                    >
                      <div style="">
                        <div style="display: flex">
                          <div>
                            <img
                              :src="talent.img"
                              alt=""
                              style="background-color: grey; width: 100px;"
                            />
                          </div>
                          <div
                            style="margin-top: auto; margin-bottom: auto; padding: 10px"
                          >
                            {{ talent.text }}
                          </div>
                        </div>
                        <div style="margin-bottom: 20px; font-weight: 600">
                          {{ talent.name }}
                        </div>
                      </div>
                    </div>
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
                    <div
                      v-for="constellation in currentCharacter.constellations"
                      :key="constellation.name"
                    >
                      <div style="">
                        <div style="display: flex">
                          <div>
                            <img
                              :src="constellation.img"
                              alt=""
                              style="background-color: grey; width: 100px;"
                            />
                          </div>
                          <div
                            style="margin-top: auto; margin-bottom: auto; padding: 10px"
                          >
                            {{ constellation.text }}
                          </div>
                        </div>
                        <div style="margin-bottom: 20px; font-weight: 600">
                          {{ constellation.name }}
                        </div>
                      </div>
                    </div>
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
      </v-container>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ViewCharacter",
  computed: {
    ...mapGetters(["currentCharacter"]),
  },
  methods: {
    ...mapActions([]),
  },
};
</script>

<style lang="scss">
.viewcharacter-view {
  margin-bottom: 20px;
  /* color: #1e1e1e63 */

  .container-right {
    border-left: 1px solid #1e1e1e;
    background-color: #1e1e1e17;
  }

  .tab-content-left {
    justify-content: left;
  }
}
</style>
