<template>
    <div class='flex-parent'>
        <v-layout>
            <v-flex xs6 offset-xs3>
                <h3>Polls</h3>
                <v-list subheader>
                    <div class="list-item-container" v-for='(poll, idx) in polls' :key='idx'>
                        <v-divider></v-divider>
                        <v-list-tile>
                            <v-list-tile-content class='list-item' @click='setPoll(poll)'>
                                <v-list-tile-title class='text-xs-center'>{{ poll.question }}</v-list-tile-title>
                            </v-list-tile-content>                            
                        </v-list-tile>
                    </div>
                </v-list>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            polls: null,
        }
    },
    methods: {
        async setPoll(poll) {
            await this.$store.dispatch('setPoll', poll);
            this.$router.push('/poll');
        }
    },
    async mounted() {
        await this.$store.dispatch('getAllPolls');
        this.polls = this.$store.getters.polls;
    }
}
</script>

<style scoped>
.flex-parent {
    height: 75vh;
    display: flex;
    align-content: flex-start;
        min-width: 300px;
}

.list-item {
    cursor: pointer;
    min-width: 300px;
}
.list-item-container {
    min-width: 300px;
}
@media only screen and (max-width: 600px) {
.list-item-container {
    position: relative;
    right: 50%;
}
}
</style>

