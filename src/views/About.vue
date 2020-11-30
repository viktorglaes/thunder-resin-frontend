<template>
  <div class="about-view">
    <div class="background-image">
      <div class="about-section">
        <div class="background-title">About</div>
        <p class="paragraph-first">
          This platform is for the Genshin Impact community and its followers.
          Post your topics of interest and see what the general consensus is in
          the community, share your build of your favorite character, or just
          learn more Genshin Impact.
        </p>
        <p class="paragraph-second">
          NOTE: We are not in any way associated with Mihoyo.
        </p>
      </div>
    </div>

    <!-- https://uploadstatic-sea.mihoyo.com/contentweb/20200103/2020010311014850622.png -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.about-view {
  .background-image {
    // max-width: 100%;
    height: auto;
    background-image: url(../assets/genshin_impact.png);
    background-repeat: no-repeat;
    padding: 1000px 0;
    background-position-x: 40%;
    background-position-y: -150px;
    margin-bottom: -232px;

    .about-section {
      padding: 50px;
      position: absolute;
      width: 100%;
      top: 400px;
      height: 250px;
      background: rgba(0, 0, 0, 0.7);
      color: white;

      .paragraph-first {
        font-size: 18px;
      }

      .paragraph-second {
        font-weight: 600;
        position: absolute;
        bottom: 10px;
      }
    }
  }
  .background-title {
    font-size: 24px;
    // padding: 10px;
    text-transform: uppercase;
  }
}
</style>
