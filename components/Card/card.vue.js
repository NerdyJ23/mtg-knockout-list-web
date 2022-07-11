Vue.component('mtg-card', {
	template: `
	<v-lazy
		v-model="visible"
		transition-group="fade-transition"
	>
		<v-card>
		<v-skeleton-loader v-if="!visible || !loaded"
			type="card"
			height="350"
			width="250"
		></v-skeleton-loader>
			<template v-for="image in getImages()">
				<v-img 
					:lazy-src="image.small"
					:src="image.normal"
					max-height="350"
					max-width="250"
					@load="isLoaded"
				>
				</v-img>
			</template>
			<v-card-actions v-if="loaded">{{card.name}}</v-card-actions>
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
			loaded: false
		}
	}
	,mounted: function() {
		this.load();
	}
	,methods: {
		reset() {
			this.visible = false;
		},
		load() {
			if(this.card.name === 'Elspeth Resplendent') {
				console.log(this.card);
			}
			// this.reset();
		},
		getImages() {
			let selectImages = [];
			if(typeof this.card.image_uris === 'undefined') {
				for(let i in this.card.card_faces) {
					selectImages.push({
						small: this.card.card_faces[i].image_uris.small,
						normal: this.card.card_faces[i].image_uris.normal
					});
				}
			} else {
				selectImages.push({
					small: this.card.image_uris.small,
					normal: this.card.image_uris.normal
				});
			}
			return selectImages;
		},
		isLoaded() {
			this.loaded = true;
		}
	}
})