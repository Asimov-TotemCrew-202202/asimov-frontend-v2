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
                    v-model="user.first_name"
                    :rules="firstNameRules"
                    hide-details
                    label="Nombre y Apellidos"
                    placeholder="Juan Sanchez"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-account-box</v-icon>
                      </template>
                      Nombre y Apellidos
                    </v-tooltip>
                  </template>
                </v-text-field>
                
                <v-text-field class="my-3"
                    dense
                    @blur="createUsername"
                    :rules="emailRules"
                    hide-details
                    label="E-mail"
                    outlined
                    placeholder="ejemplo@mail.com"
                    required 
                    v-model="user.email"
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
                    disabled
                    v-model="user.username"
                    dense
                    hide-details
                    label="Nombre de usuario"
                    placeholder="Username"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-card-account-details-outline</v-icon>
                      </template>
                      Nombre de usuario
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="my-3"
                    dense
                    v-model="user.phone"
                    :rules="phoneRules"
                    type="number"
                    hide-details
                    label="Celular"
                    placeholder="999999999"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-phone</v-icon>
                      </template>
                      Celular
                    </v-tooltip>
                  </template>
                </v-text-field>
                
                <v-text-field class="my-3"
                    dense
                    v-model="user.last_name"
                    :rules="lastNameRules"
                    hide-details
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

                <v-text-field class="my-3"
                    dense
                    v-model="user.specialty"
                    :rules="lastNameRules"
                    hide-details
                    label="Especialidad"
                    placeholder="Ingeniero"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-school</v-icon>
                      </template>
                      Especialidad
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="my-3"
                    dense
                    type="number"
                    v-model="user.experienceYears"
                    :rules="lastNameRules"
                    hide-details
                    label="Años Experiencia"
                    placeholder="5"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-timer-sand-complete</v-icon>
                      </template>
                      Años Experiencia
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="my-3"
                    dense
                    type="number"
                    v-model="user.salary"
                    :rules="lastNameRules"
                    hide-details
                    label="Salario"
                    placeholder="S/ 1500"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-cash</v-icon>
                      </template>
                      Salario
                    </v-tooltip>
                  </template>
                </v-text-field>

                <v-text-field class="mt-3 mb-4"
                    dense
                    hide-details
                    :rules="passwordRules"
                    v-model="user.password"
                    label="Contraseña"
                    placeholder="*******"
                    :type="typeInput?'text':'password'"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom >
                      <template v-slot:activator="{ on }">
                        <v-icon @click="typeInput = !typeInput" v-on="on">mdi-{{typeInput?'key':'key-outline'}}</v-icon>
                      </template>
                      {{typeInput?'Ocultar ':'Ver '}}Contraseña
                    </v-tooltip>
                  </template>
                </v-text-field>
              </v-form>
            </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-btn @click="register" block color="#0b2ac4" dark elevation="0"  class="mb-2">
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
    <v-snackbar
      :color="successful? 'green' : 'red'"
      v-model="showResult"
    >
      {{ message }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="showResult = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
  // import HelloWorld from '../components/HelloWorld'
  import router from "@/router";
  import UserRegister from '../models/userRegister';


  export default {
    name: 'LoginView',
    data() {
      return {
        user: new UserRegister('', '', '', '', '', '', '', '', '', []),
        showResult: false,
        message: '',
        successful: false,
        typeInput: false,
        firstNameRules: [
          value => {
            if (value) return true

            return 'Full name is required.'
          }
        ],
        lastNameRules: [
          value => {
            if (value) return true

            return 'Educational institution is required.'
          }
        ],
        passwordRules: [
          value => {
            if (value) return true

            return 'Password is required.'
          }
        ],
        emailRules: [
          value => {
            if (value) return true

            return 'Email is required.'
          }
        ],
        phoneRules: [
          value => {
            if (value) return true

            return 'Phone is required.'
          }
        ],
      }
    },
    components: {
      // HelloWorld,
    },
    methods:{
      pushToHome() {
        router.push('/');
      },
      createUsername() {
        const username = this.user.email.substring(0, this.user.email.indexOf('@'));

        this.user.username = username;
      },
      async register() {

        const { valid } = await this.$refs.form.validate();

        if (!valid) {
          this.user.role.push('principal');

          await this.$store.dispatch('auth/register', this.user).then(
              async data => {
                this.message = data.message;
                this.successful = true;
                this.showResult = true;

                await this.$refs.form.reset();

                setTimeout(() => {
                  this.$router.push('/').catch(()=>{});
                }, 1000);
                
              },
              error => {
                this.message = error.response.data.message;
                this.successful = false;

                this.showResult = true;
              }
            );
        }
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