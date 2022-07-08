Vue.component('card-search', {
    template: `
<div class="pa-4">
    <v-row dense>
        <v-col cols="8">
            <v-select
            v-model="selected"
            :items="categories"
            item-text="name"
            item-value="search_uri"
            @change="setSelected"
			:disabled="sets.length == 0"
            >
                <template v-slot:item="{item}">
                    <v-img
                    :src="item.icon_svg_uri"
                    max-height="20"
                    max-width="20"

                    class="mr-4"
                    >
                    </v-img>

                    {{item.name}}
                </template>
            </v-select>
        </v-col>
        <v-col cols="4">
            <v-btn fab @click="showFilters = !showFilters"><v-icon>mdi-filter-variant</v-icon></v-btn>
            <template v-for="(category,index) in filters" v-if="showFilters">
                <v-row v-if="index % 3 === 0" dense>
                    <v-col cols="4" v-if="typeof filters[index] !== 'undefined'">
                        <v-checkbox
                            v-model="filterBy"
                            :label="prettyCategoryName(filters[index])"
                            :value="filters[index]"
                            class="category"
                        >
                        </v-checkbox>
                    </v-col>
                    <v-col cols="4" v-if="typeof filters[index + 1] !== 'undefined'">
                        <v-checkbox
                            v-model="filterBy"
                            :label="prettyCategoryName(filters[index + 1])"
                            :value="filters[index + 1]"
                            class="category"
                        >
                        </v-checkbox>
                    </v-col>
                    <v-col cols="4" v-if="typeof filters[index + 2] !== 'undefined'">
                        <v-checkbox
                            v-model="filterBy"
                            :label="prettyCategoryName(filters[index + 2])"
                            :value="filters[index + 2]"
                            class="category"
                        >
                        </v-checkbox>
                    </v-col>
                </v-row>
            </template>
        </v-col>
    </v-row>
    {{filterBy}}
    {{selected}}
</div>
`
	,inject: ["isCached","getCache","setCache","loading","loaded"]
    ,mounted: function () {
		this.load();
        this.filterBy = this.filters;
    }
    ,data: function() {
        return {
            sets: [],
            selected: '',
            filterBy: [],
            showFilters: false
        }
    }
    ,computed: {
        filters() {
            let options = [];
            this.sets.forEach(sets => {
                if (options.indexOf(sets.set_type) === -1) {
                    options.push(sets.set_type);
                }
            });
            return options;
        },
        categories() {
            let cats = [];
            this.sets.forEach(item => {
                if (this.filterBy.indexOf(item.set_type) !== -1) {
                    cats.push(item);
                }
            });
            return cats;
        }
    }
    ,methods: {
        prettyCategoryName(name) {
            const words = name.split("_");
            let out = "";
            for(let i = 0; i < words.length; i++) {
                
                out += words[i][0].toUpperCase() + words[i].substr(1) + " ";
            }
            return out.trim();
        },
        setSelected() {
            this.$emit('setSelected',this.selected);
        },
		load() {
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
    }
})