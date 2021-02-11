<template>
    <div>
        <v-layout column>
            <v-flex xs6 offset-xs3>
                <v-card>
                <v-card-title>
                    <v-flex>
                        <h3>Add a Poll</h3>
                    </v-flex>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form>
                            <v-layout>
                                <v-flex>
                                    <h4>Enter a poll question:</h4>
                                    <v-text-field
                                    v-model='question'
                                    name='question'
                                    type='text'
                                    label='Enter question here'
                                    required>
                                    </v-text-field>
                                </v-flex>
                            </v-layout>
                            <v-layout column>
                                <v-flex>
                                    <h4>Enter the options</h4>
                                    <v-text-field
                                    v-model='options[0]'
                                    type='text'
                                    label='Options format: Option, description, address.'
                                    required>
                                    </v-text-field>
                                    <v-text-field
                                    v-model='options[1]'
                                    type='text'
                                    label='Options format: Option, description, address.'
                                    required>
                                    </v-text-field>
                                </v-flex>
                                <v-flex v-for='(extraChoice, idx) in moreoptions' :key='idx'>
                                    <v-text-field
                                    v-model='moreoptions[idx]'
                                    type='text'
                                    label='Bonus option'>                                        
                                    </v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-text-field
                                    v-model='choice'
                                    type='text'
                                    label='Bonus option'>                                        
                                    </v-text-field>
                                    <v-btn @click='addOption'>Add Bonus Option</v-btn>
                                    <v-btn @click='deleteOptions'>Delete Bonus Options</v-btn>
                                </v-flex> 
                                <v-flex>
                                    <v-btn @click='addPoll'>Submit Poll</v-btn>
                                </v-flex>                                   
                            </v-layout>
                        </v-form>
                        <div v-if='error'>
                            <p style="color: red;">{{ error }}</p>
                        </div>
                    </v-container>
                </v-card-text>
            </v-card>
            </v-flex>                
        </v-layout>
    </div>
</template>

<script>
export default {
    data() {
        return {
            question: '',
            options: [],
            choice: '',
            moreoptions: [],
            user: this.$store.getters.user,
            error: null
        }
    },
    methods: {
        async addPoll() {
            try {
                if (this.question === '' || this.options.length < 2) {
                    this.error = 'A poll needs a question and at least two options!';
                    return; 
                }
                this.error = null;
                const options = [...this.options, ...this.moreoptions, this.choice]
                    .filter((val) => {
                        return val.trim()
                    })
                    .map((val) => {
                        return { choice: val }
                    });
                await this.$store.dispatch('addPoll', {
                    question: this.question,
                    user: this.user,
                    options: options,
                });

                this.question = '';
                this.options = [];
                this.choice = '';
                this.moreoptions = [];
            } catch (err) {
                console.log(err);
            }
        },
        addOption() {
            this.moreoptions.push(this.choice);
            this.choice = '';
        },
        deleteOptions() {
            this.moreoptions = [];
            this.choice = '';
        }
    }
}
</script>

