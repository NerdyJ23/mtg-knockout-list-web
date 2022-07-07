Vue.component('mtg-card', {
	template: `
	<v-card>
		<v-img
		>
		
		</v-img>
		<v-card-actions> 1 of 2</v-card-actions>
	</v-card>
	`	
	,props: {
		image: {
			type: String,
			required: true
		}
	}
	,data: function() {
		return {
			img: this.image
		}
	}
	,methods: {
	}
})