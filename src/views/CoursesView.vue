<template>
  <div class="d-flex justify-center">
    <!-- <h2 class="my-7">ASIMOV</h2> -->
    <v-card color="#eeeeee" elevation="0">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">mdi-folder</v-icon> <h2>Courses</h2>
      </div>
      <div class="displayCourses">
        <v-card v-for="(item, index) in 7" :key="index" elevation="0" outlined class="card-course rounded-lg">
          <v-card-title class="font-weight-bold">SAMPLE</v-card-title>
          <v-card-text class="text-justify pb-0"> <span class="font-weight-bold">Descripcion:</span>  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam reiciendis labore.</v-card-text>
          <v-card-text class="text-justify pb-0"> <span class="font-weight-bold">Profesor:</span> Julio Salazar</v-card-text>
          <v-card-text class="text-justify pb-0"> <span class="font-weight-bold">Competencias:</span></v-card-text>
          <div class="pb-4 px-4">
            <chip-custom text="Default" class="mr-2 mt-2"></chip-custom>
            <chip-custom text="Primary" class="mr-2 mt-2"></chip-custom>
            <chip-custom text="Red Chip" class="mr-2 mt-2"></chip-custom>
            <chip-custom text="Green Chip" class="mr-2 mt-2"></chip-custom>
          </div>
        </v-card>
      </div>
    </v-card>

    
  </div>
</template>

<script>
import ChipCustom from '@/components/ChipCustom.vue'

  export default {
    name: 'CoursesView',

    components:{
      ChipCustom,
    },

    data: () => ({
   
    }),

  }
</script>

<style lang="scss">
$medium: 1500px;

.displayCourses{
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  @media screen and (max-width: $medium) {
    grid-template-columns: 1fr !important;
    
  }
}
.card-course{
  transition: transform 0.3s ease;

}
.card-course:hover{

  z-index: 500;
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}
</style>