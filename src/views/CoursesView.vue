<template>
  <crud-custom title-crud="Cursos" end-point="courses" name-crud="Curso" icon="mdi-bullhorn-variant" :entity-property="entityProperty"  :headers="header">
    <template #form>
        <v-text-field dense label="Nombre" hide-details outlined class="mb-3" v-model="entityProperty.name"></v-text-field>
        <v-textarea dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.description" rows="4" ></v-textarea>
        <v-select dense outlined v-model="entityProperty.competenceIds" hide-details :items="competencias" item-text="nombre" item-value="id" :menu-props="{ top: true, offsetY: true }" label="Competencias" multiple></v-select>
    </template>
    <template #bottomCard>
    </template>
  </crud-custom>
</template>

<script>
import CrudCustom from '@/components/CrudCustom.vue'
import ChipCustom from '@/components/ChipCustom.vue'


export default {
name: 'CoursesCustom',

components:{
  CrudCustom,
  ChipCustom,
},

data: () => ({
  dataCourses: false,
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
}),

watch:{
},

computed:{
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