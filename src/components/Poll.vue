<template>
    <div class='flex-parent'>
        <v-layout>
            <v-flex xs6 offset-xs3>
                <h3>{{ title }}</h3>
                <div v-for='(option, idx) in options' :key='idx' class='option-row'>
                    <div>
                        <strong class="option-title" @click='vote(option.option)'>{{ option.option }} ({{option.totalVotes}}) <br> {{option.description}}</strong>
                        <div>
                        <v-progress-linear
                            v-model="option.totalVotes"
                            color="blue-grey"
                            @click='vote(option.option)'
                            :buffer-value="totalVotes"
                            height="60"/>
                        </div>
                    </div>
                </div>
                <h6 v-if='voted' class="warning-message">You can't vote more than once on the same poll!</h6>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: this.$store.getters.user,
            title:  this.$store.getters.question,
            options:  this.$store.getters.options,
            totalVotes: this.$store.getters.totalVotes,
            voters: this.$store.getters.voters,
            voted: false
        }
    },
    methods: {
        async vote(option) {
            let chosenOption;
            if (!this.voters.includes(this.user)) {
                this.options.forEach((choice) => {
                    if (choice.option === option) {
                        choice.voters.push(this.user);
                        choice.totalVotes++;
                        chosenOption = choice;
                    } else {
                        return choice;
                    }
                });
                this.totalVotes++;
                this.voters.push(this.user);

                const updatedData = {
                    option: chosenOption,
                    voter: this.user,
                }
                await this.$store.dispatch('updateAnswer', updatedData);
                await this.$store.dispatch('getAllPolls');
            } else {
                this.voted = true;
            }
        },
    },
}
</script>

<style>
.option-row {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
}
.progress-linear__bar {
    min-width: 300px;
    background-color: #ddd;
}
.option-title {
    position: relative;
    top: 50%;
    z-index: 99;
}
.warning-message {
    color: #f8433f;
}
</style>

