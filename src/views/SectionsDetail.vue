<template>
    <crud-custom :title-crud="sectionName" max-title hide-delete @detalle="onDetalle" :end-point="endPoint" name-crud="Alumno" icon="mdi-book" createEp="auth/signup" :entity-property="entityProperty" title-card="parentFullName" hide-edit :headers="header" >
      <template #form>
          <v-text-field @focus="setUser" dense required :rules="lastNameRules" label="Nombre y Apellidos" hide-details outlined class="mb-3" @blur="setNameEspeciality" v-model="entityProperty.first_name"></v-text-field>                    
          <v-text-field dense required :rules="lastNameRules" label="Email" hide-details outlined class="mb-3" v-model="entityProperty.email" @blur="createUsername"></v-text-field>                    
          <v-text-field dense label="Username" disabled hide-details outlined class="mb-3" v-model="entityProperty.username"></v-text-field>                    
          <v-text-field dense label="Institucion Educativa" disabled hide-details outlined class="mb-3" v-model="currentUser.last_name"></v-text-field>                    
          <v-text-field dense required :rules="lastNameRules" label="Celular" type="number" hide-details outlined class="mb-3" v-model="entityProperty.phone"></v-text-field>                    
          <v-text-field dense required :rules="lastNameRules" label="Celular Apoderado" hide-details outlined class="mb-3" v-model="entityProperty.phoneParent"></v-text-field>                    
          <v-text-field dense required :rules="lastNameRules" label="Password" :type="typeInput?'text':'password'" hide-details outlined class="mb-3" v-model="entityProperty.password">            <template v-slot:append>
              <v-tooltip bottom >
                <template v-slot:activator="{ on }">
                  <v-icon @click="typeInput = !typeInput" v-on="on">mdi-{{typeInput?'key':'key-outline'}}</v-icon>
                </template>
                {{typeInput?'Ocultar ':'Ver '}}Contraseña
              </v-tooltip>
            </template>
          </v-text-field>
      </template>
      <template #rightColumn>
        <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-information</v-icon> <h2 class="py-3">Información</h2></div>
        <v-card outlined class="pa-3">
          Agrupa a tus alumnos en secciones. Estas divisiones te ayudaran a organizar y administrar de manera eficiente el proceso de enseñanza y aprendizaje.
        </v-card>
        <v-skeleton-loader
          v-if="loadingItem"
          v-bind="attrs"
          class="mt-3"
          type="list-item-three-line, card-heading"
        ></v-skeleton-loader>
        <v-alert
          :value="dataComunicados"
          color="blue-grey"
          dark
          border="top"
          icon="mdi-account-school"
          transition="scale-transition"
          class="mt-3"
        >
          <span class="font-weight-bold">{{itemComu.first_name }}</span>
          <v-divider
            class="my-4 info"
            style="opacity: 0.22"
          ></v-divider>
          Correo:   {{itemComu.email}} <br>
          Celular:  {{itemComu.phone}} <br>
          Username:  {{itemComu.username}}
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
      </template>
      <template #leftBottomHeader>
        <v-btn dark color="white" class="mr-3" @click="backPage" outlined elevation="0">
            <v-icon class="mr-2">mdi-arrow-left</v-icon>REGRESAR
          </v-btn>
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
    loadingItem: false,
    loadingInit: false,
    dataComunicados: false,
    header: [
      { text: "Numero de apoderado", value: "phoneParent" },
      { text: "USER ID", value: "userId" },
    ],
    entityProperty:{
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      role: [],
      parentFullName: '',
      phoneParent: '',
      sectionId: ''
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
    currentUser() {
      return this.$store.state.auth.user;
    },
    endPoint(){
      return `students?sectionId=${this.pageId}`;
    },
    pageId() {
      return this.$route.params.id;
    },
    sectionName() {
      return `${this.section.name}`;
    }
  },

  methods: {
    async onDetalle(item){
      this.dataComunicados = false;
      this.loadingItem = true;
      try {
        const {data} = await this.$axios.get(`users/${item.userId}`);
        // console.log('INFORMATION', item);
        // console.log('INFORMATION', data);
        this.loadingItem = false;
        this.dataComunicados = true;
        this.itemComu= {
          ...data
        };
      } catch (error) {
        console.log(error);
      }
    },
    async getGradeInfo() {
      this.loadingInit= true;
      try {
        const {data} = await this.$axios.get(`sections/${this.pageId}`);
        this.section = data;
        this.loadingInit= false;
      } catch (error) {
        
      }
    },
    backPage(){
      this.$router.push({
        name: "sections",
      });
    },
    setNameEspeciality(){
      this.entityProperty.parentFullName = this.entityProperty.first_name;

    },
    createUsername() {
      const username = this.entityProperty.email.substring(0, this.entityProperty.email.indexOf('@'));
      this.entityProperty.username = username;
    },
    setUser(){
      this.entityProperty.last_name = this.currentUser.last_name;
      this.entityProperty.role = ["student"];
      this.entityProperty.sectionId = this.pageId;      
    }
  },

  mounted(){
    },

  created(){
    this.getGradeInfo();
  }
}
</script>

<style scoped>
.v-application .info{
  background-color: white !important;
  border-color: white !important;
}
</style>