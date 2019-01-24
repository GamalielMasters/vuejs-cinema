<template>
	<div class="main">
		<movie-list :filter="active_genre_filters" :time_filter="active_time_filters"></movie-list>
		<div id="movie-filter">
			<h2>Filter by Genre</h2>
			<movie-filter :filters="this.genres" @filter-changed="onGenreChanged"></movie-filter>
			<h2>Filter By Showing</h2>
			<movie-filter :filters="times" @filter-changed="onTimeChanged"></movie-filter>
		</div>
	</div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import { Component } from 'vue-property-decorator';
    import Genres from './util/genres.js';
    import Times from './util/times.js';

    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';

    @Component({
		components: {
            MovieList,
            MovieFilter
        }
	})
    export default class extends Vue {
		active_genre_filters = [];
		genres = Genres;
		times = Times;
		active_time_filters = [];

        get genre() {
                return []
            }

        onGenreChanged( filter ) {
            this.active_genre_filters = filter;
        }

        onTimeChanged( filter ) {
            this.active_time_filters = filter;
        }
    }
</script>

<style scoped>

</style>
