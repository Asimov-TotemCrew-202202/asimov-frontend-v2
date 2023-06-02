<template>
  <div style="display: grid; grid-template-columns: 80% 20%; grid-template-rows: 1fr; gap: 10px;">

  <div style="width: 100%;">
    <v-card color="#eeeeee" elevation="0">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">{{icon}}</v-icon> <h2>{{titleCrud}}</h2>
        <v-spacer></v-spacer>
        <div>
          <v-btn dark color="white" class="mr-3 text-uppercase" outlined elevation="0" @click="dialog=true">
            <v-icon>mdi-plus</v-icon> AÑADIR 
          </v-btn>
          <v-btn dark color="white" class="" outlined elevation="0">
            <v-icon>mdi-sync</v-icon> RECARGAR
          </v-btn>

        </div>
      </div>
      <div class="displayCourses" :style="`grid-template-columns: 1fr ${sample?'':''};`">
        <card-custom v-for="(item, index) in data" :key="index" :title="`${item.name}`" :headers="headers" @detalle="logDetalle(index)"/>
      </div>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          Regitrar {{nameCrud}}
        </v-card-title>

        <v-form class="pa-6">
          <slot name="form"></slot>
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
    <slot name="rightColumn"></slot>
    
    </div>
  </div>
</template>
A
<script>
import CardCustom from '@/components/CardCustom.vue'

  export default {
    name: 'CrudCustomView',

    components:{
      CardCustom,
    },

    props:{
      endPoint: {
        type: String,
        default: 'courses'
      },
      icon: {
        type: String,
        default: 'mdi-folder'
      },
      titleCrud: {
        type: String,
        default: 'Courses'
      },
      nameCrud: {
        type: String,
        default: 'Course'
      },
      headers: {
        type: Array,
        default: () => [{ text: "Descripción", value: "description" },]
      },
    },

    data: () => ({
      data: null,
      dialog: false,
      accordion: 0,
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
      },
      getData() {
        this.$axios.get(this.endPoint)
          .then(response => {
            this.data = response.data;
            console.log('DATA ----> ', this.data);
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    mounted(){
      this.getData();
    }

  }
</script>

<style lang="scss">
$medium: 1500px;

.displayCourses{
  display: grid;
  
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