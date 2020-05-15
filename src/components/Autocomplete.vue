
<script>
export default {
  data () {
    return {
      here_id: '', // Important ! Permet de vous identifier avec l'API
      here_code: '', // Important ! Permet de vous identifier avec l'API
      inputCity: '', // Valeur du champ 'Ville'
      suggestionsHere: [], // Tableau qui contiendra les suggestions Here
      suggestionSelected: '' // Ville & Code postal sélectionnés
    }
  },
  props: {
    suggestions: {
      type: Array,
      required: true
    },
    selection: {
      type: String,
      required: true,
      twoWay: true
    }
  },
  computed: {
    matches () {
      return this.suggestions.filter((str) => {
        return str.indexOf(this.selection) >= 0
      })
    },
    openSuggestion () {
      return this.selection !== '' &&
                this.matches.length !== 0 &&
                this.open === true
    }
  },
  methods: {
    onKeypressCity (e) {
      var value = this.inputCity
      if (value !== undefined && value !== '') {
        // Call API Suggestions de HERE pour réécupérer les informations
        fetch(`https://lmfr-seo-landing-local-api-744whj-dev.apps.op.acp.adeo.com/landing/local/admin/city/`)
          .then(result => result.json())
          .then(result => {
            var datas = []
            if (result && result.length > 0) {
              result.map(function (sug) {
                if (sug.fullName !== undefined && sug.fullName.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                  datas.push({
                    lib: sug.fullName,
                    city: sug.fullName ? sug.fullName : ''
                  })
                }
              })
              this.suggestionsHere = datas
            }
          }, error => {
            console.error(error)
          })
      } else {
        this.suggestionsHere = []
      }
    },
    onClickSuggestHere (suggestion) {
      // On renseigne la ville sélectionner
      this.suggestionSelected = suggestion.lib

      // On reset la recherche
      this.inputCity = this.suggestionSelected
      this.suggestionsHere = []
      console.log(this.suggestionSelected)
      console.log('test', this.$refs)
    }
  }
}
</script>
<template>

<div class="mt-4" id="app-autocomplete-here">
   <md-field >
    <label for="ville">City</label>
    <md-input v-model="inputCity" v-on:keyup="onKeypressCity($event)" v-on:keydown="onKeypressCity($event)" id="ville" name="ville" ref="ville" />

    <!-- LISTING : SUGGESTIONS HERE -->
    <div class="autocomplete-here-suggestions-container" v-if="suggestionsHere.length > 0">
        <ul>
            <li v-for="(suggestion, index) in suggestionsHere" v-bind:key="index">
                <span  v-on:click="onClickSuggestHere(suggestion)">{{ suggestion.lib }}</span>
            </li>
        </ul>
    </div>

   </md-field>
</div>
</template>
