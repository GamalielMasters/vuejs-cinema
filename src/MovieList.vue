<!--
A (potentially filtered) list of movies.
-->

<template>
	<div id="movie-list">
		<div class="movie" v-for="movie in filtered_movies">
			<div class="movie-col-left">
				<img :src="movie.movie.Poster" alt="Movie Poster">
			</div>
			<div class="movie-col-right">
				<div class="movie-title">
					<h2> {{ movie.movie.Title }} </h2>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';

    @Component({})
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
                    for( let f of this.filter ) {
                        if ( movie.movie.Genre.includes( f ) ) {
                            return true;
                        }
                    }
                    return false;
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
