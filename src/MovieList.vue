<!--
A (potentially filtered) list of movies.
-->

<template>
	<div id="movie-list" v-if="filtered_movies.length > 0"><movie-entry v-for="movie in filtered_movies" :movie="movie" :active_sessions="filter_session(movie)"></movie-entry></div>
	<div id="movie-list" v-else-if="movies.length > 0"><div class="no-results"><p>No Movies matching {{ filter.name }}.  Please remove some criteria. </p></div></div>
	<div id="movie-list" v-else><div class="no-results">Loading movie list... please wait.</div></div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';

    import {Filter, MovieListing} from "./util/types";

    import MovieEntry from './MovieEntry.vue';

    @Component({
	    components: { MovieEntry }
    })
    export default class MovieList extends Vue {
        @Prop() filter!: Filter;
	    movies : MovieListing[] = [];

	    FetchMovies() : void {
            this.$http.get('/api/').then(
                (results) => {
                    this.movies = (<any>results).body;
                }
            );
        }

        get filtered_movies() : MovieListing[] {
	        return this.movies.filter( movie => { return this.filter.match(movie) } )
		}

		filter_session( movie: MovieListing ) {
			return movie.sessions.filter( session => {
                return this.filter.match_session(session);
            });
		}

        mounted() {
            this.FetchMovies();
        }
    }
</script>
