<template>
    <div style="display: grid; grid-template-columns: 80% 20%; grid-template-rows: 1fr; gap: 10px;">
        <v-card color="#eeeeee" elevation="0">
            <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
                <div class="d-flex">
                    <v-icon size="30" color="#ffffff" class="mr-3">mdi-account</v-icon> 
                    <h2>Profile</h2>
                </div>
            </div>

            <div>
                <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-information</v-icon> <h2 class="py-3">Profile</h2></div>
                <v-row  outlined>
                    <v-col>
                        <v-card outlined class="pa-5">
                                <div>
                                    <h3>FullName</h3>
                                    <p>{{ currentUser.first_name }}</p>
                                </div>
                                <div>
                                    <h3>Educative Institution</h3>
                                    <p>{{ currentUser.last_name }}</p>
                                </div>
                                <div>
                                    <h3>Cellphone</h3>
                                    <p class="ma-0">{{ currentUser.phone }}</p>
                                </div>
                        </v-card>
                    </v-col>
                </v-row>

                <div class="d-flex pl-3 mt-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-security</v-icon> <h2 class="py-3">Security</h2></div>

                <v-row>
                    <v-col>
                        <v-card outlined class="pa-5">
                                <div class="pb-4">
                                    <h3>Username</h3>
                                    <span>{{ currentUser.username }}</span>
                                </div>
                                <div class="pb-4">
                                    <h3>Email</h3>
                                    <span>{{ currentUser.email }}</span>
                                </div>
                                <div>
                                    <h3>Password</h3>
                                    <span>*********</span>
                                </div>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
            <v-dialog
        v-model="dialog"
        persistent
        width="500"
        >
        <v-card>
            <v-card-title class="" style="color: white; background-color: #081d87;">
                Editar Perfil
            </v-card-title>

            <v-form class="pa-6">
                <v-text-field class="mb-3" dense label="Nombre" hide-details outlined></v-text-field>
                <v-text-field class="mb-3" dense label="Edad" hide-details outlined></v-text-field>
                <v-text-field class="mb-3" dense label="Celular" hide-details outlined></v-text-field>
                <v-text-field class="mb-3" dense label="Contraseña" hide-details outlined></v-text-field>
                <v-text-field class="mb-3" dense label="Repetir contraseña" hide-details outlined></v-text-field>
            </v-form>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    text
                    @click="dialog = false"
                >
                    CANCELAR
                </v-btn>
                <v-btn
                    color="#081d87"
                    text
                    @click="dialog = false"
                >
                    EDITAR
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        </v-card>
        <div style="width: 100%; border-radius: 8px;">
            <v-card outlined class="pa-5 d-flex justify-center align-center">
                <v-img 
                    v-if="isDirector" 
                    src="https://sanjuanboscosalamanca.salesianas.org/wp-content/uploads/2019/01/Jes%C3%BAs-M%C2%AA-Calvo-Macho-Director-General.jpg" 
                    aspect-ratio="0.75" 
                    position="center"></v-img>
                <v-img v-else src="https://grupogeard.com/pe/wp-content/uploads/sites/4/2021/11/Escala-docente-peru.jpg" aspect-ratio="0.75" position="18%"></v-img>
            </v-card>
        </div>
    </div>
    
</template>

<script>
    export default {
        name: 'ProfileView',
        data: () => ({
            dialog: false
        }),
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            },
            isDirector() {
                return this.$store.state.auth.user.roles[0] === 'ROLE_PRINCIPAL'? true : false;
            }
        },
        methods:{ 
            openDialog() {
                this.dialog = true;
            }
        }
    }
</script>

<style>
    .button {
        cursor: pointer;
    }

    .user-img {
        width: 204px;
        height: 204px;
    }
</style>