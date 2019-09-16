<template>
	<div id="detail" v-if="listing">
		<movie-entry :movie="listing">
			<div class="movie-details">
				<p class="movie-genre">{{ movie.Genre }}</p>
				<p class="movie.plot"> {{ movie.Plot }}</p>
				<table>
					<tr><td>Released Date:</td><td>{{ movie.Released }}</td></tr>
					<tr><td>Running Time:</td><td>{{ movie.Runtime }}</td></tr>
					<tr><td>Director:</td><td>{{ movie.Director }}</td></tr>
					<tr><td>Cast:</td><td>{{ movie.Actors }}</td></tr>
				</table>
			</div>
		</movie-entry>
		<div class="home">
			<router-link :to="{name: 'home'}">Back to results</router-link>
		</div>
	</div>
	<div id="detail" v-else>
		<div class="home">
			<router-link :to="{name: 'home'}">I'm sorry. <b>{{ movie_id }}</b> is not a valid movie identifier.  Please try again.</router-link>
		</div>
	</div>

</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component, Prop} from 'vue-property-decorator';
    import {MovieListing, Movie} from "./util/types";
    import MovieEntry from "./MovieEntry.vue";

    @Component({
        components: { MovieEntry }
    })
	export default class Detail extends Vue {

    @Prop( { default: [] } ) movies !: MovieListing[];
    @Prop( { default: ""} ) movie_id !: string;

    get listing() : MovieListing | null {
        let listing = this.movies.find( movie => { return movie.id === this.movie_id } );
		return listing ? listing : null
    }

    get movie() : Movie | null {
        return this.listing ? this.listing.movie : null
    }

}
</script>

<style scoped>

</style>