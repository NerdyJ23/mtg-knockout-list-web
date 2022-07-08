Vue.component('main-page', {
	template: `
	<v-card class="mx-2">
		<card-search :items="sets" @setSelected="setChanged($event)"></card-search>
		<v-divider></v-divider>
		<card-list ref="cardList"></card-list>
		<loading ref="loading"></loading>
	</v-card>
	`
	,mounted: function () {
		
	}
	,data: function() {
		return {
			sets: []
		}
	}
	,methods: {
		setChanged(set) {
			this.$refs.cardList.load(set);
		},

		//common functions
		setCache(key,item) {
			try {
				window.localStorage.setItem(key,JSON.stringify(item));
			} catch(e) {
				console.error('too large for local cache / cache is full');
			}
		},
		getCache(key) {
			return JSON.parse(window.localStorage.getItem(key));
		},
		isCached(key) {
			return this.getCache(key) !== null;
		},
		loading() {
			this.$refs.loading.show = true;
		},
		loaded() {
			this.$refs.loading.show = false;
		}
	}
	,provide: function() {
		return {
			isCached: this.isCached,
			getCache: this.getCache,
			setCache: this.setCache,
			loading: this.loading,
			loaded: this.loaded
		}
	}
})