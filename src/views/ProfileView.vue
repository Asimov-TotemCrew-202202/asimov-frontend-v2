<template>
    <div style="display: grid; grid-template-columns: 80% 20%; grid-template-rows: 1fr; gap: 10px;">
        <v-card color="#eeeeee" elevation="0">
            <div class="d-flex flex-row pa-5 rounded-lg mb-3 align-center white--text" style="background-color: #081d87;">
                <div class="d-flex">
                    <v-icon size="30" color="#ffffff" class="mr-3">mdi-account</v-icon> 
                    <h2>Profile</h2>
                </div>
                <v-spacer></v-spacer>
                <v-btn @click="openDialog" dark color="white" outlined elevation="0">
                    <v-icon class="mr-2">mdi-pen</v-icon>EDITAR
                </v-btn>
            </div>

            <div>
                <div class="d-flex pl-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-information</v-icon> <h2 class="py-3">Profile</h2></div>
                <v-row  outlined>
                    <v-col>
                        <v-card outlined class="pa-5">
                            <v-card-detail>
                                <div>
                                    <h3>Name</h3>
                                    <p>Jose Valer Peres</p>
                                </div>
                                <div>
                                    <h3>Age</h3>
                                    <p>54 años</p>
                                </div>
                                <div>
                                    <h3>Cellphone</h3>
                                    <p>+51 987 654 321</p>
                                </div>
                            </v-card-detail>
                        </v-card>
                    </v-col>
                </v-row>

                <div class="d-flex pl-3 mt-3"><v-icon size="30" color="#081d87" class="mr-3">mdi-security</v-icon> <h2 class="py-3">Security</h2></div>

                <v-row>
                    <v-col>
                        <v-card outlined class="pa-5">
                            <v-card-detail>
                                <div>
                                    <h3>Email</h3>
                                    <span>jvalerperez@asimov.edu.pe</span>
                                    <p class="font-weight-bold button">Cambiar correo</p>
                                </div>
                                <div>
                                    <h3>Password</h3>
                                    <p class="font-weight-bold button">Cambiar password</p>
                                </div>
                            </v-card-detail>
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
                <v-text-field class="mb-3" dense label="Age" hide-details outlined></v-text-field>
                <v-text-field class="mb-3" dense label="Cellphone" hide-details outlined></v-text-field>
                <v-text-field class="mb-3" dense label="Password" hide-details outlined></v-text-field>
                <v-text-field class="mb-3" dense label="Repeat password" hide-details outlined></v-text-field>
            </v-form>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="red"
                    text
                    @click="dialog = false"
                >
                    CANCEL
                </v-btn>
                <v-btn
                    color="#081d87"
                    text
                    @click="dialog = false"
                >
                    EDIT
                </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
        </v-card>
        <div style="width: 100%; border-radius: 8px;">
            <v-card outlined class="pa-5 d-flex justify-center align-center">
                <img class="user-img" src="../assets/user-defauld.svg" alt="User Profile Logo">
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