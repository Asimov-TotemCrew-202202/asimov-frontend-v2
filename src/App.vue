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

<style scoped lang="scss">

@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap');

*{
  font-family: 'Manrope', sans-serif;
  /* font-family: 'Montserrat', sans-serif; */
  ::-webkit-scrollbar-thumb,
.v-navigation-drawer__content::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 60px;
  box-shadow: inset 0 0 0 12px rgba(0, 0, 0, 0.37);
}
::-webkit-scrollbar,
.v-navigation-drawer__content::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}


</style>
