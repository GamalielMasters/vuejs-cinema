<!--
A (potentially filtered) list of movies.
-->

<template>
	<div id="movie-list" v-if="filtered_movies.length > 0">
		<movie-entry v-for="movie in filtered_movies" :movie="movie">
			<div class="movie-sessions">
				<movie-time v-for="session in filter_session(movie)" :session="session"></movie-time>
			</div>
		</movie-entry>
	</div>
	<div id="movie-list" v-else-if="movies.length > 0"><div class="no-results"><p>No Movies matching {{ filter.name }}.  Please remove some criteria. </p></div></div>
	<div id="movie-list" v-else><div class="no-results">Loading movie list... please wait.</div></div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';

    import {Filter, MovieListing} from "./util/types";

    import MovieEntry from './MovieEntry.vue';
    import MovieTime from './MovieTime.vue';

    @Component({
	    components: { MovieEntry, MovieTime },
    })
    export default class MovieList extends Vue {
        @Prop() filter!: Filter;
        @Prop( { default: [] } ) movies !: MovieListing[];


        get filtered_movies() : MovieListing[] {
	        return this.movies.filter( movie => { return this.filter.match(movie) } )
		}

		filter_session( movie: MovieListing ) {
			return movie.sessions.filter( session => {
                return this.filter.match_session(session);
            });
		}

    }
</script>
