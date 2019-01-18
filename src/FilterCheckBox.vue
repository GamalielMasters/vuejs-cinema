<template>
	<div :class="{ 'check-filter': true, 'active': checked }" v-on:click="onCheck">
		<span class="checkbox"></span>
		<span class="check-filter-title"><slot></slot></span>
	</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from 'vue-class-component';

    @Component({})
    export default class FilterCheckBox extends Vue {
       checked : boolean = false;

        onCheck() {
            this.checked = !this.checked;
            this.$emit( "filter-changed", this.checked );
        }
    }
</script>

<style scoped>

</style>
