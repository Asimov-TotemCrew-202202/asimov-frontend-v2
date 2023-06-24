<template>
    <crud-custom title-crud="Profesores" hide-edit hide-delete max-title :end-point="endPoint" createEp="auth/signup" name-crud="Profesor" icon="mdi-account-group" :entity-property="entityProperty" title-card="speciality" :headers="header" ref="crud">
      <template #form>
          <v-text-field @focus="setUser" dense required :rules="lastNameRules" label="Nombre y Apellidos" hide-details outlined class="mb-3" @blur="setNameEspeciality" v-model="entityProperty.first_name"></v-text-field>                    
          <v-text-field dense required :rules="lastNameRules" label="Email" hide-details outlined class="mb-3" v-model="entityProperty.email" @blur="createUsername"></v-text-field>                    
          <v-text-field dense label="Username" disabled hide-details outlined class="mb-3" v-model="entityProperty.username"></v-text-field>                    
          <v-text-field dense label="Institucion Educativa" disabled hide-details outlined class="mb-3" v-model="currentUser.last_name"></v-text-field>                    
          <v-text-field dense required :rules="lastNameRules" label="Celular" type="number" hide-details outlined class="mb-3" v-model="entityProperty.phone"></v-text-field>                    
          <v-text-field dense required :rules="lastNameRules" label="Salario" hide-details outlined class="mb-3" v-model="entityProperty.salary"></v-text-field>                    
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
          Sabemos lo importantes que es conocer la informacion personal de todos tus docentes. Aqui podras evidenciar la informacon que ingresaste de los docentes que estan registrados en tu institución educativa.
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
    typeInput: false,
    header: [
      { text: "ID Docente", value: "userId" },
      { text: "Salario", value: "salary" },
    ],
    entityProperty:{
      username: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      phone: '',
      role: [],
      speciality: '',
      salary: '',
      directorId: ''
    },
    lastNameRules: [
      value => {
        if (value) return true
        return 'Required.'
      }
    ],
  }),

  watch:{
  },

  computed:{
    currentUser() {
      return this.$store.state.auth.user;
    },
    currentUserData() {
      return JSON.parse(localStorage.getItem('userData'));
    },
    endPoint(){
      return `principals/${this.currentUserData.id}/teachers`;
    },
  },

  methods: {
    createUsername() {
      const username = this.entityProperty.email.substring(0, this.entityProperty.email.indexOf('@'));
      this.entityProperty.username = username;
    },
    setNameEspeciality(){
      this.entityProperty.speciality = this.entityProperty.first_name;

    },
    setUser(){
      this.entityProperty.last_name = this.currentUser.last_name;
      this.entityProperty.role = ["teacher"];
      this.entityProperty.directorId = this.currentUserData.id;      
    }
  },

  mounted(){
  },

  async created(){
  }
}
</script>

<style>
</style>