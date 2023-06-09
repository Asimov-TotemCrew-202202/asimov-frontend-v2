<template>
  <div class="default-layaout" style="min-height: 100vh; background-color: #eeeeee; " >
    <div class="leftColumn" style="width: 100%; height: 100%;">
      <div class="leftColumn__buttons">
        <div>
          <v-card  dark class="pa-5 rounded-lg" color="#051252" elevation="0">
            <v-card-title class="font-weight-black"> <v-icon class="mr-2">mdi-school</v-icon>ASIMOV</v-card-title>
            <div class="d-flex justify-lg-space-between flex-sm-wrap px-4 pb-2">
              <div class="font-weight-bold">INSTITUCION:</div>
              <div class="font-weight-regular">LOS ROSALES</div>
            </div>
            <div class="d-flex justify-lg-space-between flex-sm-wrap px-4 pb-4">
              <div class="font-weight-bold">USUARIO:</div>
              <v-spacer></v-spacer>
              <div class="font-weight-regular">DOCENTE</div>
            </div>
          </v-card>
  
          <v-card
            class="mx-auto mt-3 pa-0 rounded-lg"
            elevation="0"
            style="width: 100%;"
            outlined
          >
            <v-list flat style="padding: 0 !important;">
              <v-list-item-group
                v-model="model"
                :color="modelSize? 'red' : '#081d87'"
              >
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  :disabled="i==model"
                  :style="i!=0?`border-top: 2px solid #eeeeee;`:''"
                  @click="pushName(item)"
                >
                  <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                  </v-list-item-icon>
                
                  <v-list-item-content>
                    <v-list-item-title v-text="item.text" :class="i==model?'font-weight-bold':''" ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </div>


        
        <v-card class="pa-4 d-flex align-center font-weight-bold" outlined @click="()=>{}" color="" elevation="0">
          <div><v-icon >mdi-logout-variant</v-icon></div>
          <div class="pt-1 pl-5">Cerrar Sesión</div>
        </v-card>

      </div>

    </div>
    <div class="centerColumn" style="width: 100% !important; height: 100%;">
      <transition name="fade" mode="out-in">
        <slot name="default"></slot>
          <!-- <router-view/> -->
      </transition>
    </div>  
  </div>
</template>
  
<script>
  import router from "@/router";

  export default {
    name: 'DefaultLayaout',

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          route: 'home',
        },
        {
          icon: 'mdi-folder-text',
          text: 'Cursos',
          route: 'courses',
        },
        {
          icon: 'mdi-bullhorn-variant',
          text: 'Comunicados',
          route: 'comunicados',
        },
        {
          icon: 'mdi-check-decagram',
          text: 'Competencias',
          route: 'competencias',
        },
        {
          icon: 'mdi-account-group',
          text: 'Profesores',
          route: 'profesores',
        },
        {
          icon: 'mdi-account',
          text: 'Profile',
          route: 'profile',
        },
      ],
      model: 0,
      modelSize: null,
    }),
    computed:{
    },
    mounted() {
      let passive = { passive: true };
      this.onResize();
      window.addEventListener("resize", this.onResize, passive);


      let param = window.location.pathname;
      param = param.split("/")[1]

      var index = this.items.findIndex(function(item) {
        return item.route === param;
      });

      // console.log(`this.model ${this.model} ---> ${index}`);

      this.model = index;
      
    },
    methods:{
      onResize() {
        let { clientWidth } = document.documentElement;
        let is = true;
        if (clientWidth > 1080) { is = false;} //si el ancho de pantalla esmayor a 600px, no es mobile
        this.modelSize = is;
      },
      pushName(name){
        // let param = window.location.pathname;
        // param = param.split("/")[1]
        
        var index = this.items.findIndex(function(item) {
          return item.route === name.route;
        });

        if (index == this.model) return ;
      
        router.push(`/${name.route}`);

      }
    }

  }
</script>

<style lang="scss">
.default-layaout{
  padding: 30px;
  display: grid;
  gap: 10px;

  grid-template-columns: 20% 80%;
  
  grid-template-rows: 100%;
  .leftColumn,
  .centerColumn{
    // padding: 20px;
    border-radius: 8px;
  }

  .leftColumn__buttons {
    position: fixed;

    width: 20%;
    padding-right: 10px;

    display: flex;
    flex-direction: column;
    height: calc(100vh - 60px);
    justify-content: space-between;
  }
}

.v-expansion-panel::before{
  box-shadow: none;
}
</style>