<template>
	<div class="session-time-wrapper tooltip-wrapper" v-tooltip="{seats: session.seats}">
		<div class="session-time">{{ time.format( "h:mm a") }}</div>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import moment, {Moment} from 'moment-timezone';
    import tooltip from './util/tooltip'

    @Component({
        directives: { tooltip },
    })
    export default class MovieTime extends Vue {
        @Prop() session!: any;

        active: boolean = false;

        get time() : Moment {
            return moment.utc(this.session.time);
        }
    }
</script>
