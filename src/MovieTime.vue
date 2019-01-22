<template>
	<div class="session-time-wrapper"><div class="session-time">{{ formattedTime }}</div></div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';
    import { Prop } from 'vue-property-decorator';

    @Component({})
    export default class MovieTime extends Vue {
        @Prop() session!: any;
        date : Date = new Date(this.session.time);

        get formattedTime() : string {
            let hours: number = this.date.getUTCHours();
            let minutes: number = this.date.getUTCMinutes();
            let ampm : string = hours >= 12 ? 'pm' : 'am';
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            let minute_str : string = minutes < 10 ? '0'+minutes.toString() : minutes.toString();
            return hours + ':' + minute_str + ' ' + ampm;
        }

    }
</script>

<style scoped>

</style>
