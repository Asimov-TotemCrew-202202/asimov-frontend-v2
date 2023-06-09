<template>
  <div style="display: grid; grid-template-columns: 70% 30%; grid-template-rows: 1fr; gap: 10px;">

  <div class="d-flex justify-center">
    <v-card color="#eeeeee" elevation="0" style="width: 100%;">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">mdi-flag-checkered</v-icon> <h2>{{entityProp.name}}</h2>
        <v-spacer></v-spacer>

        <div>
          
          <v-btn dark color="white" @click="backPage" outlined elevation="0">
            <v-icon class="mr-2">mdi-arrow-left</v-icon>REGRESAR
          </v-btn>

        </div>
      </div>
      <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-text-box</v-icon> <h2 class="py-3">Descripción</h2></div>
      <v-card class="pa-5" elevation="0" outlined>
        <p class="ma-0 text-justify">{{entityProp.description}}</p>

      </v-card>
      <div class="d-flex pl-3 mt-5 align-center"><v-icon size="30" color="#081d87" class="mr-3">mdi-tooltip-check</v-icon> <h2 class="py-3">Temas</h2> <v-spacer></v-spacer>
        <v-btn color="#081d87" class="mr-4 elevation-0" dark @click="openAdd"> <v-icon class="mr-2">mdi-plus</v-icon>AGREGAR</v-btn></div>
      <v-expansion-panels class="elevation-0">
      <v-expansion-panel
      class="elevation-0"
        v-for="(item,i) in topics"
        :key="i"
      >
        <v-expansion-panel-header class="font-weight-bold text-uppercase">SEMANA {{ (i+1).toString().padStart(2, '0') }} - TEMA {{ item.title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-justify">
            {{ item.description }}
          </p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="0" class="mr-3" @click="openInfo(i)"> <v-icon class="mr-3">mdi-eye</v-icon>INFO</v-btn>
            <v-btn elevation="0" class="mr-3 ml-0"> <v-icon class="mr-3">mdi-check-decagram</v-icon>COMPLETAR</v-btn>
            <div elevation="0" class="bn5" :class="{ 'active-after': isActive }" @click="activeOverlay(i)"> <v-icon color="white" class="mr-3">mdi-assistant</v-icon>EVALUACIÓN IA</div>
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
            CANCEL
          </v-btn>
          <v-btn
            color="#081d87"
            text
            @click="dialog = false"
          >
            CREATE
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
                <div><h3>60%</h3></div>
              </v-card-title>
              <div class="pb-5 px-4">
                <v-progress-linear
                  class="rounded-xl"
                  height="20"
                  value="60"
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
          <v-text-field v-model="entityProperty.title" dense label="Titulo" hide-details outlined class="mb-3"></v-text-field>
          <v-text-field v-model="entityProperty.description" dense label="Descripción" hide-details outlined class="mb-3"></v-text-field>
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
            @click="dialogAdd = false"
          >
            CERRAR
          </v-btn>
          <v-btn
            color="#081d87"
            text
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
          EVALUACIÓN
        </v-card-title>

        


        <v-card-text class="mt-5">
          <v-card v-for="(item, index) in repuestas" :key="index" outlined class="pa-3 mb-2">
            <p class="mb-3 font-weight-bold">{{item.question}}</p>  
            <p v-for="(option, i) in item.options" :key="i" class="my-0 font-weight-light">{{i +') '}} {{option}}</p>  
          </v-card>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="evaDialog = false"
          >
            CANCELAR
          </v-btn>
          <v-btn
            color="#081d87"
            text
            @click="addExam"
          >
            REGISTRAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogCompetence"
      persistent
      width="650"
    >
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          COMPETENCIA {{ competencia.name }}
        </v-card-title>
        
        
        
        
        <v-card-text class="mt-5">
          {{ competencia.description }}
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="dialogCompetence = false"
          >
            CERRAR
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbar"
      timeout="1500"
    >
    {{textError}}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
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
import { Configuration, OpenAIApi } from "openai";
// import CardCustom from '@/components/CardCustom.vue'

  export default {
    name: 'CoursesDetail',

    components:{
      ChipCustom,
      // CardCustom,
    },

    data: () => ({
      textError: '',
      snackbar: false,
      dialogCompetence: false,
      dialogAdd: false,
      competences: null,
      topics: null,
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
      competencias:[
      'Desarrollo personal',
      'Pensamiento crítico',
      'Creatividad',
      'Innovación',
      'Comunicación efectiva',
      'Trabajo en equipo',
      'Ciudadanía',
      'Liderazgo',
      'Alfabetización digital',
      'Aprendizaje continuo',
      'Resolución de conflictos',
      'Ética y valores',
      ]
    }),
    computed:{
      pageId() {
        return this.$route.params.id;
      },
      
    },
    methods:{
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
        try {
          await this.$axios.post(`courses/${this.pageId}/topics`,this.entityProperty);
          this.initData();
          this.entityProperty= {
            title: "",
            description: "",
            file: "",
          };
          this.dialogAdd=false;
        } catch (error) {
          
        }
      },
      async addExam(){
        for (let index = 0; index < this.repuestas.length; index++) {
          this.entityExams.examDetailResources.push({
            question: this.repuestas[index].question,
            options: [ ...this.repuestas[index].options ],
            correctOptionOrder: this.repuestas[index].correct_option_order,
          })
        }
        try {
          await this.$axios.post(`topics/${this.pageId}/exams`,this.entityExams);
          this.snackbar = true;
        } catch (error) {
          this.textError = error;
          this.snackbar = true;
          
        }
      },
      openCompetence(id){
        console.log('BANDERA');
        this.dialogCompetence = true;
        let sampleData = this.competences.find(objeto => objeto.id === id);
        this.competencia = sampleData;
        console.log('BANDERA FIN');
      },
      async initData(){
        try {
          const {data} = await this.$axios.get(`courses/${this.pageId}`);
          const coursesData = await this.$axios.get(`courses/${this.pageId}/competences`);
          const topicsData = await this.$axios.get(`courses/${this.pageId}/topics`);
          this.entityProp = data;
          console.log('DATA----->', data);
          this.competences = coursesData.data;
          console.log('COMPETENCES----->', this.competences);
          this.topics = topicsData.data;
          console.log('TOPICS----->', this.topics);
        } catch (error) {
          
        }
      },
      async generateEva(i){
        this.overlay = true;
        this.isActive = true;

        const configuration = new Configuration({
            organization: "org-UqsW0fZ1dvRcaKpocOnreCrB",
            apiKey: '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',
        });
        const openai = new OpenAIApi(configuration);

        
        const promptAll = `Eres un profesor de una institucion educativa, analiza el siguiente TEMA00\${this.id}, porque necesitare que lo consideres para una futura pregunta.  \n        TEMA00\${this.id}:{${this.topics[i].file}}\n\nGenera una evaluacion de 2 preguntas con 3 alternativas de respuesta unica.\nDame las preguntas y alternativas en formato json en la sintaxis que propongo, ademas considera aregar una propiedad que mencione la alternativa correcta.\n\n[\n  {\n    \"question\": \"¿CONTENIDO DE PREGUNTA?\",\n    \"options\": [\n      \"CONTENIDO ALTERNATIVA 1\",\n      \"CONTENIDO ALTERNATIVA 2\",\n      \"CONTENIDO ALTERNATIVA 3\"\n    ],\n    \"correct_option_order\": 1\n  },\n  {...},\n  {...},\n  {...},\n  {...},\n]`;
        const promptFinal = promptAll.toString();

        const promptAlter = "Eres un profesor de una institucion educativa, analiza el siguiente TEMA00${this.id}, porque necesitare que lo consideres para una futura pregunta.  \n        TEMA00${this.id}:{Origen de la Geografía\nLa geografía tiene un largo pasado y una breve historia. Los griegos fueron los primeros en bosquejar y utilizarla como una herramienta para conocer los lugares mediante la descripción física de la superficie de la tierra.\n\nPrincipios Geográficos\nLocalización (extensión)\n\nFriedrich Ratzel\nConsiste en ubicar el lugar exacto de un hecho o fenómeno geográfico tomando en cuenta algunos aspectos espaciales como latitud, longitud, altitud, límites, superficie, etc.\n\nDescripción (generalización)\nPaul Vidal de la Blache\n\nConsiste en dar a conocer las características de un hecho o fenómeno geográfico que se proponga a estudiar.\n\nCausalidad (explicación)\nAlexander Von Humboldt\n\nPermite identificar el porqué de la ocurrencia de un hecho o fenómeno geográfico. Otorga carácter científico a la geografía.\n\nComparación (analogía)\nKarl Ritter y Vidal de la Blache\n\nConsiste en establecer semejanzas y diferencias entre el hecho o fenómeno geográfico que se está estudiando.\n\nEvolución (actividad)\nJean Brunhes\n\nSeñala que todo se encuentra en constante transformación, teniendo como agentes transformadores al hombre o a la naturaleza.}\n\nGenera una evaluacion de 3 preguntas con 3 alternativas de respuesta unica.\nDame las preguntas y alternativas en formato json en la sintaxis que propongo, ademas considera aregar una propiedad que mencione la alternativa correcta.\n\n[\n  {\n    \"question\": \"¿CONTENIDO DE PREGUNTA?\",\n    \"options\": [\n      \"CONTENIDO ALTERNATIVA 1\",\n      \"CONTENIDO ALTERNATIVA 2\",\n      \"CONTENIDO ALTERNATIVA 3\"\n    ],\n    \"correct_option_order\": 1\n  },\n  {...},\n  {...},\n  {...},\n  {...},\n]";
        
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: promptFinal,
          max_tokens: 256,
          temperature: 0,
        });

        console.log('RESPONSE--->',response );
        try {
          this.repuestas = JSON.parse(response.data.choices[0].text.trim());
          this.evaDialog = true;          
          this.overlay = false;
          this.isActive = false;          

          
        } catch (error) {
          this.overlay = false;
          this.isActive = false;          
          this.snackbar = true; 
          this.textError = error;
          this.evaDialog = false;          
        }

        

      },
      async activeOverlay(i){
        
        await this.generateEva(i);
        setTimeout(() => {
          console.log('RESPUESTAS', this.repuestas);
        }, 5500);

      }
    },
    async created(){
      await this.initData();
    }

  }
</script>

<style lang="scss">
$medium: 1500px;

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