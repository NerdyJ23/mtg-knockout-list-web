Vue.component('card-list', {
	template: `
<div>
	<template v-for="(card,index) in cardsList">
		<v-row v-if="index % 3 === 0" dense>
			<v-col cols="4" v-if="typeof cardsList[index] !== 'undefined'">
				{{cardsList[index].name}}
			</v-col>
			<v-col cols="4" v-if="typeof cardsList[index + 1] !== 'undefined'">
				{{cardsList[index + 1].name}}
			</v-col>
			<v-col cols="4" v-if="typeof cardsList[index + 2] !== 'undefined'">
				{{cardsList[index + 2].name}}
			</v-col>
		</v-row>
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
		console.log('hello cards!');
		console.log(this.cards);
	}
	,data: function() {
		return {
			cardsList: this.cards
		}
	}
})