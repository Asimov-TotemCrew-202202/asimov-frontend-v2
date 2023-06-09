<template>
    <crud-custom title-crud="Competencias" max-title hide-delete :end-point="endPoint" name-crud="Competencia" icon="mdi-check-decagram" :entity-property="entityProperty" title-card="name"  :headers="header" one-column>
      <template #form>
          <v-text-field dense label="Titulo" hide-details outlined class="mb-3" v-model="entityProperty.name"></v-text-field>
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
      name: '',
      description: '',
    },
  }),

  watch:{
  },

  computed:{
    endPoint(){
      return `competences`;
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