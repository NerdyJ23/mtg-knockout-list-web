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
					:key="image.normal"
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
		}
	}
	,mounted: function() {
		console.log('mounted');
		this.load();
	}
	,methods: {
		reset() {
			this.visible = false;
			this.images = [];
		},
		load() {
			this.reset();

		}
	}
	,computed: {
		images() {
			let images = [];
			if(typeof this.card.image_uris === 'undefined') {
				for(let i in this.card.card_faces) {
					images.push({
						small: this.card.card_faces[i].image_uris.small,
						normal: this.card.card_faces[i].image_uris.normal
					});
				}
			} else {
				images.push({
					small: this.card.image_uris.small,
					normal: this.card.image_uris.normal
				});
			}
			return images;
		}
	}
})