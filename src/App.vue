<template>
	<div class="main">
		<movie-list :filter="active_filters"></movie-list>
		<div id="movie-filter">
			<h2>Filter results</h2>
			<movie-filter :filters="this.genres" @filter-changed="onGenreChanged"></movie-filter>
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
		active_filters = [];
		genres = Genres;
		times = Times;

        get genre() {
                return []
            }

        onGenreChanged( filter ) {
            this.active_filters = filter;
        }
    }
</script>

<style scoped>

</style>
