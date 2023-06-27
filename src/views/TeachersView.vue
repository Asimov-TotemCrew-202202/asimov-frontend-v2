<template>
    <div>
    <crud-custom title-crud="Profesores" hide-edit hide-delete max-title :end-point="endPoint" createEp="auth/signup" name-crud="Profesor" icon="mdi-account-group" :entity-property="entityProperty" title-card="speciality" :headers="header" ref="crud" @detalle="onDetalle">
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
    <v-dialog persistent width="700" v-model="dialogAsign">
      <v-card>
        <v-card-title style="color: white; background-color: #081d87;">Asignación Docente</v-card-title>
        <div class="pa-8 px-8">
          <v-skeleton-loader
            v-if="loadingCard"
            :loading="loadingCard"
            type="article, actions"
          ></v-skeleton-loader>
          <card-custom v-if="!loadingCard" cancel-hover hide-delete hide-edit hide-detail title="Datos personales" :headers="headerCard" :item="itemTeacher">

          </card-custom>
          <v-form v-if="!loadingCard">
            <v-select
              :items="coursesList"
              outlined
              item-value="id"
              item-text="name"
              hide-details
              v-model="entityModel.course_id"
              dense
              label="Cursos"
              class="mt-3"
            ></v-select>
            <v-select
              :items="gradesList"
              outlined
              item-value="id"
              item-text="name"
              v-model="entityModel.grade_id"
              hide-details
              dense
              label="Grados"
              class="mt-3"
            ></v-select>
          </v-form>

        </div>
        <v-card-actions v-if="!loadingCard">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="laodingAsign"
            color="red"
            text
            @click="() => {dialogAsign = false}"
          >
            CERRAR
          </v-btn>
          <v-btn
            :loading="laodingAsign"
            color="#081d87"
            text
            @click="asignTeacher"
          >
            ASIGNAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </div>
</template>

<script>
import CrudCustom from '@/components/CrudCustom.vue'
import CardCustom from '@/components/CardCustom.vue'

export default {
  name: 'ComunicadosCustom',

  components:{
    CrudCustom,
    CardCustom,
  },

  data: () => ({
    dataComunicados: false,
    laodingAsign: false,
    typeInput: false,
    items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
    dialogAsign: false,
    loadingCard: false,
    coursesList: [],
    gradesList: [],
    itemTeacher: {},
    header: [
      { text: "ID Docente", value: "userId" },
      { text: "Salario", value: "salary" },
    ],
    headerCard: [
      { text: "Nombre Completo", value: "first_name" },
      { text: "Username", value: "username" },
      { text: "Email", value: "email" },
      { text: "Institución Educativa", value: "last_name" },
      { text: "Celular", value: "phone" },
    ],
    entityModel: {
      school_year: "",
      teacher_id: '',
      course_id: '',
      grade_id: ''
    },
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
    updateCourses(){
      return this.coursesList.map(curso => curso.name);
    },
    updateGrades(){
      return this.gradesList.map(curso => curso.name);
    }
  },

  methods: {
    async onDetalle(item){
      this.dialogAsign = true;
      this.loadingCard = true;
      try {
        const {data} = await this.$axios.get(`users/${item.userId}`);
        // console.log('INFORMATION', item);
        // console.log('INFORMATION', data);
        this.loadingCard = false;
        this.itemTeacher = {...data};
      } catch (error) {
        console.log(error);
      }
    },
    async asignTeacher(){
      const fechaActual = new Date();
      this.laodingAsign = true;
      this.entityModel.school_year = fechaActual.getFullYear();
      this.entityModel.teacher_id = this.itemTeacher.id;
      try {
        await this.$axios.post(`principals/${this.currentUserData.id}/subjects`, this.entityModel);
        this.dialogAsign = false;
        this.laodingAsign = false;
        this.entityModel= {
          school_year: "",
          teacher_id: '',
          course_id: '',
          grade_id: ''
        };
      } catch (error) {
        console.log(error);
      }
    },
    async initCourses(){
      try {
        const {data} = await this.$axios.get(`courses`);
        this.coursesList = data;
      } catch (error) {
        console.log(error);
      }
    },
    async initGrades(){
      try {
        const {data} = await this.$axios.get(`grades`);
        this.gradesList = data;
      } catch (error) {
        console.log(error);
      }
    },
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
    this.initCourses();
    this.initGrades();
  }
}
</script>

<style>
</style>