<template>
  <div style="display: grid; grid-template-columns: 70% 30%; grid-template-rows: 1fr; gap: 10px;">
    <v-overlay :value="loadingView">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  <div class="d-flex justify-center">
    <v-card color="#eeeeee" elevation="0" style="width: 100%;">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">mdi-flag-checkered</v-icon> 
          <v-progress-circular
            v-if="loadingView"
            indeterminate
            color="white"
          ></v-progress-circular>
          <h2 v-else >{{entityProp.name}}</h2>
        <v-spacer></v-spacer>

        <div>
          
          <v-btn dark color="white" @click="backPage" outlined elevation="0">
            <v-icon class="mr-2">mdi-arrow-left</v-icon>REGRESAR
          </v-btn>

        </div>
      </div>
      <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-text-box</v-icon> <h2 class="py-3">Descripción</h2></div>
      <v-skeleton-loader
        v-if="loadingView"
          type="list-item-three-line"
        ></v-skeleton-loader>
      <v-card v-else class="pa-5" elevation="0" outlined>
        <p class="ma-0 text-justify">{{entityProp.description}}</p>

      </v-card>
      <div class="d-flex pl-3 mt-5 align-center"><v-icon size="30" color="#081d87" class="mr-3">mdi-tooltip-check</v-icon> <h2 class="py-3">Temas</h2> <v-spacer></v-spacer>
        <v-btn color="#081d87" class="mr-4 elevation-0" dark @click="openAdd"> <v-icon class="mr-2">mdi-plus</v-icon>AGREGAR</v-btn></div>
        <div v-if="loadingTopic">
        <v-skeleton-loader
        v-for="(item, index) in 3" :key="index"
          type="list-item-three-line, actions"
          class="mb-3"
        ></v-skeleton-loader>

        </div>
      <v-expansion-panels v-else class="elevation-0">
      <v-expansion-panel
      class="elevation-0"
        v-for="(item,i) in topics"
        :key="i"
      >
        <v-expansion-panel-header class="font-weight-bold text-uppercase">SEMANA {{ (i+1).toString().padStart(2, '0') }} - TEMA {{ item.title }}
          <div class="d-flex justify-end">
            <v-btn v-if="item.status==true" class="mr-5 elevation-0" color="success"  plain text-color="#ffffff">
              <v-icon left>
                mdi-check-decagram
              </v-icon>
              COMPLETADO
            </v-btn>
          </div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-justify">
            {{ item.description }}
          </p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="0" color="warning" class="" @click="openInfo(i)" :class="item.status!=true? 'mr-2':''"> <v-icon class="mr-3">mdi-eye</v-icon>VER INFO</v-btn>
            <v-btn elevation="0" v-if="item.status==true" color="purple" dark class="mr-2" :loading="loadingExamView" @click="openExam(item.id)"> <v-icon class="mr-3">mdi-file</v-icon>EVALUACIÓN</v-btn>
            <div v-if="!currentUserDirector && item.status!=true" elevation="0" class="bn5" :class="{ 'active-after': isActive }" @click="activeOverlay(i, item.id)"> <v-icon color="white" class="mr-3">mdi-assistant</v-icon>GENERAR EVALUACIÓN</div>
          </v-card-actions>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          Regitrar Curso
        </v-card-title>

        


        <v-form class="pa-6">
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
          <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
        </v-form>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="dialog = false"
          >
            CERRAR
          </v-btn>
          <v-btn
            color="#081d87"
            text
            @click="dialog = false"
          >
            REGISTRAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
  </div>
    <div style="width: 100%; border-radius: 8px;">
      <v-card elevation="0" class="mb-2 font-weight-bold">
              <v-card-title class="d-flex px-4 pb-2">
                <div><h3>Porcentaje</h3></div>
                <v-spacer></v-spacer>
                <div><h3>{{percent}}%</h3></div>
              </v-card-title>
              <div class="pb-5 px-4">
                <v-progress-linear
                  class="rounded-xl"
                  height="20"
                  :value="percent"
                  striped
                  color="#081d87"
                ></v-progress-linear>
              </div>
            </v-card>
      <v-card class="pa-5" elevation="0">
        <h3>Competencias</h3>
        <p class="my-3 text-justify">Las competencias en un curso son habilidades y conocimientos esenciales que se adquieren para lograr un aprendizaje efectivo y alcanzar el éxito en el ámbito profesional.</p>
        <chip-custom v-for="(item, index) in competences" :key="index" class="mr-3 mt-3" :text="item.name" @click="openCompetence(item.id)" />

      </v-card>
      <v-alert
          :value="dialogCompetence"
          color="blue-grey"
          dark
          border="top"
          icon="mdi-message-alert-outline"
          transition="scale-transition"
          class="mt-3"
        >
          <span class="font-weight-bold">{{competencia.name }}</span>
          <v-divider
            class="my-4 info"
            style="opacity: 0.22"
          ></v-divider>

          {{competencia.description }}
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
              @click="dialogCompetence= !dialogCompetence"
            >
              CERRAR
            </v-btn>
          </v-row>
        </v-alert>

    
    </div>

    <!-- <v-overlay :value="overlay"></v-overlay> -->
    <v-dialog
      v-model="overlay"
      persistent
      width="300"
    >
      <v-card
        color="#081d87"
        dark
        class="pt-4"
        elevation="0"
      >
        <v-card-text>
          Generando evaluación
          <v-progress-linear
            indeterminate
            color="white"
            height="10"
            class="mb-0 mt-3 rounded-xl"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="infoModel" persistent
      width="800">
      <v-card >
        <v-card-title style="color: white; background-color: #081d87;">TEMA</v-card-title>
        <div style="border-radius: 8px; height: 500px; width: 100%; overflow: auto;">
          <p class="pa-4 ma-0" style="white-space: pre-line;" > {{info}}
          </p>

        </div>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            text
            @click="openInfo(-1)"
          >
            CERRAR
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>

    <v-dialog v-model="dialogAdd" persistent
      width="650">
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          Registrar Tema
        </v-card-title>

        <v-form class="pa-6">
          <v-file-input v-model="archivo" @change="leerArchivo" dense hide-details outlined label="Seleccionar archivo" class="mb-3"></v-file-input>
          <v-text-field v-model="entityProperty.title" dense label="Titulo" hide-details outlined class="mb-3"></v-text-field>
          <v-text-field v-model="entityProperty.description" counter="25" :rules="rules" dense label="Descripción" outlined></v-text-field>
          <v-textarea
            clearable
            outlined
            hide-details
            clear-icon="mdi-close-circle"
            label="Contenido"
            rows="8"
            v-model="entityProperty.file"
          ></v-textarea>

        </v-form>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            :loading="loadingAddTopic"
            @click="cancelDialog"
          >
            CERRAR
          </v-btn>
          <v-btn
            color="#081d87"
            text
            :loading="loadingAddTopic"
            @click="addTopic"
          >
            REGISTRAR
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>

    <v-dialog
      v-model="evaDialog"
      persistent
      width="650"
    >
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          Evaluación generada
        </v-card-title>

        


        <v-card-text class="mt-5">
          <v-card v-for="(item, index) in repuestas" :key="index" outlined class="pa-3 mb-2">
            <p class="mb-3 font-weight-bold">{{item.question}}</p>  
            <p v-for="(option, i) in item.options" :key="i" class="my-0 font-weight-light" :class="item.correctOptionOrder == (i+1) ?'font-weight-bold':''"> {{letters[i]}} {{option}}</p>  
          </v-card>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="closeExam"
          >
            CANCELAR
          </v-btn>
          <v-btn
            v-if="!showExam"
            :loading="examLoading"
            color="#081d87"
            text
            @click="addExam"
          >
            REGISTRAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      timeout="1500"
      dark
      :color="colorSnak"
    >
    {{textError}}

      <template v-slot:action="{ attrs }">
        <v-btn
          dark
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

  </div>
</template>

<script>
import ChipCustom from '@/components/ChipCustom.vue'
// import { Configuration, OpenAIApi } from "openai";

  export default {
    name: 'CoursesDetail',

    components:{
      ChipCustom,
    },

    data: () => ({
      textError: '',
      archivo: null,
      loadingAddTopic: false,
      colorSnak: '',
      examLoading: false,
      loadingTopic: false,
      loadingView: false,
      loadingExamView: false,
      showExam: false,
      snackbar: false,
      dialogCompetence: false,
      dialogAdd: false,
      selectIdTopic: '',
      competences: null,
      letters: ['A)', 'B)', 'C)'],
      topics: [],
      entityProp: {},
      dialog: false,
      isActive: false,
      overlay: false,
      evaDialog: false,
      contador: 0,
      accordion: 0,
      repuestas: null,
      info: null,
      infoModel: false,
      competencia: {},
      rules: [v => v.length <= 25 || 'Max 25 caracteres'],
      
      entityProperty: {
        title: "",
        description: "",
        file: "",
      },
      entityExams: {
        examDetailResources: []
      },
      items: [
        { title: 'Click Me1' },
        { title: 'Click Me2' },
        { title: 'Click Me3' },
      ],
      niveles: [
        { 
          title: 'Primaria',
          number: 6,
        },
        { 
          title: 'Secundaria',
          number: 5,
        },
      ],
    }),
    computed:{
      pageId() {
        return this.$route.params.id;
      },
      currentUserDirector() {
        let roleUser = this.$store.state.auth.user.roles;
        return roleUser.includes('ROLE_PRINCIPAL');
      },
      percent() {
        const totalObjetos = this.topics.length;
        const objetosTrue = this.topics.filter(obj => obj.status === true);
        const porcentaje = (objetosTrue.length / totalObjetos) * 100;
        return porcentaje.toFixed(2);
      },
      
    },
    methods:{
      cancelDialog(){
        this.archivo = null,
        this.entityProperty= {
          title: "",
          description: "",
          file: "",
        },
        this.dialogAdd = false;
      },
      leerArchivo() {
       if (this.archivo) {
         const lector = new FileReader();
         lector.onload = (e) => {
           const contenido = e.target.result;
           console.log(contenido); // Hacer algo con el contenido del archivo
            this.entityProperty.file = contenido;
         };
         lector.readAsText(this.archivo);
         this.entityProperty.title = this.archivo.name.replace(/\.txt$/, "");
       }
      },
      openInfo(i){
        this.infoModel = !this.infoModel;
        if (i==-1) {
          this.info = '';
          
        } else {
          this.info = this.topics[i].file;   
          console.log('TEXT INFO--->', this.info);       
        }

      },
      logDetalle(item){
        console.log('LOG ITEM--->',item);
      },
      openAdd(){
        this.dialogAdd = true;
      },
      backPage(){
        this.$router.push({
          name: "courses",
        });
      },
      async addTopic(){
        this.loadingAddTopic =true;
        try {
          await this.$axios.post(`courses/${this.pageId}/topics`,this.entityProperty);
          this.initTopics();
          this.cancelDialog();
          this.loadingAddTopic =false;
        } catch (error) {
          
        }
      },
      async openExam(id){
        this.loadingExamView = true;          
        try {
          const {data} = await this.$axios.get(`topics/${id}/exams`);
          this.loadingExamView = false;          
          this.repuestas = data.examDetailResources;
          this.evaDialog = true;          
          this.showExam = true;          
        } catch (error) {
          
        }
      },
      closeExam(){
        this.evaDialog = false;
        this.entityExams= {
          examDetailResources: []
        };
      },
      async addExam(){
        for (let index = 0; index < this.repuestas.length; index++) {
          this.entityExams.examDetailResources.push({
            question: this.repuestas[index].question,
            options: [ ...this.repuestas[index].options ],
            correctOptionOrder: this.repuestas[index].correctOptionOrder,
          })
        }
        this.examLoading = true;
        try {
          await this.$axios.post(`topics/${this.selectIdTopic}/exams`,this.entityExams);
          this.colorSnak='green accent-4';
          this.snackbar = true;
          this.textError = 'Se registro evaluacion exitosamente!';
          this.evaDialog = false; 
          this.showExam = false; 
          this.examLoading = false;
          this.entityExams= {
            examDetailResources: []
          };
          this.completeTopic(this.selectIdTopic);
        } catch (error) {
          this.colorSnak='red';
          this.textError = 'Evaluación existente';
          this.evaDialog = false; 
          this.snackbar = true;
          
        }
      },
      async completeTopic(id){
        try {
          await this.$axios.post(`topics/${id}/complete`);
          this.textError = 'TEMA COMPLETADO!';
          this.snackbar = true;
          this.initTopics();
        } catch (error) {
          this.textError = error;
          this.snackbar = true;
        }
      },
      openCompetence(id){
        this.dialogCompetence = false;
        setTimeout(() => {
          console.log('BANDERA');
          this.dialogCompetence = true;
          let sampleData = this.competences.find(objeto => objeto.id === id);
          this.competencia = sampleData;
          console.log('BANDERA FIN');          
        }, 200);
      },
      async initTopics(){
        this.loadingTopic = true;
        try {
          const topicsData = await this.$axios.get(`courses/${this.pageId}/topics`);
          this.topics = topicsData.data;
          console.log('TOPICS----->', this.topics);          
          this.loadingTopic = false;
        } catch (error) {
          
        }

      },
      async initData(){
        this.loadingView = true;
        try {
          const {data} = await this.$axios.get(`courses/${this.pageId}`);
          const coursesData = await this.$axios.get(`courses/${this.pageId}/competences`);
          this.entityProp = data;
          console.log('DATA----->', data);
          this.competences = coursesData.data;
          console.log('COMPETENCES----->', this.competences);
          this.loadingView = false;
        } catch (error) {
          
        }
      },
      async generateEva(i, sampleId){
        this.overlay = true;
        this.isActive = true;
        this.selectIdTopic = sampleId;

        // -----------------------------------------COLOCAR KEYS AQUI-----------------------------------------
        // const configuration = new Configuration({
        //     organization: "org-",
        //     apiKey: 'sk-',
        // });
        // const openai = new OpenAIApi(configuration);
          // -----------------------------------------COLOCAR KEYS AQUI-----------------------------------------

        
        const promptAll = `Del tema propuesto genera una evaluacion de 4 preguntas con 3 alternativas de respuesta unica.\nDame las preguntas y alternativas en formato JSON con los atributos que propongo, ademas considera aregar una propiedad que mencione la alternativa correcta.\n\n[\n  {\n    \"question\": \"¿CONTENIDO DE PREGUNTA?\",\n    \"options\": [\n      \"CONTENIDO ALTERNATIVA 1\",\n      \"CONTENIDO ALTERNATIVA 2\",\n      \"CONTENIDO ALTERNATIVA 3\"\n    ],\n    \"correctOptionOrder\": (VALOR ENTRE 1 y 3)\n  },\n  {...},\n  {...},\n  {...},\n  {...},\n] \n\n TEMA00\${this.id}:{${this.topics[i].file}}`;
        const promptFinal = promptAll.toString();

        const promptAlter = "Eres un profesor de una institucion educativa, analiza el siguiente TEMA00${this.id}, porque necesitare que lo consideres para una futura pregunta.  \n        TEMA00${this.id}:{Origen de la Geografía\nLa geografía tiene un largo pasado y una breve historia. Los griegos fueron los primeros en bosquejar y utilizarla como una herramienta para conocer los lugares mediante la descripción física de la superficie de la tierra.\n\nPrincipios Geográficos\nLocalización (extensión)\n\nFriedrich Ratzel\nConsiste en ubicar el lugar exacto de un hecho o fenómeno geográfico tomando en cuenta algunos aspectos espaciales como latitud, longitud, altitud, límites, superficie, etc.\n\nDescripción (generalización)\nPaul Vidal de la Blache\n\nConsiste en dar a conocer las características de un hecho o fenómeno geográfico que se proponga a estudiar.\n\nCausalidad (explicación)\nAlexander Von Humboldt\n\nPermite identificar el porqué de la ocurrencia de un hecho o fenómeno geográfico. Otorga carácter científico a la geografía.\n\nComparación (analogía)\nKarl Ritter y Vidal de la Blache\n\nConsiste en establecer semejanzas y diferencias entre el hecho o fenómeno geográfico que se está estudiando.\n\nEvolución (actividad)\nJean Brunhes\n\nSeñala que todo se encuentra en constante transformación, teniendo como agentes transformadores al hombre o a la naturaleza.}\n\nGenera una evaluacion de 3 preguntas con 3 alternativas de respuesta unica.\nDame las preguntas y alternativas en formato json en la sintaxis que propongo, ademas considera aregar una propiedad que mencione la alternativa correcta.\n\n[\n  {\n    \"question\": \"¿CONTENIDO DE PREGUNTA?\",\n    \"options\": [\n      \"CONTENIDO ALTERNATIVA 1\",\n      \"CONTENIDO ALTERNATIVA 2\",\n      \"CONTENIDO ALTERNATIVA 3\"\n    ],\n    \"correctOptionOrder\": 1\n  },\n  {...},\n  {...},\n  {...},\n  {...},\n]";
        
        const response = await this.$openai.createCompletion({
          model: "text-davinci-003",
          prompt: promptFinal,
          max_tokens: 750,
          temperature: 0.5,
        });

        console.log('RESPONSE--->',response );

        try {
          this.repuestas = JSON.parse(response.data.choices[0].text.trim());
          this.evaDialog = true;          
          this.overlay = false;
          this.showExam = false;
          this.isActive = false;          

          
        } catch (error) {
          this.overlay = false;
          this.isActive = false;          
          this.snackbar = true; 
          this.colorSnak = 'red'; 
          this.textError = 'Error en sintaxis de examen!';
          this.evaDialog = false;          
        }

        

      },
      async activeOverlay(i, id){
        
        await this.generateEva(i, id);
        setTimeout(() => {
          console.log('RESPUESTAS', this.repuestas);
        }, 5500);

      }
    },
    async created(){
      this.initData();
      this.initTopics();
    }

  }
</script>

<style lang="scss">
$medium: 1500px;

.v-application .info{
  background-color: white !important;
  border-color: white !important;
}

.card-course{
  transition: transform 0.3s ease;

}
.card-course:hover{

   z-index: 10;
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}

.bn5 {
  font-weight: 900;
  padding: 5px 10px;
  border: none;
  outline: none;
  color: rgb(255, 255, 255);
  background: #111;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border-radius: 5px;
  user-select: none;
}

.bn5:before {
  content: "";
  background: linear-gradient(
    45deg,
    #ff0000,
    #ff7300,
    #fffb00,
    #48ff00,
    #00ffd5,
    #002bff,
    #7a00ff,
    #ff00c8,
    #ff0000
  );
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 400%;
  z-index: -1;
  filter: blur(5px);
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  animation: glowingbn5 20s linear infinite;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  border-radius: 5px;
}

@keyframes glowingbn5 {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}

.bn5:active {
  color: #ffffff;
  font-weight: 900;
  background-color: #11111166;
}

.bn5:active:after {
  background: transparent;
}

.bn5.active-after:after {
  background: transparent;
  
}

.bn5:hover:before {
  opacity: 1;
}
.bn5.active-after:before {
  opacity: 1;
}

.bn5:after {
  z-index: -1;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #191919;
  left: 0;
  top: 0;
  border-radius: 5px;
}

.v-expansion-panel::before{
  box-shadow: none;
}
</style>