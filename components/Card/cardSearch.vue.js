Vue.component('card-search', {
    template: `
<div class="pa-4">
    <v-row>
        <v-col cols="8">
            <v-select
            v-model="selected"
            :items="categories"
            item-text="name"
            item-value="search_uri"
            @change="setSelected"
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
            <v-btn fab @click="showFilters = !showFilters">help</v-btn>
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
    ,props: {
        items: {
            type: Array,
            required: true
        }
    }
    ,mounted: function () {
        this.filterBy = this.filters;
    }
    ,data: function() {
        return {
            sets: this.items,
            selected: '',
            filterBy: [],
            showFilters: false
        }
    }
    ,computed: {
        filters() {
            let options = [];
            this.sets.forEach(items => {
                if (options.indexOf(items.set_type) === -1) {
                    options.push(items.set_type);
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
        }
    }
})