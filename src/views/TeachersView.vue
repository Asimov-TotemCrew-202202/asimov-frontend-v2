<template>
    <crud-custom title-crud="Profesores" max-title :end-point="endPoint" name-crud="Profesor" icon="mdi-account-group" :entity-property="entityProperty" title-card="name" :headers="header">
      <template #form>
          <v-text-field dense label="Titulo" hide-details outlined class="mb-3" v-model="entityProperty.speciality"></v-text-field>
          <v-textarea rows="4" dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.salary"></v-textarea>
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
      { text: "Especialidad", value: "speciality" },
      { text: "Salario", value: "salary" },
    ],
    entityProperty:{
      speciality: '',
      salary: '',
    },
  }),

  watch:{
  },

  computed:{
    endPoint(){
      return `teachers`;
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