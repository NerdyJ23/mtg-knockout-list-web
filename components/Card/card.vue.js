Vue.component('mtg-card', {
	template: `
	<v-card>
		<v-img
		:src="img"
		>
		
		</v-img>
		<v-card-footer> 1 of 2</v-card-footer>
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