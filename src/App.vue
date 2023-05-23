<template>
  <v-app>
    <!-- <v-main> -->
      <component :is="layout">
        <transition name="fade" mode="out-in">
          <router-view/>
        </transition>
      </component>
    <!-- </v-main> -->
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
  computed: {
    layout() {
      const routeMeta = this.$route.meta;
      // Obtén el valor de la propiedad 'layout' del meta de la ruta actual
      return routeMeta.layout;
    },
  },

};
</script>

<style lang="scss" scoped>
*{
  font-family: Montserrat;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
