<template #default>
  <div >
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

    <v-card color="#eeeeee" elevation="0">
      <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">mdi-view-dashboard</v-icon> <h2>Dashboard</h2>
        
      </div>

      <standar-layaout>
        <template #rightColumn>
          <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-bullhorn-variant</v-icon> <h2 class="py-3">Comunicados</h2></div>
            <v-card v-for="(item, index) in lastFive" :key="index" outlined class="mb-2">
              <v-card-title>{{item.title}}</v-card-title>
              <v-card-text class="text-justify" style="font-size: 1em;">{{item.description}}</v-card-text>
            </v-card>
        </template>
        <template #leftColumn>
          <div class="d-flex flex-column" style="height: 100%;">
  
            <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-percent-box</v-icon> <h2 class="py-3">Progreso</h2></div>


            <v-card outlined class="mb-2 font-weight-bold">
              <v-card-title class="d-flex justify-space-between px-4 pb-0 font-weight-bold">
                <span>Progreso Año Escolar</span>
                <span class="">{{currentPercent}}%</span>
              </v-card-title>
              <v-card-title class="d-flex justify-space-between px-4 pt-0 pb-2">
                <span>Inicia:{{ dateInici }}</span>
                <span>Finaliza:{{ dateFinal }}</span>
              </v-card-title>
              <div class="pb-5 px-4">
                <v-progress-linear
                  class="rounded"
                  height="10"
                  :value="currentPercent"
                  striped
                  color="#081d87"
                ></v-progress-linear>
              </div>
            </v-card>
            <v-card class="pa-3" outlined>
              <apexchart
                type="bar"
                height="240"
                width="100%"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </v-card>

            <!-- <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-account-group</v-icon> <h2 class="py-3">Profesores</h2></div>
            <div style="border: 1px solid #081d87;">
              <v-card v-for="(item, index) in 2" :key="index" outlined class="mb-2">
                <v-card-title>SAMPLE</v-card-title>
                <v-card-text class="text-justify" style="font-size: 1em;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quas dolore hic voluptate ex ut architecto placeat eligendi aliquam. Quisquam, molestiae odio. Cum iusto, libero saepe voluptas in culpa reiciendis?</v-card-text>
              </v-card>
            </div> -->
          
          </div>
        </template>
      </standar-layaout>


    </v-card>
  </div>
  
</template>

<script>
  import StandarLayaout from '@/layouts/StandarLayaout.vue'
  import ApexCharts from 'apexcharts'

  export default {
    name: 'HomeView',

    components:{
      StandarLayaout,
      ApexCharts,
    },

    data: () => ({
      loading: false,
      dataInici: '',
      dataFinal: '',
      comunicados: [],
      series: [{
        name: '2021',
        type: 'column',
        data: [ 6, 5, 6, 10, 4, 2, 8, 1, 6]
      }, {
        name: '2022',
        type: 'area',
        data: [ 2, 6, 8, 1, 7, 10, 4, 3, 5]
      }, {
        name: '2023',
        type: 'line',
        data: [ 2, 1, 4, 9, 8, 5, 7, 9, 2]
      }],
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          stacked: false,
        },
        stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
        },
        plotOptions: {
          bar: {
            columnWidth: '50%'
          }
        },
        
        fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
            inverseColors: false,
            shade: 'light',
            type: "vertical",
            opacityFrom: 0.85,
            opacityTo: 0.55,
            stops: [0, 100, 100, 100]
          }
        },
        labels: [ '03/01', '04/01', '05/01', '06/01', '07/01',
          '08/01', '09/01', '10/01', '11/01'
        ],
        markers: {
          size: 0
        },
        dataLabels: {
          enabled: false
        },
        colors: ["#051252", "#2357f6", "#0b2ac4"],
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Cursos completos',
          },
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " cursos completos";
              }
              return y;
            
            }
          }
        }
      },
   
    }),

    computed:{
      lastFive(){
        return this.comunicados.slice(-4);
      },
      currentUserDirector() {
        let roleUser = this.$store.state.auth.user.roles;
        return roleUser.includes('ROLE_PRINCIPAL');
      },
      currentUser() {
        return this.$store.state.auth.user;
      },
      currentUserData() {
        return JSON.parse(localStorage.getItem('userData'));
      },
      dateInici(){
        const year = new Date().getFullYear();
        const march = new Date(year, 2, 1); // El mes de marzo es el índice 2 (enero = 0, febrero = 1, marzo = 2)
        let dayOfWeek = march.getDay(); // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)

        // Si el primer día de marzo no es lunes, calcular la fecha del próximo lunes
        if (dayOfWeek !== 1) {
          const daysUntilMonday = 1 - dayOfWeek + 7; // Días restantes hasta el próximo lunes
          march.setDate(march.getDate() + daysUntilMonday);
        }

        
        const dayM = march.getDate().toString().padStart(2, '0');
        const monthM = (march.getMonth() + 1).toString().padStart(2, '0');
        const yearM = march.getFullYear().toString();
        return `${dayM}/${monthM}/${yearM}`;
      },
      dateFinal(){
        const year = new Date().getFullYear();
        const november = new Date(year, 10, 5); // El mes de noviembre es el índice 10 (enero = 0, febrero = 1, ..., noviembre = 10)
        let dayOfLastWeek = november.getDay(); // Obtener el día de la semana (0 = domingo, 1 = lunes, ..., 6 = sábado)
        
        // Si el último día de noviembre no es viernes, calcular la fecha del último viernes
        if (dayOfLastWeek !== 5) {
          const daysUntilFriday = 5 - dayOfLastWeek + 7; // Días restantes hasta el próximo viernes
          november.setDate(november.getDate() + daysUntilFriday);
        }
        const dayL = november.getDate().toString().padStart(2, '0');
        const monthL = (november.getMonth() + 1).toString().padStart(2, '0');
        const yearL = november.getFullYear().toString();
        return `${dayL}/${monthL}/${yearL}`;
      },
      currentPercent(){
        const fechaInicioParts = this.dateInici.split("/"); // Dividir la fecha en partes: [día, mes, año]
        const fechaFinalParts = this.dateFinal.split("/");

        const fechaInicioMs = new Date(fechaInicioParts[2], fechaInicioParts[1] - 1, fechaInicioParts[0]).getTime();
        const fechaFinalMs = new Date(fechaFinalParts[2], fechaFinalParts[1] - 1, fechaFinalParts[0]).getTime();
        const fechaActual = new Date();
        const fechaActualMs = fechaActual.getTime();

        if (fechaActualMs < fechaInicioMs) {
          // Si la fecha actual es anterior a la fecha de inicio, el progreso es 0%
          return 0;
        } else if (fechaActualMs > fechaFinalMs) {
          // Si la fecha actual es posterior a la fecha final, el progreso es 100%
          return 100;
        } else {
          // Calcular el porcentaje de progreso entre la fecha de inicio y la fecha final
          const duracionTotalMs = fechaFinalMs - fechaInicioMs;
          const progresoMs = fechaActualMs - fechaInicioMs;
          const porcentajeProgreso = (progresoMs / duracionTotalMs) * 100;
          return Math.floor(porcentajeProgreso); // Redondear a 2 decimales
        }
      }
    },

    methods:{
      async initData(){
        this.loading = true;
        try {
          const {data} = await this.$axios.get(`principals/${this.currentUserData.id}/statements`);
          this.comunicados = data;
          this.loading = false;
        } catch (error) {
          // this.loading = false;
        }
      },
      async setUserId(){
        await this.$axios.get(`${this.currentUserDirector? 'principals':'teachers'}/getByUser/${this.currentUser.id}`)
            .then(responseAlter => {
              localStorage.setItem('userData', JSON.stringify(responseAlter.data));
            }); 
      },
    },
    mounted(){
      
    },

    async created(){
      await this.setUserId();
      await this.initData();
    }

  }
</script>
