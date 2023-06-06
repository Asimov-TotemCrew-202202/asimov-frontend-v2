<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover?12:0" class="transition-swing pa-7"  outlined>
        <v-card-title class="justify-center font-weight-bold pt-0">
          SIGN UP
        </v-card-title>
        <v-card-text class="pb-0 px-2">
              <v-form ref="form" lazy-validation>
                <v-text-field class="my-3"
                    dense
                    hide-details="auto"
                    label="Nombre y Apellidos"
                    placeholder="Luis Rodriguez"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-card-account-details-outline</v-icon>
                      </template>
                      Nombre completo
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="my-3"
                    dense
                    hide-details="auto"
                    label="E-mail"
                    placeholder="ejemplo@mail.com"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-email-outline</v-icon>
                      </template>
                      Email
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="my-3"
                    dense
                    type="number"
                    hide-details="auto"
                    label="Edad"
                    placeholder="99"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-counter</v-icon>
                      </template>
                      Edad
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="my-3"
                    dense
                    hide-details="auto"
                    label="Institución Educativa"
                    placeholder="Colegio I.E."
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-town-hall</v-icon>
                      </template>
                      Colegio
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="mt-3 mb-4"
                    dense
                    hide-details="auto"
                    label="Password"
                    placeholder="*******"
                    type="password"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-key-outline</v-icon>
                      </template>
                      Password
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-form>
            </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-btn block color="#0b2ac4" dark elevation="0"  class="mb-2">
                REGISTRAR
              </v-btn>
              <v-btn block text @click="pushToHome">
                REGRESAR
              </v-btn>

            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import router from "@/router";


  export default {
    name: 'LoginView',

    components: {
      // HelloWorld,
    },
    methods:{
      pushToHome() {
        router.push('/');
      }
    }
  }
</script>

<style lang="scss">
// .authLayout{
//   min-height: 100vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// }

</style>