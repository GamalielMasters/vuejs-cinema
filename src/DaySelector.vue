<template>
	<div id="day-select">
		<ul class="days">
			<li class="day" v-bind:class="{active: current_day.isSame(day, 'day')}" v-for="day in dates" @click="onSelect(day)">{{ format_day(day) }}</li>
			<li class="day-selector">
				<span class="dec" @click="adjustDay( -1 )"></span>
				<span class="inc" @click="adjustDay( +1 )"></span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Prop, Component} from 'vue-property-decorator';
    import moment, {Moment} from 'moment-timezone';

    @Component({
    })
    export default class DaySelector extends Vue {
        @Prop() dates!: Moment[];
        @Prop({default: "ddd, MMM D"}) format!: string;
        current_day: Moment = this.dates[0];

        get today() : Moment {
            return moment.utc();
        }

        get tomorrow() : Moment {
            return moment.utc().add( 1, 'day')
        }

        format_day( day: Moment ): string {
            if (this.today.isSame(day, 'day')) {
                return "Today";
            }
            else if ( this.tomorrow.isSame(day, 'day')) {
                return "Tomorrow";
            }
            else {
                return day.format(this.format);
            }
        }

        adjustDay( days : number ) {
            let new_day : Moment = this.current_day.clone().add( days, "day" );
            console.log()
            console.log( new_day.isSameOrAfter( this.dates[0] ) );
            console.log( new_day.isSameOrBefore( this.dates[ this.dates.length -1 ]));
	        if (new_day.isSameOrAfter( this.dates[0] ) && new_day.isSameOrBefore( this.dates[ this.dates.length-1 ] ))
	        {
	            this.onSelect( new_day )
	        }
        }

        onSelect(day){
            this.current_day = day;
            this.$emit( "onSelectDay", day );
        }
    }
</script>