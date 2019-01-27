<template>
	<div :class="{ 'check-filter': true, 'active': checked }" v-on:click="onCheck">
		<span class="checkbox"></span>
		<span class="check-filter-title">{{ filter.name }}</span>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component, Prop} from 'vue-property-decorator';
    import {Filter} from "./util/types";

    @Component({
    })
    export default class FilterCheckBox extends Vue {
		@Prop() filter!: Filter;
		checked : boolean = false;

        onCheck() {
            this.checked = !this.checked;
            this.$emit( "filter-changed", this.checked );
        }
    }
</script>
