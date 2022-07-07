Vue.component('loading', {
	template: `	
<v-overlay :value="show">
	<v-progress-circular
		:size="100"
		:width="5"
		indeterminate
	>
	</v-progress-circular>
</v-overlay>`
,data: function() {
	return {
		show: false
	}
}

})