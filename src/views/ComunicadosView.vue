<template>
    <crud-custom title-crud="Comunicados" custom-put @detalle="onDetalle" :hide-edit="!currentUserDirector" :hide-delete="!currentUserDirector" max-title :end-point="endPoint" name-crud="Comunicado" icon="mdi-bullhorn-variant" :entity-property="entityProperty" title-card="title"  :headers="header" one-column>
      <template #form>
        <v-text-field dense label="Titulo" hide-details outlined class="mb-3" v-model="entityProperty.title"></v-text-field>
        <v-textarea rows="4" dense label="Descripcion" hide-details outlined class="mb-3" v-model="entityProperty.description"></v-textarea>
      </template>
      <template #rightColumn>
        <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-information</v-icon> <h2 class="py-3">Información</h2></div>
        <v-card outlined class="pa-3">
          Los comunicados sirven a manera de mensaje masivo para todos los docentes de tu Institución educativa.
        </v-card>
        <v-alert
          :value="dataComunicados"
          color="blue-grey"
          dark
          border="top"
          icon="mdi-message-alert-outline"
          transition="scale-transition"
          class="mt-3"
        >
          <span class="font-weight-bold">{{itemComu.title }}</span>
          <v-divider
            class="my-4 info"
            style="opacity: 0.22"
          ></v-divider>

          {{itemComu.description }}
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
    itemComu: {},
    dataComunicados: false,
    header: [
      { text: "Descripción", value: "description" },
    ],
    entityProperty:{
      title: '',
      description: '',
    },
  }),

  computed:{
    endPoint(){
      return `principals/${this.currentUserDirector? this.currentUserData.id :this.currentUserData.principalId }/statements`;
    },
    currentUserData() {
      return JSON.parse(localStorage.getItem('userData'));
    },
    currentUserDirector() {
      let roleUser = this.$store.state.auth.user.roles;
      return roleUser.includes('ROLE_PRINCIPAL');
    },
  },

  methods: {
    onDetalle(item){
      this.dataComunicados = false;
      setTimeout(() => {
        this.dataComunicados = true;
        this.itemComu= {
          ...item
        };
      }, 200);
    }
  },

  mounted(){
  },

  created(){
  }
}
</script>

<style scoped>
.v-application .info{
  background-color: white !important;
  border-color: white !important;
}
</style>