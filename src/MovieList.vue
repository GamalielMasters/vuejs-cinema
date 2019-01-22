<!--
A (potentially filtered) list of movies.
-->

<template>
	<div id="movie-list" v-if="filtered_movies.length > 0"><movie-entry v-for="movie in filtered_movies" :movie="movie"></movie-entry></div>
	<div id="movie-list" v-else-if="movies.length > 0"><div class="no-results"><p>No Movies matching {{ filter.join(", ") }}.</p> <p>Please remove some criteria. </p></div></div>
	<div id="movie-list" v-else><div class="no-results">Loading movie list... please wait.</div></div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';

    import MovieEntry from './MovieEntry.vue';
    @Component({
	    components: { MovieEntry }
    })
    export default class MovieList extends Vue {
        @Prop() filter!: String[];
	    movies : any[] = [];

	    FetchMovies() : void {
            this.$http.get('/api/').then(
                (results) => {
                    this.movies = (<any>results).body;
                }
            );
        }

        get filtered_movies() : any[] {
            if (this.filter.length === 0) {
                return this.movies;
            }
	        else {
                return this.movies.filter( (movie) => {
                    let include = true;
                    let movie_genres = movie.movie.Genre.split(", ");
                    // Make sure that the movie's genres include all the selected filters (filters are ANDed)
                    for( let genre of this.filter ) {
                        if (!movie_genres.includes( genre ) ) {
                            include = false;
                        }
                    }
                    return include;
                } );
	        }
        }

        mounted() {
            this.FetchMovies();
        }
    }
</script>

<style scoped>

</style>
