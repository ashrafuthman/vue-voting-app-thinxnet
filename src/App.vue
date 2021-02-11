<template>
    <v-app id='app'>
        <v-navigation-drawer persistent v-model='drawer' clipped app class='white--text'>
            <v-list>
                <v-list-tile>
                    <router-link to='/polls'>Polls</router-link>
                </v-list-tile>
                <v-list-tile>                    
                    <router-link to='/add-poll'>Add Poll</router-link>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark fixed app clipped-right class='orange darken-4'>
            <v-toolbar-side-icon @click='drawer = !drawer'></v-toolbar-side-icon>
            <v-toolbar-title>ThinxNet Voting App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items v-if='!this.$store.getters.user'>
                <v-dialog
                v-model="dialog"
                persistent
                max-width="600px"
                >
                <v-card>
                    <v-card-title>
                    </v-card-title>
                    <v-card-text>
                    <v-container>
                        <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                        >
                            <v-text-field

                            label="Name"
                            v-model="username"
                            required
                            />
                        </v-col>                                                            
                        </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="blue darken-1"
                        text
                        :disabled="!username"
                        @click="saveUsername"
                    >
                        Save
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-toolbar-items>
            <v-btn flat>Hello {{username}}</v-btn>
        </v-toolbar>
        <main>
            <v-container fluid>
                <v-layout>
                    <v-flex class='text-xs-center'>
                        <router-view></router-view>
                    </v-flex>
                </v-layout>
            </v-container>
        </main>
        <v-footer class='orange darken-4 white--text'>
            <v-layout justify-space-around>
                <span>Created by ashrafuthman</span>
                <span><a href='https://github.com/ashrafuthman/vue-voting-app-thinxnet' target='_blank'>Code on Github</a></span>
            </v-layout>
        </v-footer>
    </v-app>
</template>

<script>
export default {
    data() {
        return {
          drawer: false,
          right: null,
          left: null,
          username: null,
          dialog: false,
        }
    },
    methods: {
        async saveUsername() {
            await this.$store.dispatch('setUser', this.username);
            this.$router.push('/polls');
            this.dialog = false;
        }
    }
}
</script>

<style lang="stylus">
.router-link-active {
    color: white;
}
</style>
