<template>
    <crud-custom title-crud="Comunicados" end-point="courses" name-crud="Comunicado" icon="mdi-bullhorn-variant" :create="createCourse">
      <template #form>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Descripcion" hide-details outlined></v-text-field>
          <v-select v-model="selectedCompetencias" :items="competencias" item-text="nombre" item-value="id" chips label="Competencias" multiple></v-select>
      </template>
    </crud-custom>
</template>

<script>
import CrudCustom from '@/components/CrudCustom.vue'


export default {
  name: 'ComunicadosCustom',

  components:{
    CrudCustom,
  },

  props:{
    Title: {
      type: String,
      default: 'Comunicados Title'
    },
  },

  data: () => ({
    dataComunicados: false,
    header: [
      { text: "Descripción", value: "description" },
    ],
    competencias: [
      { id: 1, nombre: 'Razonamiento' },
      { id: 2, nombre: 'Análisis' },
      { id: 3, nombre: 'Pensamiento crítico' },
      { id: 4, nombre: 'Comunicación' }
    ],
    selectedCompetencias: [],
    apiRoute: '/'
  }),

//   watch:{
//     dataComunicados(newVal, oldVal){
//         console.log('NEW VAL --->', newVal);
//     }
//   },

  computed:{

  },

  methods: {
    logComunicados() {
      console.log('SAMPLE LOG --->', this.Title);
    },
    createCourse() {
      const data = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        competencias: this.getSelectedCompetencias()
      }
      this.$axios.post(this.apiRoute, data)
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    getSelectedCompetencias() {
      const selectedIds = []
      this.selectedCompetencias.forEach(competencia => {
        selectedIds.push(competencia.id)
      })
      return selectedIds
    }
  },

//  mounted(){
//    this.logComunicados();
//  },

//   created(){
//   }
}
</script>

<style>
</style>