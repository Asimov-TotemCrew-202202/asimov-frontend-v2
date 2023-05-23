<template>
  <div class="authLayout">
    <slot></slot>
  </div>
</template>
  
<script>

  export default {
    name: 'AuthLayaout',

    data: () => ({
      
    }),
    computed:{
    },
    mounted() {
      
    },
    methods:{
      
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