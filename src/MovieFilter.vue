<template>
	<div class="filter-group">
		<filter-check-box v-for="filter in this.filters" @filter-changed="filterChanged( filter, $event )" :filter="filter"></filter-check-box>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from 'vue-property-decorator';
    import {Filter} from "./util/types";

    import FilterCheckBox from './FilterCheckBox.vue';

    @Component({
	    components: { FilterCheckBox }
    })
    export default class MovieFilter extends Vue {
        @Prop() filters !: Filter[];

        filterChanged( filter, state ) {
            this.$emit( "filter-changed", filter, state );
        }
    }
</script>
