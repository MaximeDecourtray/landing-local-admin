<template>
  <div>
    <md-table v-model="arrayToSort" md-sort="name" md-sort-order="asc" md-card>
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell v-for="headCellItem in headCells" :key=headCellItem.label :md-label="headCellItem.label" :md-sort-by="headCellItem.value">{{ item[headCellItem.value] }} </md-table-cell>
        <md-table-cell v-if="hasButton"><md-button class="md-icon-button  md-dense md-raised" @click="updatedObject(item.id)">+</md-button></md-table-cell>
      </md-table-row>
    </md-table>
    <dialogPopin :showPopin="popinShown" @closePopin="popinShown = false"><slot></slot></dialogPopin>
  </div>
</template>

<script>
import dialogPopin from '@/components/DialogPopin'

export default {
  name: 'TableSort',
  data: () => ({
    popinShown: false,
    showDialog: false,
    updateObject: false,
    updatedJson: {},
    dataLoaded: false,
    citiesLoaded: false,
    info: [],
    cities: null,
    value: '',
    currentSort: 'theme',
    currentSortDir: 'asc'
  }),
  components: {dialogPopin},
  props: {
    arrayToSort: {
      type: Array,
      required: true
    },
    headCells: {
      type: Array,
      required: true
    },
    hasButton: {
      type: Boolean,
      default: false
    },
    objectId: {
      type: String,
      default: ''
    }
  },
  methods: {
    updatedObject: function (id) {
      this.popinShown = true
      this.$store.themeId = id
      this.$store.commit('changeThemeId', id)
      console.log(id, this.$store.getters.themeId)
      this.updatedJson = {
        'id': id,
        'pathPattern': '\\/cuisiniste-(.*)-lpl\\.html',
        'cityEncodedName': 'mons-en-baroeul',
        'cityFullName': '',
        'theme': '',
        'label': ''
      }

      console.log(this.updatedJson)
    },
    saveUpdateObject: function () {
      const removeDiacritics = function (str) {
        const map = {
          '-': ' |_',
          'a': 'á|à|ã|â|À|Á|Ã|Â',
          'e': 'é|è|ê|É|È|Ê',
          'i': 'í|ì|î|Í|Ì|Î',
          'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
          'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
          'c': 'ç|Ç',
          'n': 'ñ|Ñ'
        }
        str = str.toLowerCase()
        for (var pattern in map) {
          str = str.replace(new RegExp(map[pattern], 'g'), pattern)
        }
        return str
      }
      this.updatedJson.label = this.$refs.label.localValue ? this.$refs.label.localValue : ''
      this.updatedJson.theme = this.$refs.theme.localValue
      this.updatedJson.cityFullName = this.$refs.ville.suggestionSelected
      this.updatedJson.cityEncodedName = removeDiacritics(this.updatedJson.theme.trim()).replace(/[^A-Z0-9]+/ig, '-').toLowerCase()
      this.updatedJson.pathPattern = '\\\\/' + this.updatedJson.cityEncodedName + '-(.*)-lpl\\\\.html'
      console.log(this.$refs)
      console.dir(this.updatedJson)
    }
  }
}
</script>
