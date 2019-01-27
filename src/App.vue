<template>
	<div class="main">
		<movie-list :filter="active_filter"></movie-list>
		<div id="movie-filter">
			<h2>Filter by Genre</h2>
			<movie-filter :filters="Genres" @filter-changed="onGenreFilterChanged"></movie-filter>
			<h2>Filter By Showing</h2>
			<movie-filter :filters="Times" @filter-changed="onShowingFilterChanged"></movie-filter>
			<h2>Filter By Rating</h2>
			<movie-filter :filters="RatingFilters" @filter-changed="onRatingFilterChanged"></movie-filter>
		</div>
	</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import {CombinedAllFilter, CombinedAnyFilter, GenreFilters, RatingFilters, TimeFilters} from "./util/filters";

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
		active_genre_filter = new CombinedAllFilter();
		active_showing_filter = new CombinedAnyFilter();
		active_rating_filter = new CombinedAnyFilter();

		Genres = GenreFilters;
		Times = TimeFilters;
		RatingFilters = RatingFilters;

        onGenreFilterChanged( filter, state ) {
			if (state) {
				this.active_genre_filter.add( filter )
			}
			else {
			    this.active_genre_filter.remove( filter )
			}
        }

        onShowingFilterChanged( filter, state ) {
            if (state) {
                this.active_showing_filter.add( filter )
            }
            else {
                this.active_showing_filter.remove( filter )
            }
        }

        onRatingFilterChanged( filter, state ) {
            if (state) {
                this.active_rating_filter.add( filter )
            }
            else {
                this.active_rating_filter.remove( filter )
            }
        }

        created(){
            this.active_filter.add( this.active_genre_filter );
            this.active_filter.add( this.active_rating_filter );
            this.active_filter.add( this.active_showing_filter );
        }
    }
</script>
