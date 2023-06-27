<template>
    <crud-custom :title-crud="sectionName" max-title hide-delete @detalle="onDetalle" :end-point="endPoint" name-crud="Competencia" icon="mdi-book" :entity-property="entityProperty" title-card="name"  :headers="header" one-column>
      <template #form>
        <v-text-field dense label="Titulo" hide-details outlined class="mb-3" v-model="entityProperty.name"></v-text-field>
        <v-textarea rows="4" dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.description"></v-textarea>
      </template>
      <template #leftBottomHeader>
        <v-btn dark color="white" class="mr-3" @click="backPage" outlined elevation="0">
            <v-icon class="mr-2">mdi-arrow-left</v-icon>REGRESAR
          </v-btn>
      </template>
      <template #rightColumn>
        <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-information</v-icon> <h2 class="py-3">Información</h2></div>
        <v-card outlined class="pa-3">
          Las competencias en un curso son habilidades y conocimientos esenciales que se adquieren para lograr un aprendizaje efectivo y alcanzar el éxito en el ámbito profesional.
        </v-card>
        <v-alert
          :value="dataComunicados"
          color="blue-grey"
          dark
          border="top"
          icon="mdi-message-alert-outline"
          transition="scale-transition"
          class="mt-3"
        >
          <span class="font-weight-bold">{{itemComu.name }}</span>
          <v-divider
            class="my-4 info"
            style="opacity: 0.22"
          ></v-divider>

          {{itemComu.description }}
          <v-divider
            class="my-4 info"
            style="opacity: 0.22"
          ></v-divider>
          <v-row>
            <v-spacer style="color: white"></v-spacer>
            <v-btn
              class="mr-3 my-2"
              color="white"
              outlined
              @click="dataComunicados= !dataComunicados"
            >
              CERRAR
            </v-btn>
          </v-row>
        </v-alert>
        <!-- <div v-if="dataComunicados" class="d-flex pl-3 mt-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-file-document</v-icon> <h2 class="py-3">Contenido</h2></div>
        <v-card v-if="dataComunicados" outlined class="pa-3">
          <v-card-title class="pa-0">{{itemComu.name }}</v-card-title>
          {{itemComu.description }}
        </v-card> -->
      </template>
    </crud-custom>
</template>

<script>
import CrudCustom from '@/components/CrudCustom.vue'
import axios from 'axios';


export default {
  name: 'ComunicadosCustom',

  components:{
    CrudCustom,
  },

  data: () => ({
    itemComu: {},
    dataComunicados: false,
    header: [
      { text: "Descripción", value: "description" },
    ],
    entityProperty:{
      name: '',
      description: '',
    },
    section: {
      id: 0,
      name: "",
      gradeId: 0
    }
  }),

  watch:{
  },

  computed:{
    endPoint(){
      return `competences`;
    },
    pageId() {
      return this.$route.params.id;
    },
    sectionName() {
      return `${this.section.name}`;
    }
  },

  methods: {
    onDetalle(item){
      this.dataComunicados = true;
      this.itemComu= {
        ...item
      };
    },
    getGradeInfo() {
      axios.get(`http://localhost:8080/api/v1/sections/${this.pageId}`)
        .then(response => {
          this.section = response.data;
        })
    },
    backPage(){
      this.$router.push({
        name: "sections",
      });
    },
  },

  mounted(){
    this.getGradeInfo();
  },

  created(){
  }
}
</script>

<style scoped>
.v-application .info{
  background-color: white !important;
  border-color: white !important;
}
</style>