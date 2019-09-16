<template>
	<div class="movie">
		<div class="movie-col-left">
			<router-link :to="{name: 'movie', params: { movie_id:movie.id }}">
				<img :src="movie.movie.Poster" alt="Movie Poster">
			</router-link>
		</div>
		<div class="movie-col-right">
			<div class="movie-title">
				<router-link :to="{name: 'movie', params: { movie_id:movie.id }}">
					<h2> {{ movie.movie.Title }} </h2>
				</router-link>
				<span class="movie-rating">{{ movie.movie.Rated }}</span>
			</div>
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import {MovieListing} from "./util/types";

    @Component({})
    export default class MovieEntry extends Vue {
		@Prop() movie!: MovieListing;
    }
</script>
