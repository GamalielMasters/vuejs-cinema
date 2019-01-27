<template>
	<div class="main">
		<movie-list :filter="active_filter"></movie-list>
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
    import {CombinedAllFilter, GenreFilters, RatingFilters, TimeFilters} from "./util/filters";

    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';

    @Component({
		components: {
            MovieList,
            MovieFilter
        }
	})
    export default class extends Vue {
		active_filter = new CombinedAllFilter();

		Genres = GenreFilters;
		Times = TimeFilters;
		RatingFilters = RatingFilters;

        onFilterChanged( filter, state ) {
			if (state) {
				this.active_filter.add( filter )
			}
			else {
			    this.active_filter.remove( filter )
			}
        }
    }
</script>
