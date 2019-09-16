import Overview from "../Overview.vue";
import Detail from "../Detail.vue";


export default [
    { path: '/', component: Overview, name: "home" },
    { path: '/movie/:movie_id', component: Detail, name: "movie", props: true },
    { path: '*', redirect: { name: "home" } }
];