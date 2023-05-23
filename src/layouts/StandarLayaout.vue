<template>
  <div class="StandarLayaout">
    <div style="width: 100%; height: 100%;">
      <slot name="leftColumn" ></slot>
    </div>
    <div style="width: 100%; height: 100%;">
      <slot name="rightColumn" ></slot>
    </div>
  </div>
</template>
  
<script>

  export default {
    name: 'StandarLayaout',

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
.StandarLayaout{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 10px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr;
    
  }
}
</style>