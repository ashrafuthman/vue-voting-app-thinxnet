import Vue from 'vue';
import Router from 'vue-router';

// routes to different views
import Polls from '../components/Polls.vue';
import addPoll from '../components/addPoll.vue';
import Poll from '../components/Poll.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/', component: Polls,
        },
        {
            path: '/polls', component: Polls,
        },
        {
            path: '/poll', component: Poll,
        },
        {
            path: '/add-poll', component: addPoll,
        }
    ],
});
