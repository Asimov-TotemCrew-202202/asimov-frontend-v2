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
              <v-card-title class="d-flex justify-space-between px-4 pb-2">
                <span>Porcentaje</span>
                <span class="font-weight-bold">60%</span>
              </v-card-title>
              <div class="pb-5 px-4">
                <v-progress-linear
                  class="rounded"
                  height="10"
                  value="60"
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
      comunicados: [],
      series: [{
        name: 'TEAM A',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
      }, {
        name: 'TEAM B',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
      }, {
        name: 'TEAM C',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
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
        labels: ['01/01/2003', '02/01/2003', '03/01/2003', '04/01/2003', '05/01/2003', '06/01/2003', '07/01/2003',
          '08/01/2003', '09/01/2003', '10/01/2003', '11/01/2003'
        ],
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          title: {
            text: 'Points',
          },
          min: 0
        },
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: function (y) {
              if (typeof y !== "undefined") {
                return y.toFixed(0) + " points";
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
      }
    },

    methods:{
      async initData(){
        this.loading = true;
        try {
          const {data} = await this.$axios.get('principals/1/statements');
          this.comunicados = data;
          this.loading = false;
        } catch (error) {
          
        }
      },
    },
    mounted(){
      
    },

    async created(){
      await this.initData();
    }

  }
</script>
