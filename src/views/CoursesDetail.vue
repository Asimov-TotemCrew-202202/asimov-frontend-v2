<template>
  <div style="display: grid; grid-template-columns: 70% 30%; grid-template-rows: 1fr; gap: 10px;">

  <div class="d-flex justify-center">
    <v-card color="#eeeeee" elevation="0" style="width: 100%;">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">mdi-flag-checkered</v-icon> <h2>TRIGONOMETRIA</h2>
        <v-spacer></v-spacer>

        <div>
          
          <v-btn dark color="white" @click="backPage" outlined elevation="0">
            <v-icon class="mr-2">mdi-arrow-left</v-icon>REGRESAR
          </v-btn>

        </div>
      </div>
      <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-text-box</v-icon> <h2 class="py-3">Descripción</h2></div>
      <v-card class="pa-5" elevation="0" outlined>
        <p class="ma-0 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum architecto quisquam officia adipisci? Repellendus odit veritatis perspiciatis placeat sit nobis quaerat, at exercitationem! Doloremque obcaecati ex corporis voluptatum nesciunt nisi. Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum architecto quisquam officia adipisci? Repellendus odit veritatis perspiciatis placeat sit nobis quaerat, at exercitationem! Doloremque obcaecati ex corporis voluptatum nesciunt nisi.</p>

      </v-card>
      <div class="d-flex pl-3 mt-5"><v-icon size="30" color="#081d87" class="mr-3">mdi-tooltip-check</v-icon> <h2 class="py-3">Temas</h2></div>
      <v-expansion-panels class="elevation-0">
      <v-expansion-panel
      class="elevation-0"
        v-for="(item,i) in 10"
        :key="i"
      >
        <v-expansion-panel-header class="font-weight-bold">TEMA - WEEK {{ (i+1).toString().padStart(2, '0') }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <p class="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn elevation="0" class="mr-3"> <v-icon class="mr-3">mdi-eye</v-icon>INFO</v-btn>
            <v-btn elevation="0" class="mr-3 ml-0"> <v-icon class="mr-3">mdi-check-decagram</v-icon>COMPLETAR</v-btn>
            <div elevation="0" class="bn5" :class="{ 'active-after': isActive }" @click="activeOverlay"> <v-icon color="white" class="mr-3">mdi-assistant</v-icon>EVALUACIÓN IA</div>
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
        <p class="my-3 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi neque quia eius! Ratione ipsam alias dolore, voluptatibus ipsa illo corrupti porro magnam odit earum maxime esse totam blanditiis! Eius, doloribus.</p>
        <chip-custom v-for="(item, index) in competencias" :key="index" class="mr-3 mt-3" :text="item"></chip-custom>

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

    <v-dialog
      v-model="evaDialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          EVALUACIÓN
        </v-card-title>

        


        <v-card-text class="mt-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, reprehenderit fuga? Voluptate, rem dolorem quam debitis impedit explicabo minima quaerat quidem dignissimos officia, omnis architecto soluta ullam deserunt tempora mollitia.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="red"
            text
            @click="evaDialog = false"
          >
            CANCEL
          </v-btn>
          <v-btn
            color="#081d87"
            text
            @click="evaDialog = false"
          >
            CREATE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import ChipCustom from '@/components/ChipCustom.vue'
// import CardCustom from '@/components/CardCustom.vue'

  export default {
    name: 'CoursesDetail',

    components:{
      ChipCustom,
      // CardCustom,
    },

    data: () => ({
      dialog: false,
      isActive: false,
      overlay: false,
      evaDialog: false,
      accordion: 0,
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
    methods:{
      logDetalle(item){
        console.log('LOG ITEM--->',item);
      },
      backPage(){
        this.$router.push({
          name: "courses",
        });
      },
      activeOverlay(){
        this.overlay = true;
        this.isActive = true;
        setTimeout(() => {
          this.overlay = false;
          this.isActive = false;          
          this.evaDialog = true;          
        }, 5500);
      }
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