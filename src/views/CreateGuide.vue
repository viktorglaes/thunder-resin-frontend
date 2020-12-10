<template>
  <div class="create-guide-view">
    <v-icon
      size="42"
      color="primary"
      style="position: absolute; left: 2px; top: 3px; cursor: pointer"
      @click="navigateBack"
    >
      mdi-chevron-left-circle
    </v-icon>

    <div class="form">
      <div>
        <div class="title">Create Guide</div>

        <div v-if="isLoggedIn">
          <v-text-field
            label="Author"
            outlined
            readonly
            :value="user.username"
          ></v-text-field>
        </div>
        <div v-else>
          <v-text-field
            label="Author"
            outlined
            placeholder="Author"
            v-model="author"
          ></v-text-field>
        </div>
        <v-text-field
          label="Title"
          placeholder="Title"
          outlined
          v-model="title"
        ></v-text-field>
        <v-select
          :items="allCharacters"
          item-text="name"
          return-object
          label="Character"
          outlined
          v-model="character"
        >
          <template slot="selection" slot-scope="{ item }">
            <!-- <v-avatar size="30">
              <img
                src="https://static.wikia.nocookie.net/gensin-impact/images/c/c6/Character_Amber_Thumb.png/revision/latest/scale-to-width-down/64?cb=20201118150352"
              />
            </v-avatar> -->
            <div style="margin-left: 5px;">
              {{ item.name }} - {{ item.type }}
            </div>
          </template>

          <template slot="item" slot-scope="{ item }">
            <!-- <v-avatar size="30">
              <img
                src="https://static.wikia.nocookie.net/gensin-impact/images/c/c6/Character_Amber_Thumb.png/revision/latest/scale-to-width-down/64?cb=20201118150352"
              />
            </v-avatar> -->
            <div
              style="font-size: 0.8125rem;
    font-weight: 500; margin-left: 5px;"
            >
              {{ item.name }} - {{ item.type }}
            </div>
          </template>
        </v-select>
        <v-select
          :items="playstyles"
          label="Playstyles"
          v-model="playstyle"
          outlined
        ></v-select>
        <v-select
          v-model="recommendedWeapons"
          :items="availableWeapons"
          return-object
          item-text="name"
          attach
          chips
          label="Weapons"
          multiple
          outlined
        ></v-select>
        <v-select
          v-model="talentOrder"
          :items="talentOrders"
          return-object
          attach
          chips
          label="Talent Order"
          multiple
          outlined
        ></v-select>
        <v-textarea
          outlined
          name="input-7-4"
          label="Text"
          v-model="text"
        ></v-textarea>

        <v-btn @click="createGuide()">Post</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateGuide",
  computed: {
    ...mapGetters(["allCharacters", "allWeapons", "isLoggedIn", "user"]),
    availableWeapons() {
      return this.allWeapons.filter(
        (weapon) => weapon.type === this.character.weapon
      );
    },
  },
  data() {
    return {
      title: null,
      text: null,
      author: null,
      character: {},
      playstyle: null,
      recommendedWeapons: [],
      talentOrder: [],
      playstyles: ["Main DPS", "Secondary DPS", "Support", "Protector"],
      talentOrder: [],
      talentOrders: ["Auto-Attack", "Elemental Skill", "Elemental Burst"],
    };
  },
  methods: {
    ...mapActions([
      "submitGuide",
      "getAllCharacters",
      "getAllWeapons",
      "getProfile",
    ]),
    createGuide() {
      let guide = {
        title: this.title,
        text: this.text,
        author: this.author ? this.author : this.user.username,
        character: this.character,
        playstyle: this.playstyle,
        userId: this.user._id ? this.user._id : "",
        recommendedWeapons: this.recommendedWeapons,
        talentOrder: this.talentOrder,
        votes: [],
      };
      this.submitGuide(guide).then((res) => {
        if (res.data.success) {
          this.$router.push("/guides");
        }
      });
    },
    navigateBack() {
      this.$router.push("/guides");
    },
  },
  mounted() {
    if (this.isLoggedIn) {
      this.getProfile();
    }
    this.getAllCharacters();
    this.getAllWeapons();
  },
};
</script>

<style lang="scss">
.create-guide-view {
  text-align: center;

  .form {
    margin: auto;
    margin-top: 20px;
    width: 1000px;
    padding: 20px;
    border: 1px solid rgb(110, 110, 110);
    border-radius: 5px;

    .title {
      text-align: left;
    }
  }
}
</style>
