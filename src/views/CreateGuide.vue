<template>
  <div class="create-guide-view">
    <v-icon
      large
      color="primary"
      style="position: absolute; left: 2px; top: 3px cursor: pointer"
    >
      mdi-chevron-left-circle
    </v-icon>
    <h1>Create Guide</h1>
    <div class="form">
      <v-text-field
        label="Author"
        placeholder="Author"
        solo
        v-model="author"
      ></v-text-field>
      <v-text-field
        label="Title"
        placeholder="Title"
        solo
        v-model="title"
      ></v-text-field>
      <v-textarea
        solo
        name="input-7-4"
        label="Text"
        v-model="text"
      ></v-textarea>
      <v-select
        :items="allCharacters"
        item-text="name"
        return-object
        label="Character"
        dense
        v-model="character"
      >
        <template slot="selection" slot-scope="{ item }">
          <v-avatar size="30">
            <img
              src="https://static.wikia.nocookie.net/gensin-impact/images/c/c6/Character_Amber_Thumb.png/revision/latest/scale-to-width-down/64?cb=20201118150352"
            />
          </v-avatar>
          <div style="margin-left: 5px;">{{ item.name }} - {{ item.type }}</div>
        </template>

        <template slot="item" slot-scope="{ item }">
          <v-avatar size="30">
            <img
              src="https://static.wikia.nocookie.net/gensin-impact/images/c/c6/Character_Amber_Thumb.png/revision/latest/scale-to-width-down/64?cb=20201118150352"
            />
          </v-avatar>
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
        dense
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
      ></v-select>
      <v-select
        v-model="talentOrder"
        :items="talentOrders"
        return-object
        attach
        chips
        label="Talent Order"
        multiple
      ></v-select>
      <v-btn @click="createGuide()">Post</v-btn>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CreateGuide",
  computed: {
    ...mapGetters(["allCharacters", "allWeapons"]),
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
    ...mapActions(["submitGuide", "getAllCharacters", "getAllWeapons"]),
    createGuide() {
      let guide = {
        title: this.title,
        text: this.text,
        author: this.author,
        character: this.character,
        playstyle: this.playstyle,
        recommendedWeapons: this.recommendedWeapons,
        talentOrder: this.talentOrder,
      };
      this.submitGuide(guide).then((res) => {
        if (res.data.success) {
          this.$router.push("/guides");
        }
      });
    },
  },
  mounted() {
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
    width: 1000px;
    padding: 20px;
  }
}
</style>
