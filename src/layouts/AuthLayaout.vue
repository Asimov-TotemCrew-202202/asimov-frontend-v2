<template>
  
  <div class="authLayout" ref='vantaRef'>
    <h2 style="position: absolute; top: 15%; left: 50%; transform: translateX(-50%); color: #ffffff;">ASIMOV</h2>
    <div style="position: absolute; text-align: center; line-height: 1.7; bottom: 5%; left: 50%; transform: translateX(-50%); color: #ffffff;">
      <p>v.1.0.0 <br> {{anioActual}}  ·  &copy;TotemCrew</p>
      
    </div>
    <transition name="fade" mode="out-in">
      <slot></slot>
    </transition>
  </div>

</template>
  
<script>
import CELLS from 'vanta/dist/vanta.waves.min'

  export default {
    name: 'AuthLayaout',

    data: () => ({
      // year: '',
      
    }),
    computed:{
      anioActual(){
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        return currentYear;
      }
    },
    mounted() {
      this.vantaEffect = CELLS({
        el: this.$refs.vantaRef,
        color: 0x051252,
      })
    },
    beforeDestroy() {
      if (this.vantaEffect) {
        this.vantaEffect.destroy()
      }
    }

  }
</script>

<style lang="scss">
.authLayout{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.8s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>