<template>
  <v-card elevation="0" outlined class="card-course rounded-lg" @mouseover="showIcon" @mouseleave="hideIcon">
    <v-card-title class="font-weight-bold text-uppercase" > <span class="d-inline-block text-truncate" :style="`max-width: ${maxTitle?'950px':'350px'};`">{{Title}}</span>  <v-spacer></v-spacer>
      <div v-if="showHoverIcon">
        <v-btn fab @click="viewDetalle" small dense color="#091120" dark elevation="0" class="mr-2"><v-icon class="mr-0" small>mdi-eye</v-icon></v-btn>
        <v-btn v-if="!hideDelete" @click="itemDelete" fab small dense color="red" dark elevation="0" class="mr-2"><v-icon class="mr-0" small>mdi-delete</v-icon></v-btn>
        <v-btn v-if="!hideEdit" @click="itemEdit" fab small dense color="#081d87" dark elevation="0"><v-icon class="mr-0" small>mdi-pencil</v-icon></v-btn>
      </div> 
    </v-card-title>
    <v-card-text v-for="(sample, index) in headers" :key="index" class="text-justify d-inline-block text-truncate pl-4 py-0" :class="index+1== headers.length? 'pb-3':''" style="max-width: 450px;">
      <span class="font-weight-bold text-uppercase">{{sample.text}}:</span>{{item[sample.value]}}
    </v-card-text>
    <slot name="bottom"></slot>
  </v-card>
</template>

<script>

  export default {
    name: 'CardCustom',

    components:{
    },

    props:{
      maxTitle: {
        type: Boolean,
        default: false,
      },
      Title: {
        type: String,
        default: 'Titulo Card'
      },
      item: {
        type: Object,
        required: true,
      },
      headers: {
        type: Array,
        required: true,
      },
      hideDelete: {
        type: Boolean,
        required: false,
      },
      hideEdit: {
        type: Boolean,
        required: false,
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
        this.$emit('detalle', this.item.id)
      },
      itemDelete(){
        this.$emit('delete', this.item.id);
      },
      itemEdit(){
        this.$emit('edit', this.item.id);
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

  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}
</style>
