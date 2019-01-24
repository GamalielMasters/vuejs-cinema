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
    import moment from 'moment-timezone';
    import times from './util/times.js';

    import MovieEntry from './MovieEntry.vue';

    @Component({
	    components: { MovieEntry }
    })
    export default class MovieList extends Vue {
        @Prop() filter!: string[];
        @Prop() time_filter !: string[];
	    movies : any[] = [];

	    FetchMovies() : void {
            this.$http.get('/api/').then(
                (results) => {
                    this.movies = (<any>results).body;
                }
            );
        }

        get filtered_movies() : any[] {
	        return this.filterByTime(
	            this.filterByGenre( this.movies, this.filter ),
		        this.time_filter);
        }

        filterByGenre( movie_list, active_filters ) {
            if (active_filters.length === 0) {
                return movie_list;
            }
            else {
                return movie_list.filter( (movie) => {
                    let include = true;
                    let movie_genres = movie.movie.Genre.split(", ");
                    // Make sure that the movie's genres include all the selected filters (filters are ANDed)
                    for( let genre of active_filters ) {
                        if (!movie_genres.includes( genre ) ) {
                            include = false;
                        }
                    }
                    return include;
                } );
            }
        }

        filterByTime( movie_list, active_filters ){
	        if( active_filters.length === 0) {
	            return movie_list;
	        }
	        else {
                return movie_list.filter( (movie) => {
                    let include = true;
                    let movie_times = movie.sessions.map( a => moment(a.time) );
                    let six = moment( "Z6:00pm", "Zh:mma" );


                    if( active_filters.indexOf( times["BEFORE_6PM"] ) !== -1 ){
	                    // Requesting times before 6pm
		                for( let time of movie_times ) {
		                    if( time.isSameOrBefore( six ) ) {
		                        return true;
		                    }
		                }
	                }

                    if( active_filters.indexOf( times["AFTER_6PM"] ) !== -1 ) {
                        // Requesting times before 6pm
                        for( let time of movie_times ) {
                            if( time.isSameOrAfter( six ) ) {
                                return true;
                            }
                        }
                    }

                    return include;
                });
            }

        }

        mounted() {
            this.FetchMovies();
        }
    }
</script>

<style scoped>

</style>
