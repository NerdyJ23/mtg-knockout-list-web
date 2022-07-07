Vue.component('card-list', {
	template: `
	<div>
		<loading ref="loading"></loading>
	</div>
	`
	,mounted: function () {
		// this.getSetList();
	}
	,data: function() {
		return {
			cards: {
				list:[],
				name: 'EMPTY',
				count: 0,
			},
			filters: {}
		}
	}
	,methods: {
		getSetList() {
			this.loading();
			fetch("https://api.scryfall.com/sets")
			.then(response => {
				if(response.status === 200) {
					return response.json();
				}
			}).then(data => {
				console.log(data.data);
				this.list = data.data;
				this.loaded();
			})
		},

		loading() {
			this.$refs.loading.show = true;
		},
		loaded() {
			this.$refs.loading.show = false;
		}
	}
})