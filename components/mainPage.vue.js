Vue.component('main-page', {
	template: `
	<v-card class="mx-2">
		<card-search v-if="hasSets" :items="sets" @setSelected="setChanged($event)"></card-search>
		<v-select v-else></v-select>
		<v-divider></v-divider>
		<card-list :cards="cards" ref="cardList"></card-list>
		<loading ref="loading"></loading>
	</v-card>
	`
	,mounted: function () {
		this.loading();

		if(this.isCached("setList")) {
			console.log("loading set from cache...");
			const today = new Date();
            const cached = new Date(this.getCache("setList").meta);
			const diff = (today.getTime() - cached.getTime()) / (1000 * 3600 * 24);
			// console.log(JSON.parse(window.localStorage.getItem("setList")));
			if(diff > 1) //check for new set once the cache is a day old
            {
                console.log("Updating set list");
                this.downloadSetList()
                .then(this.loaded());
            } else {
				this.sets = this.getCache("setList").list;
				this.loaded();
			}
        }
        else {
            console.log("No setlist cached, downloading...");
            this.downloadSetList()
            .then(this.loaded());
        }
	}
	,data: function() {
		return {
			sets: [],
			cards: [],
			setUrl: ''
		}
	}
	,methods: {
		async downloadSetList() {
			fetch("https://api.scryfall.com/sets")
			.then(response => {
				if(response.status === 200) {
					return response.json();
				}
			}).then(data => {
				//cache the data to reduce api calls
				this.setCache("setList",{
					list: data.data,
					meta: new Date()
				});
				this.sets = data.data;
			})
		},
		setChanged(set) {
			this.cards = [];
			this.setUrl = set;
			this.loading();
			if(this.isCached(this.setUrl)) {
				console.log("loading cards from cache...");
				const today = new Date();
				const cached = new Date(this.getCache(this.setUrl).meta);
				console.log("cached set items");
				console.log(this.getCache(this.setUrl));
				const diff = (today.getTime() - cached.getTime()) / (1000 * 3600 * 24);
				// console.log(JSON.parse(window.localStorage.getItem("setList")));
				if(diff > 1) //check for new set once the cache is a day old
				{
					console.log("Updating cards list");
					this.loadSet(this.setUrl);
				} else {
					this.cards = this.getCache(this.setUrl).list;
					this.setCards();
					this.loaded();
				}
				console.log(this.cards);
			}
			else {
				console.log("downloading cards");
				this.loadSet(this.setUrl);
			}
		},
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
		setCards() {
			this.cards.sort(function (a,b) {
				return a.collector_number > b.collector_number;
			});
			this.$refs.cardList.cardsList = this.cards;
		},
		loadSet(set) {
			fetch(set)
			.then(response => {
				if(response.status === 200) {
					return response.json();
				} else {
					throw response;
				}
			}).then(data => {
				for(let i in data.data) {
					this.cards.push(data.data[i]);
				}
				if(data.has_more) {
					/*Rate Limits and Good Citizenship
					We kindly ask that you insert 50 – 100 milliseconds of delay between the requests you send 
					to the server at api.scryfall.com. (i.e., 10 requests per second on average).*/
					setTimeout(function(){},100);
					this.loadSet(data.next_page);

				} else { //when all are loaded
					console.log('set loaded');
					this.setCache(this.setUrl,{
						list: this.cards,
						meta: new Date()});
						this.setCards();

					this.loaded();

				}
				console.log('set loading');
				console.log(data);
			}).catch(error => {
				console.error(error);
				this.cards = [];
				this.setCards();
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
	,computed: {
		hasSets() {
			try {
				return this.sets.length;
			} catch {
				return 0;
			}
		},
		hasCards() {
			try {
				return this.cards.length;
			} catch {
				return 0;
			}
		}
	}
	,watch: {
		cards: function(oldVal, newVal) {
			if(this.cards.length > 0) {

			}
		}
	}
})