<template :key="refresh">
    <div :key="refresh" class='flex-parent'>
        <v-layout :key="refresh">
            <v-flex :key="refresh" xs6 offset-xs3>
                <h3>{{ title }}</h3>
                <v-btn @click='resetQuestion'>Reset</v-btn>
                <div v-for='(option, idx) in options' :key='idx' class='option-row'>
                    <div>
                        <strong class="option-title" @click='vote(option.option)'>{{ option.option }} ({{option.totalVotes}}) <br> {{option.description}}</strong>
                        <div class="option">
                        <v-progress-linear
                            v-model="option.totalVotes"
                            color="blue-grey"
                            :key="refresh"
                            @click='vote(option.option)'
                            :buffer-value="totalVotes"
                            height="60"/>
                        <v-btn class="warning remove-btn" @click='removeOption(option)'>X</v-btn>
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
            voted: false,
            refresh: 0
        }
    },
    computed: {
        pollId() {
            return (this.options && this.options.length > 0) && this.options[0].poll_id;
        }
    },
    methods: {
        async removeOption(option) {
            await this.$store.dispatch('removeOption', {option_id: option.option_id});
            const index = this.options.indexOf(option);
            this.options.splice(index, 1);
        },
        async resetQuestion() {
            if (this.pollId) {
                await this.$store.dispatch('resetPoll', {poll_id: this.pollId});
                this.options.forEach((choice) => {
                    choice.voters = [];
                    choice.totalVotes = 0;
                });
                this.voted = false;
                this.voters = [];
                this.totalVotes = 0;
            }
        },
        async vote(option) {
            this.refresh = this.refresh + 1;
            this.voted = false;
            let chosenOption;
            if (!this.voters.includes(this.user)) {
                this.options.forEach((choice) => {
                    if (choice.option === option) {
                        if (!choice.voters.includes(this.user)) {
                            choice.voters.push(this.user);
                            choice.totalVotes++;
                            chosenOption = choice;
                        }
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
                this.options.forEach((choice) => {
                    if (choice.option === option) {
                        chosenOption = choice;
                    } else {
                        return choice;
                    }
                });

                let voter = chosenOption.voters_data.filter((user) => user.name === this.user);
                if (chosenOption) {
                    this.options.forEach(async (choice) => {
                        if (choice.option === option && choice.voters.includes(this.user) && choice.totalVotes > 0) {
                            voter.length > 0 && await this.$store.dispatch('removeAnswer', {answer_id: voter[0].answer_id});
                            let index = choice.voters.indexOf(this.user);
                            choice.voters.splice(index, 1);
                            choice.totalVotes--;
                            this.totalVotes > 0 && this.totalVotes--;
                            index = this.voters.indexOf(this.user);
                            this.voters.splice(index, 1);
                        } else {
                            return choice;
                        }
                    });
                } else {
                    this.voted = true;
                }
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
    right: 8%;
}
.warning-message {
    color: #f8433f;
}
.remove-btn {
    border-radius: 50%;
    min-width: 30px;
    min-height: 30px;
    font-size: 15px;
    position: relative;
    top: 15px;
}
.option {
    display: flex;
    justify-content: space-between;
}
@media only screen and (max-width: 600px) {
    .progress-linear__bar {
        min-width: 270px;
    }
}
</style>

