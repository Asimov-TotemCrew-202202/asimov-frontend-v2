<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover?12:0" class="transition-swing pa-7"  outlined>
        <v-card-title class="justify-center font-weight-bold pt-0">
          LOG IN
        </v-card-title>
        <v-card-text class="pb-0 px-2">
              <v-form ref="form" validate-on="submit lazy" @submit.prevent="login">
                <v-text-field class="my-3"
                    dense
                    :rules="usernameRules"
                    v-model="user.username"
                    hide-details
                    label="Nombre de usuario"
                    placeholder="pcasimov"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-card-account-details-outline</v-icon>
                      </template>
                      Username
                    </v-tooltip>
                  </template>
                </v-text-field>
                <v-text-field class="mt-3 mb-4"
                    dense
                    :rules="passwordRules"
                    hide-details
                    v-model="user.password"
                    label="Contraseña"
                    placeholder="*******"
                    type="password"
                    required outlined
                >
                  <template v-slot:append>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-icon v-on="on">mdi-key-outline</v-icon>
                      </template>
                      Contraseña
                    </v-tooltip>
                    </template>
                </v-text-field>
                <!-- <p v-if="showError" style="color: red;">Password y/o contraseña incorrecta</p> -->

                <v-card-actions>
          <v-row>
            <v-col cols="12">
              <v-btn @click="login" block color="#0b2ac4" dark elevation="0" type="submit" class="mb-2">
                LOG IN
              </v-btn>
              <v-btn block text @click="register">
                SIGN UP
              </v-btn>

            </v-col>
          </v-row>
        </v-card-actions>
              </v-form>
            </v-card-text>
      </v-card>
    </v-hover>
    <v-snackbar
      color="red"
      v-model="showError"
    >
      Password y/o contraseña incorrecta

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
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
import User from '@/models/user';

  // import HelloWorld from '../components/HelloWorld'
  // import router from "@/router";


  export default {
    name: 'LoginView',

    data() {
    return {
      user: new User('', ''),
      showError: false,
      passwordRules: [
        value => {
          if (value) return true

          return 'Password is required.'
        }
      ],
      usernameRules: [
        value => {
          if (value) return true

          return 'Username is required.'
        }
      ],
    };
  },

    components: {
      // HelloWorld,
    },

    methods:{
      async login() {

        const { valid } = await this.$refs.form.validate();
        
        if (!valid) {
          if (this.user.username && this.user.password) {
          await this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/home').catch(()=>{});
            },
            error => {
              this.showError = true;
              this.user.username = '';
              this.user.password = '';

              console.warn(error.response.status);
            }
          );
        }
        }
      },
      register() {
        this.$router.push('/signup').catch(()=>{});
      },
    },

    mounted(){
      const user = this.$store.state.auth.user;

      if (user) this.$router.push('/home');
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