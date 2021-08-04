import { createRouter, createWebHashHistory } from 'vue-router';

const Home = () => import(/* webpackChunkName: "Home" */'@/components/Home');
const HelloWord = () => import(/* webpackChunkName: "Home" */'@/components/HelloWorld.vue');

const routes = [
    { path: '/home', component: Home },
    { path: '/', component: HelloWord }
];


export default createRouter({
    history: createWebHashHistory(),
    routes
});
