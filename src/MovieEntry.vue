<template>
	<div class="movie">
		<div class="movie-col-left">
			<img :src="movie.movie.Poster" alt="Movie Poster">
		</div>
		<div class="movie-col-right">
			<div class="movie-title">
				<h2> {{ movie.movie.Title }} </h2>
				<span class="movie-rating">{{ movie.movie.Rated }}</span>
			</div>
			<div class="movie-sessions">
				<movie-time v-for="session in todaysSessions" :session="session"></movie-time>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';

    import MovieTime from './MovieTime.vue';

    @Component({
	    components: { MovieTime }
    })
    export default class MovieEntry extends Vue {
		@Prop() movie!: any;

		get todaysSessions() {
		    let today = new Date(Date.now()).toDateString();
		    return this.movie.sessions.filter( session => {
				let session_time = new Date( session.time );
			    if (session_time.toDateString() == today)
			    {
			        return true;
			    }
			    return false;
		    } )
		}

    }
</script>

<style scoped>

</style>
