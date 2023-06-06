<template>
    <crud-custom title-crud="Comunicados" end-point="courses" name-crud="Comunicado" icon="mdi-bullhorn-variant" :entity-property="entityProperty"  :headers="header" one-column>
      <template #form>
          <v-text-field dense label="Nombre" hide-details outlined class="mb-3" v-model="entityProperty.name"></v-text-field>
          <v-text-field dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.description"></v-text-field>
          <v-select dense outlined v-model="entityProperty.competenceIds" hide-details :items="competencias" item-text="nombre" item-value="id" :menu-props="{ top: true, offsetY: true }" label="Competencias" multiple></v-select>
      </template>
      <template #bottomCard>
        <v-card-text class="text-uppercase pt-0 font-weight-bold">Competencias:</v-card-text>
        <div class="pb-4 pl-4">
          <chip-custom v-for="item in competencias" :key="item.id" class="mr-2">{{item.nombre}}</chip-custom>
        </div>
      </template>
    </crud-custom>
</template>

<script>
import CrudCustom from '@/components/CrudCustom.vue'
import ChipCustom from '@/components/ChipCustom.vue'


export default {
  name: 'ComunicadosCustom',

  components:{
    CrudCustom,
    ChipCustom,
  },

  data: () => ({
    dataComunicados: false,
    header: [
      { text: "Descripción", value: "description" },
    ],
    entityProperty:{
      name: '',
      description: '',
      competenceIds: []
    },
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