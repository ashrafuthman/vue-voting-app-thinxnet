import axios from 'axios';
const server = 'https://poll-api-2.herokuapp.com';


export default {
    state: {
        polls: [],
        poll: {
            user: '',
            question: '',
            options: [],
            totalVotes: 0,
            voters: [],
        },
    },
    mutations: {
        addNewPoll: (state, data) => {
            state.polls.push(data);
        },
        getPolls: (state, data) => {
            state.polls = data;
        },
        setPoll: (state, data) => {
            state.poll.question = data.question;
            state.poll.options = data.options;
            state.poll.totalVotes = data.totalVotes;
            state.poll.voters = data.voters;
        },
        setUser: (state, data) => {
            state.poll.user = data;
        }
    },
    actions: {
        addPoll: async ({commit}, data) => {
            try {
                await axios.post(server + '/polls', data);
                commit('addNewPoll', data);
            } catch (err) {
                console.log(err);
            }
        },
        getAllPolls: async ({commit}, data) => {
            try {
                const polls = await axios.get(server + '/polls', data);
                commit('getPolls', polls.data);
            } catch (err) {
                console.log(err);
            }
        },
        setPoll: async ({commit}, data) => {
            commit('setPoll', data);
        },
        setUser: async ({commit}, data) => {
            commit('setUser', data);
        },
        updateAnswer: async ({commit}, data) => {
            await axios.post(server + '/answers', data);
        }
    },
    getters: {
        polls: (state) => state.polls,
        user: (state) => state.poll.user,
        question: (state) => state.poll.question,
        options: (state) => state.poll.options,
        totalVotes: (state) => state.poll.totalVotes,
        voters: (state) => state.poll.voters,
    },
};
