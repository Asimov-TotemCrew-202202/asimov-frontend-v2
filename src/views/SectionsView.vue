<template>
    <crud-custom title-crud="Secciones" ref="crud" max-title hide-delete @detalle="onDetalle" :end-point="endPoint" name-crud="Sección" icon="mdi-book" :entity-property="entityProperty" title-card="name"  :headers="header" one-column>
      <template #form>
        <v-text-field dense label="Name" hide-details outlined class="mb-3" v-model="entityProperty.name"></v-text-field>
      </template>
      <template #centralBottomHeader>
        <!-- <v-select
            style="display: inline-flex; width: 150px;"
            :items="grades"
            item-text="name"
            item-value="id"
            v-model="gradeSelected"
            @change="reloadCrud"
            dense
            dark color="white" 
            class="mr-3" 
            outlined 
            elevation="0"
            :rules="[v => !!v || 'Item is required']"
            hide-details
            required
        ></v-select> -->
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="white"
              dark
              v-bind="attrs"
              v-on="on"
              class="mr-3"
              outlined
              :loading="laoding"
            >
               <v-icon small class="mr-2">mdi-filter-variant</v-icon>
              {{itemGrade.name}}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in grades"
              :key="index" @click="setGrade(item)"
            >
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template #rightColumn>
        <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-information</v-icon> <h2 class="py-3">Información</h2></div>
        <v-card outlined class="pa-3">
            Agrupa a tus alumnos en secciones. Estas divisiones te ayudaran a organizar y administrar de manera eficiente el proceso de enseñanza y aprendizaje.
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
          <span class="font-weight-bold">{{itemComu.name }}</span>
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
        <!-- <div v-if="dataComunicados" class="d-flex pl-3 mt-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-file-document</v-icon> <h2 class="py-3">Contenido</h2></div>
        <v-card v-if="dataComunicados" outlined class="pa-3">
          <v-card-title class="pa-0">{{itemComu.name }}</v-card-title>
          {{itemComu.description }}
        </v-card> -->
      </template>
    </crud-custom>
</template>

<script>
import CrudCustom from '@/components/CrudCustom.vue'
import router from '@/router';


export default {
  name: 'ComunicadosCustom',

  components:{
    CrudCustom,
  },

  data: () => ({
    itemComu: {},
    itemGrade: {
      id: 1,
      name: "1ro secundaria"
    },
    dataComunicados: false,
    laoding: false,
    header: [
        { text: "Name", value: "name" },
    ],
    entityProperty:{
      name: '',
    },
    grades: [],
    gradeSelected: 1,
  }),

  watch:{
    
  },

  computed:{
    endPoint(){
      return `grades/${this.itemGrade.id}/sections`;
    },
  },

  methods: {
    onDetalle(item){
      let id = item.id;
      this.$router.push({
        name: `sections-detail`,
        params: { id },
      });
    },
    reloadCrud() {
      this.$refs.crud.getData();
    },
    async initGrades(){
      try {
        const {data} = await this.$axios.get(`grades`);
        this.grades = data;
        const val = {...this.grades[0]};
        this.itemGrade = { ...val};
      } catch (error) {
        
      }

    },
    setGrade(item){
      this.itemGrade = {...item};
      setTimeout(() => {
        this.$refs.crud.getData();        
      }, 100);
    }

  },

  mounted(){
    
    
  },

  async created(){
    this.laoding= true;
    await this.initGrades();
    this.laoding= false;
  }
}
</script>

<style scoped>
.v-application .info{
  background-color: white !important;
  border-color: white !important;
}

</style>