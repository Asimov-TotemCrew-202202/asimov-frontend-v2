<template>
  <v-card elevation="0" outlined class="card-course rounded-lg" @mouseover="showIcon" @mouseleave="hideIcon">
    <v-card-title class="font-weight-bold text-uppercase" > <span class="d-inline-block text-truncate" style="max-width: 350px;">{{Title}}</span>  <v-spacer></v-spacer>
      <div v-if="showHoverIcon">
        <v-btn fab @click="viewDetalle" small dense color="#091120" dark elevation="0" class="mr-2"><v-icon class="mr-0" small>mdi-eye</v-icon></v-btn>
        <v-btn fab small dense color="red" dark elevation="0" class="mr-2"><v-icon class="mr-0" small>mdi-delete</v-icon></v-btn>
        <v-btn fab small dense color="#081d87" dark elevation="0"><v-icon class="mr-0" small>mdi-pencil</v-icon></v-btn>
      </div> 
    </v-card-title>
    <v-card-text v-for="(item, index) in headers" :key="index" class="text-justify pb-0"> <span class="font-weight-bold text-uppercase">{{item.title}}:</span></v-card-text>
    <v-card-text class="text-justify pb-0"> <span class="font-weight-bold text-uppercase">Competencias:</span></v-card-text>
    <div class="pb-4 px-4">
      <chip-custom v-for="(item, index) in Competencias" :key="index" class="mr-2 mt-2" :text="item"></chip-custom>

    </div>
    <slot name="bottom"></slot>
  </v-card>
</template>

<script>
  import ChipCustom from '@/components/ChipCustom.vue'

  export default {
    name: 'CardCustom',

    components:{
      ChipCustom,
    },

    props:{
      Title: {
        type: String,
        default: 'Titulo Card'
      },
      headers: {
        type: Array,
        default: () => [
          { text: "Descripción", value: "description" },
        ]
      },
      Competencias: {
        type: Array,
        default: () => ['COMPETENCIA 1','COMPETENCIA 2','COMPETENCIA 3']
      },
    },

    data: () => ({
      showHoverIcon: false
    }),

    methods: {
      showIcon() {
        this.showHoverIcon = true;
      },
      hideIcon() {
        this.showHoverIcon = false;
      },
      viewDetalle() {
        this.$emit('detalle', this.data)
      },
    }
  }
</script>

<style>
.card-course{
  transition: transform 0.3s ease;
  width: 100% !important;

}
.card-course:hover{

  z-index: 500;
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}
</style>
