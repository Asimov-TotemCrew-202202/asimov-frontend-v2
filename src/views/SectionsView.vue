<template>
    <crud-custom title-crud="Secciones" ref="crud" max-title hide-delete hide-edit @detalle="onDetalle" :end-point="endPoint" name-crud="Sección" icon="mdi-book" :entity-property="entityProperty" title-card="name"  :headers="header">
      <template #form>
        <v-alert
          text
          outlined
          color="info"
          icon="mdi-information"
          class="text-justify"
        >
          Considera que al registrar una sección se antepondra el prefijo de 'SEC-'.<br>En otra palabras si usted registra en el siguiente campo los numeros de '123' o la letra 'A', la seccion se visualizara con el nombre de 'SEC-123' o 'SEC-A'
        </v-alert>
        <v-text-field dense label="Nombre Sección" hide-details outlined class="mb-3" v-model="entityProperty.name" @keydown="setKey" ></v-text-field>
      </template>
      <template #centralBottomHeader>
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
    setKey(){
      const partes = this.entityProperty.name.split("SEC-");
      partes.join(""); 
      this.entityProperty.name = "SEC-" + partes.join("");
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