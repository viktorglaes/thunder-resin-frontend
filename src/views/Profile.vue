<template>
  <div class="profile">
    <div style="display: flex; z-index: 1;">
      <div>
        <v-img
          src="https://genshin-impact-bucket.s3.us-east-2.amazonaws.com/icons/keqing_icon.png"
          max-height="150"
          min-height="150"
          max-width="150"
          min-width="150"
          style="border: 1px solid gray; border-top-left-radius: 5px; border-top-right-radius: 5px; z-index: 1;"
        ></v-img>
        <v-card
          dark
          style="border-top-left-radius: 0px; border-top-right-radius: 0px;"
        >
          <v-card-title>
            Username
          </v-card-title>
          <v-card-title>
            Avatar
          </v-card-title>

          <!-- <v-card dark style="margin-top: 20px;">
            
          </v-card> -->
        </v-card>
      </div>
      <div>
        My Guides
      </div>
      <div>
        My Posts
      </div>
    </div>
    <div>
      My Comments
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
