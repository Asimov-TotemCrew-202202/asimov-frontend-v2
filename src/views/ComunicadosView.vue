<template>
    <crud-custom title-crud="Comunicados" end-point="courses" name-crud="Comunicado" icon="mdi-bullhorn-variant">
      <template #form>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Descripcion" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Competencias" hide-details outlined></v-text-field>
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
    ]
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