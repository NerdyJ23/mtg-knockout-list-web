Vue.component('card-list', {
	template: `
	
	<mtg-card :image="getImage"></mtg-card>

	<loading ref="loading"></loading>
	`
	,data: function() {
		return {
			cards: {
				list:[],
				name: 'EMPTY',
				count: 0,
			}
		}
	}
	,methods: {
		getCardList() {
			return true;
		}
	}
})