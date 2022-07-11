Vue.component('card-list', {
	template: `
<div class="py-6" v-if="cardsLoaded">
	<template v-for="(card,index) in cards">
		<v-row v-if="index % 3 === 0" dense>
			<v-col v-for="n in 6" class="px-4 d-flex align-center justify-center">
				<template v-if="typeof getCard(index + n - 1) !== 'undefined'">
					<mtg-card ref="card" :card="getCard(index + n - 1)" :key="cards.collector_number+cards.name"></mtg-card>				
				</template>
			</v-col>
		</v-row>
	</template>
	<template v-if="cards.length <= 0">
		No cards in set!
	</template>
</div>
	`
	,inject: ["isCached","getCache","setCache","loading","loaded"]
	,mounted: function () {
		this.reset();
	}
	,data: function() {
		return {
			cards: [],
			setUrl: '',
			cardsLoaded: false
		}
	}
	,methods: {
		getCard(card) {
			return this.cards[card];
		},
		reset() {
			this.cards = [];
			this.cardsLoaded = false;
		},
		getCardList(set) {
			this.setUrl = set;
			this.loading();

			if(this.isCached(this.setUrl)) {
				console.log("loading cards from cache...");

				const today = new Date();
				const cached = new Date(this.getCache(this.setUrl).meta);
				const diff = (today.getTime() - cached.getTime()) / (1000 * 3600 * 24);

				if(diff > 1) //check for new set once the cache is a day old
				{
					console.log("Updating cards list");
					this.downloadCards(this.setUrl);
				} else {
					this.cards = this.getCache(this.setUrl).list;
					this.sortCards();
					this.loaded();
				}
			}
			else {
				console.log("downloading cards");
				this.downloadCards(this.setUrl);
			}
		},
		downloadCards(set) {
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
					this.downloadCards(data.next_page);

				} else { //when all are loaded
					console.log('set loaded');
					this.setCache(this.setUrl,{
						list: this.cards,
						meta: new Date()});
					this.sortCards();
					this.loaded();
				}
			}).catch(error => {
				console.error(error);
				this.sortCards();
				this.loaded();
			})
		},
		sortCards() {
			this.cards.sort(function (a,b) {
				return a.collector_number > b.collector_number;
			});
			console.log('now is loaded');
			this.cardsLoaded = true;
		},
		collateVariants() {
			// for(let i in this.cards) {
			// 	let vars = this.cards.find(this._sameName);
			// 	console.log(vars);
			// }
		},
		_sameName(toFind) {
			// for(let i in this.cards) {
			// 	return this.cards[i].name === toFind.name;
			// }
		},
		load(set) {
			this.reset();
			Vue.nextTick(this.getCardList(set));
		}
	}
})