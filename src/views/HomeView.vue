<template #default>
  <div  class="d-flex justify-center">
    <v-card color="#eeeeee" elevation="0">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">mdi-view-dashboard</v-icon> <h2>Dashboard</h2>
      </div>
      
      <standar-layaout>
        <template #rightColumn>
          <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-bullhorn-variant</v-icon> <h2 class="py-3">Comunicados</h2></div>
            <v-card v-for="(item, index) in 4" :key="index" outlined class="mb-2">
              <v-card-title>SAMPLE</v-card-title>
              <v-card-text class="text-justify" style="font-size: 1em;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas dolore hic voluptate ex ut architecto placeat eligendi aliquam. Quisquam, molestiae odio. Cum iusto, libero saepe voluptas in culpa reiciendis?</v-card-text>
            </v-card>
        </template>
        <template #leftColumn>
          <div class="d-flex flex-column" style="height: 100%;">
  
            <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-percent-box</v-icon> <h2 class="py-3">Progreso</h2></div>


            <v-card outlined class="mb-2 font-weight-bold">
              <v-card-title class="d-flex justify-space-between px-4 pb-2">
                <span>Porcentaje</span>
                <span class="font-weight-bold">60%</span>
              </v-card-title>
              <div class="pb-5 px-4">
                <v-progress-linear
                  class="rounded"
                  height="10"
                  value="60"
                  striped
                  color="#081d87"
                ></v-progress-linear>
              </div>
            </v-card>

            <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-account-group</v-icon> <h2 class="py-3">Profesores</h2></div>
          
            <v-card v-for="(item, index) in 2" :key="index" outlined class="mb-2">
              <v-card-title>SAMPLE</v-card-title>
              <v-card-text class="text-justify" style="font-size: 1em;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas dolore hic voluptate ex ut architecto placeat eligendi aliquam. Quisquam, molestiae odio. Cum iusto, libero saepe voluptas in culpa reiciendis?</v-card-text>
            </v-card>
          </div>
        </template>
      </standar-layaout>


    </v-card>
  </div>
  
</template>

<script>
  import StandarLayaout from '@/layouts/StandarLayaout.vue'

  export default {
    name: 'HomeView',

    components:{
      StandarLayaout,
    },

    data: () => ({
   
    }),

  }
</script>
