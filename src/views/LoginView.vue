<template>
  <div>
    <v-hover v-slot="{ hover }">
      <v-card :elevation="hover?12:0" class="transition-swing pa-7"  outlined>
        <v-card-title class="justify-center font-weight-bold pt-0">
          LOG IN
        </v-card-title>
        <v-card-text class="pb-0 px-2">
              <p v-if="showError" style="color: red;">Password y/o contraseña incorrecta</p>
              <v-form ref="form" validate-on="submit lazy" @submit.prevent="login">
                <v-text-field class="my-3"
                    dense
                    :rules="emailRules"
                    v-model="user.email"
                    hide-details="auto"
                    label="E-mail"
                    placeholder="example@mail.com"
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
                <v-text-field class="mt-3 mb-4"
                    dense
                    
                    :rules="passwordRules"
                    v-model="user.password"
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
                <v-card-actions>
          <v-row>
<<<<<<< HEAD
            <v-col cols="12" class="pb-0">
              <v-btn block color="#0b2ac4" dark elevation="0" @click="pushToHome" class="mb-2">
                LOG IN
              </v-btn>
              <v-btn block text @click="pushToSign">
=======
            <v-col cols="12">
              <v-btn block color="#0b2ac4" dark elevation="0" type="submit" class="mb-2">
                LOG IN
              </v-btn>
              <v-btn block text @click="register">
>>>>>>> feature/authentication
                SIGN UP
              </v-btn>

            </v-col>
          </v-row>
        </v-card-actions>
              </v-form>
            </v-card-text>
      </v-card>
    </v-hover>
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
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is required.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],
    };
  },

    components: {
      // HelloWorld,
    },

    methods:{
<<<<<<< HEAD
      pushToHome() {
        router.push('/home');
      },
      pushToSign() {
        router.push('/signup');
      },
=======
      async login() {

        const { valid } = await this.$refs.form.validate();
        
        if (!valid) {
          if (this.user.email && this.user.password) {
          this.$store.dispatch('auth/login', this.user).then(
            () => {
              this.$router.push('/home');
            },
            error => {
              this.showError = true;
              console.log(error.response.status);
            }
          );
        }
        }
      },
      register() {

      },
    },

    mounted(){
      const user = this.$store.state.auth.user;

      console.log(user);

      if (user) this.$router.push('/home');
>>>>>>> feature/authentication
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