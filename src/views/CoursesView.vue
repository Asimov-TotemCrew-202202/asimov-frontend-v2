<template>
  <crud-custom title-crud="Cursos" end-point="courses" name-crud="Curso" 
  :hide-delete="!currentUserDirector" :hide-add="!currentUserDirector" :hide-edit="!currentUserDirector" icon="mdi-bullhorn-variant" :entity-property="entityProperty"  :headers="header" @edit="onEdit" @detalle="onDetail">
    <template #form>
        <v-text-field dense label="Nombre" hide-details outlined class="mb-3" v-model="entityProperty.name"></v-text-field>
        <v-textarea dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.description" rows="4" ></v-textarea>
        <v-select :disabled="!flagEdit" dense outlined v-model="entityProperty.competenceIds" hide-details :items="competencias" item-text="name" item-value="id" :menu-props="{ top: false, offsetY: true }" label="Competencias" multiple></v-select>
    </template>
    <template #rightColumn>
        <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-information</v-icon> <h2 class="py-3">Información</h2></div>
        <v-card outlined class="pa-3">
          Los cursos presentes en la programacion escolar dentro de la institución educativa.
        </v-card>
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
  flagEdit: false,
  data: null,
  header: [
    { text: "Descripción", value: "description" },
    { text: "Correlativo", value: "id" },
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
  currentUserDirector() {
    let roleUser = this.$store.state.auth.user.roles;
    return roleUser.includes('ROLE_PRINCIPAL');
  },
},

methods: {
  onEdit(value){
    this.flagEdit = true;
    console.log('VALUE ---> ', value);
  },
  onDetail(item){
    let id = item.id;
    this.$router.push({
      name: `courses-detail`,
      params: { id },
    });
  },
  async getData() {
    await this.$axios.get('competences')
    .then(response => {
      this.competencias = response.data;
      console.log('ARRAY ---> ', this.competencias);
    })
    .catch(error => {
      console.error(error);
    });
  },
},

mounted(){
},
created(){
  this.getData();
}
}
</script>

<style>
</style>