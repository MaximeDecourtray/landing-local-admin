
<template>
  <div id="app">
      <label for="flavor">Favorite ice cream flavor?</label>
      <input @input="changed" name="flavor">
      <p>You chose {{ $store.getters.flavor }}</p>
       <sortTable :arrayToSort="info" :headCells="[
        {label:'ID', value:'id'},
        {label:'Theme', value:'theme'},
        {label:'Label', value:'label'},
        {label:'City', value:'cityFullName'},
        {label:'Author', value:'createdBy'},
        {label:'Created date', value:'createdDate'},
        {label:'Updated by', value:'updatedBy'},
        {label:'Update date', value:'updatedDate'}
       ]" :hasButton="true">
       <md-dialog-title>Update theme</md-dialog-title>
        <form novalidate class="md-layout" @submit.prevent="saveUpdateObject()">
          <md-card-content>
            <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                    <md-field >
                    <label for="id">id</label>
                    <md-input name="id" id="id" v-model="themeId" ref="id" readonly />
                  </md-field>
                </div>
                <div class="md-layout-item md-small-size-100">
                    <md-field >
                    <label for="theme">theme</label>
                    <md-input name="theme" id="theme" ref="theme" />
                  </md-field>
                </div>
              <div class="md-layout-item md-small-size-100">
                <md-field >
                  <label for="label">label</label>
                  <md-input name="label" id="label" ref="label" />
                </md-field>
              </div>
            </div>
            <md-card-actions>
              <md-button type="submit" class="md-primary" >Validate</md-button>
            </md-card-actions>
          </md-card-content>
        </form>
       </sortTable>
  </div>
</template>

<script>
import Hello from '@/components/Hello'
import sortTable from '@/components/SortTable'
import dialogPopin from '@/components/DialogPopin'
import axios from 'axios'
import ROUTES from '../../services/routes'
import { triggerNotification, NOTIFICATION } from '../../services/events'

export default {
  name: 'App',
  data () {
    return {
      popinShown: false,
      dataLoaded: false,
      updatedJson: {
        id: '',
        pathPattern: '',
        cityEncodedName: null,
        cityFullName: null,
        theme: '',
        label: ''
      },
      info: []
    }
  },
  components: {
    Hello,
    sortTable,
    dialogPopin
  },
  computed: {
    themeId: function () {
      return this.$store.getters.themeId
    }
  },
  methods: {
    changed: function (event) {
      console.log(event.target.value)
      this.$store.lol = event.target.value
      this.$store.commit('change', event.target.value)
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
      this.updatedJson.id = this.$refs.id.localValue ? this.$refs.id.localValue : ''
      this.updatedJson.label = this.$refs.label.localValue ? this.$refs.label.localValue : ''
      this.updatedJson.theme = this.$refs.theme.localValue
      const labelEncodedName = removeDiacritics(this.updatedJson.theme.trim()).replace(/[^A-Z0-9]+/ig, '-').toLowerCase()
      this.updatedJson.pathPattern = '\\\\/' + labelEncodedName + '-(.*)-lpl\\\\.html'
      console.log(this.$refs)
      console.dir(this.updatedJson)
      this.$store.commit('changePostThemeJson', this.updatedJson)
    }
  },
  mounted () {
    this.$store.commit('changeRoutePostJson', ROUTES.THEMES.EDIT)
    axios
      .get(ROUTES.THEMES.READ)
      .then(response => {
        // If no data => notify
        if (response.length === 0) {
          triggerNotification({
            variant: NOTIFICATION.WARNING,
            message: 'No desktop data to display'
          })
        }
        this.info = response.data
        this.dataLoaded = true
      })
      .catch(error => {
        console.log(error)
        triggerNotification({
          variant: NOTIFICATION.ERROR,
          message: 'Oops.. Something went wrong...'
        })
        return false
      })
  }
}
</script>
