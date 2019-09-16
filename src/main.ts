import Vue from 'vue';

import VueResource from 'vue-resource';
Vue.use( VueResource );

import VueRouter from 'vue-router';
Vue.use( VueRouter );

import './style.scss';

import App from './App.vue';
import routes from './util/routes'

const router = new VueRouter( {
    routes
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
