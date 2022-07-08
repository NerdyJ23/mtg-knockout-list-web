Vue.component('mtg-card', {
	template: `
	<v-lazy
		v-model="visible"
		transition-group="fade-transition"
	>
		<v-card>
		<template v-for="image in images">
			<v-img 
				:lazy-src="image.small"
				:src="image.normal"
				max-height="350"
				max-width="250"
			>
			</v-img>
		</template>
		<v-card-actions>{{card.name}}</v-card-actions>
		</v-card>
	</v-lazy>
	`	
	,props: {
		card: {
			type: Object,
			required: true
		}
	}
	,data: function() {
		return {
			visible: false,
			images: []
		}
	}
	,mounted: function() {
		if(typeof this.card.image_uris === 'undefined') {

		} else {
			this.images.push(this.card.image_uris);
		}
	}
	,methods: {
	}
})