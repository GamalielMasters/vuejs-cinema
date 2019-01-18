<template>
	<div class="filter-group">
		<filter-check-box v-for="filter in this.filters" @filter-changed="filterChanged( filter, $event )">{{filter}}</filter-check-box>
	</div>
</template>

<script lang="ts">
	import Vue from "vue";
    import {Prop, Component} from 'vue-property-decorator';

    import FilterCheckBox from './FilterCheckBox.vue';

    @Component({
	    components: { FilterCheckBox }
    })
    export default class MovieFilter extends Vue {
        @Prop() filters !: string[];
        active_filters : string[] = [];

        filterChanged( filter, state ) {
            if (state) {
                this.active_filters.push( filter );
            }
            else {
				let index = this.active_filters.indexOf( filter );
				if (index > -1) {
				    this.active_filters.splice( index, 1);
				}
            }
            this.$emit( "filter-changed", this.active_filters );
        }
    }
</script>

<style scoped>

</style>
