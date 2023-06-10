<template>
    <crud-custom title-crud="Competencias" max-title hide-detail hide-delete :end-point="endPoint" name-crud="Competencia" icon="mdi-check-decagram" :entity-property="entityProperty" title-card="name"  :headers="header" one-column>
      <template #leftBottom>
        <v-btn fab small dense color="deep-purple accent-3" dark elevation="0" class="mr-2"><v-icon class="mr-0" small>mdi-menu</v-icon></v-btn>
      </template>
      <template #form>
        <v-text-field dense label="Titulo" hide-details outlined class="mb-3" v-model="entityProperty.name"></v-text-field>
        <v-textarea rows="4" dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.description"></v-textarea>
      </template>
      <template #rightColumn>
        <v-card outlined class="pa-3">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae porro nesciunt, eaque suscipit vero numquam, quo possimus aliquam ducimus aliquid quidem obcaecati laborum id placeat illo iure reprehenderit fugit libero?
        </v-card>
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