<template>
	<div>
		<day-selector :dates="dates" @onSelectDay="onSelectDay"></day-selector>
		<div class="main">
			<movie-list :filter="active_filter"></movie-list>
			<div id="movie-filter">
				<h2>Filter by Genre</h2>
				<movie-filter :filters="GenreFilters" @filter-changed="onFilterChanged(active_genre_filter, ...arguments)"></movie-filter>
				<h2>Filter By Showing</h2>
				<movie-filter :filters="TimeFilters" @filter-changed="onFilterChanged(active_showing_filter, ...arguments)"></movie-filter>
				<h2>Filter By Rating</h2>
				<movie-filter :filters="RatingFilters" @filter-changed="onFilterChanged(active_rating_filter, ...arguments)"></movie-filter>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from 'vue-property-decorator';
    import moment, {Moment} from 'moment-timezone';
    import {
        CombinedAllFilter,
        CombinedAnyFilter,
        CombinedFilter,
        DateFilter,
        GenreFilters,
        RatingFilters,
        TimeFilters
    } from "./util/filters";
    import {Filter} from "./util/types";

    import MovieList from './MovieList.vue';
    import MovieFilter from './MovieFilter.vue';
    import DaySelector from './DaySelector.vue';

    @Component({
		components: {
            MovieList,
            MovieFilter,
			DaySelector,
        }
	})
    export default class extends Vue {
		active_filter = new CombinedAllFilter();
		active_genre_filter = new CombinedAllFilter();
		active_showing_filter = new CombinedAnyFilter();
		active_rating_filter = new CombinedAnyFilter();
		active_date_filter = new DateFilter();

		GenreFilters = GenreFilters;
		TimeFilters = TimeFilters;
		RatingFilters = RatingFilters;

		get dates() : Moment[] {
		    let days: Moment[] = [];
		    for( let i = 0; i<=6; i++ ) {
		        days.push(moment.utc().add( i, 'day' ))
		    }
		    return days;
		}

		onSelectDay( day ) {
		    this.active_date_filter.Date = day;
		}

        onFilterChanged( filter_set: CombinedFilter, filter: Filter, state: boolean ) {
			if (state) {
				filter_set.add( filter )
			}
			else {
			    filter_set.remove( filter )
			}
        }

        created(){
            this.active_filter.add( this.active_date_filter );
            this.active_filter.add( this.active_genre_filter );
            this.active_filter.add( this.active_rating_filter );
            this.active_filter.add( this.active_showing_filter );
        }
    }
</script>
