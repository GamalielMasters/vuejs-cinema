<template>
	<router-view :movies="movies"></router-view>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {MovieListing} from "./util/types";

    @Component({})
    export default class Overview extends Vue {
        name: string = "App";
        movies : MovieListing[] = [];

        FetchMovies() : void {
            this.$http.get('/api/').then(
                (results) => {
                    this.movies = (<any>results).body;
                }
            );
        }
        mounted() {
            this.FetchMovies();
        }
    }


</script>

<style scoped>

</style>
