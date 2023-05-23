<template>
  <v-card elevation="0" outlined class="card-course rounded-lg" @mouseover="showIcon" @mouseleave="hideIcon">
    <v-card-title class="font-weight-bold">TRIGONOMETRIA - {{text}} <v-spacer></v-spacer>
      <div v-if="showHoverIcon">
        <v-btn @click="viewDetalle" small dense color="#091120" dark elevation="0" class="mr-2"><v-icon class="mr-1" small>mdi-eye</v-icon>INFO</v-btn>
        <v-btn small dense color="red" dark elevation="0" class="mr-2"><v-icon class="mr-1" small>mdi-delete</v-icon>ELIMINAR</v-btn>
        <v-btn small dense color="#081d87" dark elevation="0"><v-icon class="mr-1" small>mdi-pencil</v-icon>EDITAR</v-btn>
      </div> 
    </v-card-title>
    <v-card-text class="text-justify pb-0"> <span class="font-weight-bold">Descripcion:</span>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam reiciendis labore.</v-card-text>
    <v-card-text class="text-justify pb-0"> <span class="font-weight-bold">Profesor:</span> Julio Salazar</v-card-text>
    <v-card-text class="text-justify pb-0"> <span class="font-weight-bold">Competencias:</span></v-card-text>
    <div class="pb-4 px-4">
      <slot name="bottom"></slot>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'CardCustom',

    props:{
      text: {
        type: String,
        default: 'sample'
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

}
.card-course:hover{

  z-index: 500;
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}
</style>
