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
                    :rules="usernameRules"
                    v-model="user.username"
                    hide-details="auto"
                    label="Username"
                    placeholder="pcasimov"
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