Vue.component('card-list', {
	template: `
<div>
	<template v-for="(card,index) in cardsList" >
		<v-row v-if="index % 3 === 0" dense>
			<v-col cols="4" v-if="typeof getCard(index ) !== 'undefined'">
				<mtg-card :card="getCard(index)"></mtg-card>
			</v-col>
			<v-col cols="4" v-if="typeof getCard(index + 1) !== 'undefined'">
				<mtg-card :card="getCard(index + 1)"></mtg-card>
			</v-col>
			<v-col cols="4" v-if="typeof getCard(index + 2) !== 'undefined'">
				<mtg-card :card="getCard(index + 2)"></mtg-card>
			</v-col>
		</v-row>
	</template>
	<template v-if="cardsList.length <= 0">
		No cards in set!
	</template>
</div>
	`
	,props: {
		cards: {
			type:Array,
			required:true
		}
	}
	,mounted: function () {
		console.log('loaderd cards');
	}
	,data: function() {
		return {
			cardsList: this.cards
		}
	}
	,methods: {
		getCard(card) {
			return this.cardsList[card];
		}
	}
})