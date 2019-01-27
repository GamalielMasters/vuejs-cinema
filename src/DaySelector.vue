<template>
	<div id="day-select">
		<ul class="days">
			<li class="day" v-bind:class="{active: current_day.isSame(day, 'day')}" v-for="day in dates" @click="onSelect(day)">{{ !today.isSame(day, 'day') ? day.format("ddd, MMM Do") : "Today"  }}</li>
		</ul>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import moment, {Moment} from 'moment-timezone';

    @Component({
    })
    export default class DaySelector extends Vue {
        @Prop() dates!: Moment[];
        current_day: Moment = this.dates[0];

        get today() : Moment {
            return moment();
        }

        onSelect(day){
            this.current_day = day;
            this.$emit( "onSelectDay", day );
        }
    }
</script>