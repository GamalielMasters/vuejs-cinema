<template>
	<div class="session-time-wrapper"><div class="session-time">{{ time.format( "h:mm a") }}</div></div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import moment, {Moment} from 'moment-timezone';

    @Component({})
    export default class MovieTime extends Vue {
        @Prop() session!: any;

        get time() : Moment {
            return moment.utc(this.session.time);
        }
    }
</script>
