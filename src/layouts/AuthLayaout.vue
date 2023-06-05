<template>
  <div class="authLayout" ref='vantaRef'>
    <slot></slot>
  </div>
</template>
  
<script>
import CELLS from 'vanta/dist/vanta.waves.min'

  export default {
    name: 'AuthLayaout',

    data: () => ({
      
    }),
    computed:{
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
}
</style>