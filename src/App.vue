<template>
	<div class="main">
		<movie-list :filter="active_filters"></movie-list>
		<div id="movie-filter">
			<h2>Filter by Genre</h2>
			<movie-filter :filters="Genres" @filter-changed="onFilterChanged"></movie-filter>
			<h2>Filter By Showing</h2>
			<movie-filter :filters="Times" @filter-changed="onFilterChanged"></movie-filter>
			<h2>Filter By Rating</h2>
			<movie-filter :filters="RatingFilters" @filter-changed="onFilterChanged"></movie-filter>
		</div>
	</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {GenreFilters, RatingFilters, TimeFilters} from "./util/filters";
    import {Filter} from './util/types';

    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';

    @Component({
		components: {
            MovieList,
            MovieFilter
        }
	})
    export default class extends Vue {
		active_filters: Filter[] = [];

		Genres = GenreFilters;
		Times = TimeFilters;
		RatingFilters = RatingFilters;

        onFilterChanged( filter, state ) {
			if (state) {
				this.active_filters.push( filter );
			}
			else {
				let index = this.active_filters.indexOf( filter );
				if (index > -1) {
					this.active_filters.splice( index, 1);
				}
			}
        }
    }
</script>
