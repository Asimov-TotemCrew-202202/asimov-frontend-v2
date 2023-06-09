<template>
    <crud-custom title-crud="Comunicados" custom-put hide-detail max-title :end-point="endPoint" name-crud="Comunicado" icon="mdi-bullhorn-variant" :entity-property="entityProperty" title-card="title"  :headers="header" one-column>
      <template #leftBottom>
        <v-btn fab small dense color="deep-purple accent-3" dark elevation="0" class="mr-2"><v-icon class="mr-0" small>mdi-menu</v-icon></v-btn>
      </template>
      <template #form>
          <v-text-field dense label="Titulo" hide-details outlined class="mb-3" v-model="entityProperty.title"></v-text-field>
          <v-textarea rows="4" dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.description"></v-textarea>
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

  data: () => ({
    dataComunicados: false,
    header: [
      { text: "Descripción", value: "description" },
    ],
    entityProperty:{
      title: '',
      description: '',
    },
  }),

//   watch:{
//     dataComunicados(newVal, oldVal){
//         console.log('NEW VAL --->', newVal);
//     }
//   },

  computed:{
    endPoint(){
      return `principals/${1}/statements`;
    }
  },

  methods: {
  },

  mounted(){
  },

  created(){
  }
}
</script>

<style>
</style>