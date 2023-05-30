<template>
  <div style="display: grid; grid-template-columns: 80% 20%; grid-template-rows: 1fr; gap: 10px;">

  <div class="d-flex justify-center">
    <v-card color="#eeeeee" elevation="0">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">mdi-folder</v-icon> <h2>Courses</h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn dark color="white" class="mr-3" outlined elevation="0" @click="dialog=true">
            <v-icon>mdi-plus</v-icon> AÑADIR CURSO
          </v-btn>
          <v-btn dark color="white" class="" outlined elevation="0">
            <v-icon>mdi-sync</v-icon> RECARGAR
          </v-btn>

        </div>
      </div>
      <div class="displayCourses">
        <card-custom v-for="(item, index) in 7" :key="index" :text="`${index}`" @detalle="logDetalle(index)">
          <template #bottom>
            <chip-custom class="mr-2 mt-2" text="Sample"></chip-custom>
            <chip-custom class="mr-2 mt-2" text="Sample"></chip-custom>
            <chip-custom class="mr-2 mt-2" text="Sample"></chip-custom>
            <chip-custom class="mr-2 mt-2" text="Sample"></chip-custom>
          </template>
        </card-custom>
      </div>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          Regitrar Curso
        </v-card-title>

        <v-form class="pa-6">
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
        </v-form>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="#081d87"
            text
            @click="dialog = false"
          >
            CREATE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
  </div>
  <div style="width: 100%; border-radius: 8px;">
    <v-card class="pa-5 rounded-b-0" elevation="0">
      <h3>Caracteristicas</h3>
    </v-card>
    <v-expansion-panels class="mt-n3" accordion v-model="accordion">
      <v-expansion-panel
        v-for="(item,i) in niveles"
        :key="i"
      >
        <v-expansion-panel-header>{{item.title}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-btn text v-for="(grade, index) in item.number" :key="index">{{index+1}}º Año {{item.title}}</v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </div>

  </div>
</template>

<script>
import ChipCustom from '@/components/ChipCustom.vue'
import CardCustom from '@/components/CardCustom.vue'

  export default {
    name: 'CoursesView',

    components:{
      ChipCustom,
      CardCustom,
    },

    data: () => ({
      dialog: false,
      accordion: 0,
      items: [
        { title: 'Click Me1' },
        { title: 'Click Me2' },
        { title: 'Click Me3' },
      ],
      niveles: [
        { 
          title: 'Primaria',
          number: 6,
        },
        { 
          title: 'Secundaria',
          number: 5,
        },
      ],
    }),
    methods:{
      logDetalle(id){
        this.$router.push({
        name: "courses-detail",
        params: { id },
      });
      }
    }

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