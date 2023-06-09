<template>
  <div style="display: grid; grid-template-columns: 75% 25%; grid-template-rows: 1fr; gap: 10px;">
    <v-overlay :value="loading">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>

  <div style="width: 100%;">
    <v-card color="#eeeeee" elevation="0">
      <v-card class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" elevation="0" style="background-color: #081d87;">
        <v-icon size="30" color="#ffffff" class="mr-3">{{icon}}</v-icon> 
        <v-progress-circular
            v-if="loading"
            indeterminate
            color="white"
          ></v-progress-circular>
        <h2 v-else>{{titleCrud}}</h2>
        <v-spacer></v-spacer>
        <div style="display: flex; max-height: 36px; align-items: center;">
          <slot name="leftBottomHeader">
          </slot>
          <v-btn v-if="!hideAdd" dark color="white" class="mr-3 text-uppercase" outlined elevation="0" @click="addItem">
            <v-icon small class="mr-2">mdi-plus</v-icon> AÑADIR 
          </v-btn>
          <slot name="centralBottomHeader">
          </slot>
          <v-btn dark color="white" class="" :loading="loadingCrud" @click="getData" outlined elevation="0">
            <v-icon small class="mr-2">mdi-sync</v-icon> RECARGAR
          </v-btn>
          <slot name="rightBottomHeader">
          </slot>

        </div>
      </v-card>
      <div class="displayCourses" :style="`grid-template-columns: 1fr ${!oneColumn?'1fr':''};`">
        <div v-if="loading">
          <v-skeleton-loader
            v-for="(item, index) in 3" :key="index"
            type="list-item-three-line, actions"
            class="mb-3"
          ></v-skeleton-loader>
        </div>
        <div v-if="loading">
          <v-skeleton-loader
            v-for="(item, index) in 3" :key="index"
            type="list-item-three-line, actions"
            class="mb-3"
          ></v-skeleton-loader>
        </div>
        <card-custom v-else v-for="(item, index) in data" :key="index" :title="`${item[titleCard]}`" :headers="headers" :item="item" @detalle="logDetalle(item)" @edit="setItem(item.id)" @delete="deleteItem(item.id)" :hide-edit="hideEdit" :hide-delete="hideDelete" :hide-detail="hideDetail" :max-title="maxTitle">
          
          <template #leftBottom>
            <slot name="leftBottom">
            </slot>
          </template>

          <template #bottom>
            <slot name="bottomCard">
            </slot>
          </template>
        </card-custom>

      </div>
    </v-card>

    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <v-card>
        <v-card-title class="" style="color: white; background-color: #081d87;">
          {{onEdit? 'Actualizar' :'Registrar'}} {{nameCrud}}
        </v-card-title>

        <v-form class="pa-6">
          <slot name="form"></slot>
        </v-form>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="loadingAddEdit"
            color="red"
            text
            @click="() => {dialog = false; onEdit = false;}"
          >
            CERRAR
          </v-btn>
          <v-btn
            :loading="loadingAddEdit"
            color="#081d87"
            text
            @click="addEditItem"
          >
            {{onEdit ? 'ACTUALIZAR':'REGISTRAR'}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
  </div>
  <div style="width: 100%; border-radius: 8px;">
    <slot name="rightColumn"></slot>
    </div>
  </div>
</template>

<script>
import CardCustom from '@/components/CardCustom.vue'

  export default {
    name: 'CrudCustomView',

    components:{
      CardCustom,
    },

    props:{
      titleCard: {
        type: String,
        default: 'name'
      },
      endPoint: {
        type: String,
        default: 'courses'
      },
      icon: {
        type: String,
        default: 'mdi-folder'
      },
      titleCrud: {
        type: String,
        default: 'Courses'
      },
      nameCrud: {
        type: String,
        default: 'Course'
      },
      headers: {
        type: Array,
        default: () => [{ text: "Descripción", value: "description" },]
      },
      hideEdit: {
        type: Boolean,
        default: false,
      },
      maxTitle: {
        type: Boolean,
        default: false,
      },
      customPut: {
        type: Boolean,
        default: false,
      },
      hideAdd: {
        type: Boolean,
        default: false,
      },
      hideDetail: {
        type: Boolean,
        default: false,
      },
      hideDelete: {
        type: Boolean,
        default: false,
      },
      oneColumn: {
        type: Boolean,
        default: false,
      },
      entityProperty: {
        type: Object,
        required: true,
      },
      createEp: {
        type: String,
        default: '',
      },
    },
    
    watch: {
      loading (val) {
        val && setTimeout(() => {
          this.loading = false
        }, 500)
      },
    },

    data: () => ({
      data: null,
      dataId: null,
      loading: false,
      loadingAddEdit: false,
      loadingCrud: false,
      dialog: false,
      onEdit: false,
      accordion: 0,
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
    computed: {
      customEndPoint(){
        const string = this.endPoint;
        const parts = string.split('/');
        const result = parts[parts.length - 1];
        return result;
      }
    },
    methods:{
      logDetalle(item){
        this.$emit('detalle', item);
      },
      cleanProperty(objeto){
        for (let propiedad in objeto) {
          objeto[propiedad] = null;
        }
      },
      addItem(){
        this.dialog = true;
        this.onEdit = false;
        this.$emit('add');

        this.cleanProperty(this.entityProperty);        
      },
      addEditItem(){
        this.loadingAddEdit = true;
        console.log('SAMPLE--->', this.entityProperty);
        this.$axios[this.onEdit? 'put':'post'](`${this.customPut && this.onEdit ? this.customEndPoint :this.createEp != ''? this.createEp: this.endPoint}${this.onEdit?('/'+this.dataId):''}`, this.entityProperty)
        .then(response => {
          console.log('STATUS ----> ', response.status);
          this.cleanProperty(this.entityProperty);
          this.loadingAddEdit = false;
          this.dialog = false;
          this.getData();
        })
        .catch(error => {
          console.error(error);
        });
      },
      definirPropiedadesIguales(objetoDestino, objetoFuente) {
        for (let propiedad in objetoDestino) {
          if (Object.prototype.hasOwnProperty.call(objetoFuente, propiedad)) {
            objetoDestino[propiedad] = objetoFuente[propiedad];
          }
        }
      },
      setItem(data){
        this.onEdit = true;

        let sampleData = this.data.find(objeto => objeto.id === data);
        this.dataId = data;
        this.cleanProperty(this.entityProperty);
        this.definirPropiedadesIguales(this.entityProperty,sampleData);
        this.dialog = true;
        
        this.$emit('edit', sampleData);
      },
      deleteItem(id){
        this.loadingAddEdit = true;
        this.$axios.delete(`${this.customPut ? this.customEndPoint :this.endPoint}/${id}`)
        .then(response => {
          console.log('STATUS ----> ', response.status);
          this.cleanProperty(this.entityProperty);
          this.loadingAddEdit = false;
          this.getData();
        })
        .catch(error => {
          console.error(error);
        });
      },
      getData() {
        this.loadingCrud = true;
        this.$axios.get(this.endPoint)
        .then(response => {
          this.data = response.data;
          console.log('GET DATA ----> ', this.data);
          setTimeout(() => { this.loadingCrud = false; }, 600);
        })
        .catch(error => {
          console.error(error);
        });
      },

    },
    mounted(){
      this.loading = true;
      this.getData();
      console.log('SAMPLE--->', this.entityProperty);
    }

  }
</script>

<style lang="scss">
$medium: 1500px;

.displayCourses{
  display: grid;
  
  gap: 10px;
  @media screen and (max-width: $medium) {
    grid-template-columns: 1fr !important;
  }
}
.card-course{
  transition: transform 0.3s ease;

}
.card-course:hover{

   z-index: 10;
  transform: scale(1.1);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2) !important;
}
</style>