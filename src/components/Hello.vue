<template>
  <div>
    <sortTable :arrayToSort="info" :headCells="[{label:'ID', value:'id'},{label:'Theme', value:'theme'},{label:'Label', value:'label'}]"></sortTable>
         <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Ajouter une nouvelle page</md-dialog-title>
        <form novalidate class="md-layout" @submit.prevent="validateUser">
          <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field >
                <!-- <span class="md-error" v-if="!$v.form.cityFullName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.cityFullName.minlength">Invalid first name</span> -->
                <div class="container">
                  <autocomplete :suggestions="citiesArray" :selection.sync="value"></autocomplete>
                </div>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
               <md-field >
                <label for="theme">theme</label>
                <md-input name="theme" id="theme" />
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field >
                <label for="label">label</label>
                <md-input name="label" id="label" />
              </md-field>
            </div>
          </div>
          </md-card-content>
        </form>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">Close</md-button>
          <md-button class="md-primary" @click="showDialog = false">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
        <md-table>
            <md-table-row>
              <md-table-head><a v-on:click="sort('id')" href="#" >Id</a></md-table-head>
              <md-table-head><a v-on:click="sort('theme')" href="#" >theme</a></md-table-head>
              <md-table-head><a v-on:click="sort('label')" href="#" >label</a></md-table-head>
              <md-table-head><a v-on:click="sort('cityFullName')" href="#" >cityFullName</a></md-table-head>
              <md-table-head><a v-on:click="sort('createdDate')" href="#" >createdDate</a></md-table-head>
              <md-table-head><a v-on:click="sort('createdBy')" href="#" >createdBy</a></md-table-head>
              <md-table-head><a v-on:click="sort('updatedDate')" href="#" >updatedDate</a></md-table-head>
              <md-table-head><a v-on:click="sort('updatedBy')" href="#" >updatedBy</a></md-table-head>
              <md-table-head> </md-table-head>
            </md-table-row>
             <md-table-row v-for='theme in sortedTheme' :key=theme.id >
              <td>{{theme.id}}</td>
              <td>{{theme.theme}}</td>
              <td>{{theme.label}}</td>
              <td>{{theme.cityFullName}}</td>
              <td>{{theme.createdDate}}</td>
              <td>{{theme.createdBy}}</td>
              <td>{{theme.updatedDate}}</td>
              <td>{{theme.updatedBy}}</td>
              <td><md-button class="md-icon-button  md-dense md-raised" @click="updatedObject(theme.id, theme.theme, theme.label, theme.cityFullName)">+</md-button>
              </td>
            </md-table-row>
        </md-table>
        <md-dialog :md-active.sync="updateObject">
          <md-dialog-title>Ajouter une nouvelle page</md-dialog-title>
          <form novalidate class="md-layout" @submit.prevent="saveUpdateObject()">
          <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">

                <!-- <span class="md-error" v-if="!$v.form.cityFullName.required">The first name is required</span>
                <span class="md-error" v-else-if="!$v.form.cityFullName.minlength">Invalid first name</span> -->
                <div class="container">
                  <autocomplete :suggestions="citiesArray" :selection.sync="value" ref="ville"></autocomplete>
                </div>
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
          <md-button type="submit" class="md-primary" >Create user</md-button>
        </md-card-actions>
          </md-card-content>
        </form>
        <md-dialog-actions>
          <md-button class="md-primary" @click="updateObject = false">Close</md-button>
          <md-button class="md-primary" @click="updateObject = false">Save</md-button>
        </md-dialog-actions>
        </md-dialog>
  </div>
</template>
<style>
  @import '../assets/css/autocomplete.css';
</style>
<script>
import axios from 'axios'
import Vue from 'vue'
import Autocomplete from './Autocomplete.vue'
import SortTable from './SortTable.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

export default{
  data () {
    return {
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

    }
  },
  components: { Autocomplete, SortTable },
  methods: {
    sort: function (s) {
    // if s == current sort, reverse
      if (s === this.currentSort) {
        this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      }
      this.currentSort = s
    },
    updatedObject: function (id, theme, label, city) {
      this.updateObject = true
      this.updatedJson = {
        'id': id,
        'pathPattern': '\\/cuisiniste-(.*)-lpl\\.html',
        'cityEncodedName': 'mons-en-baroeul',
        'cityFullName': city,
        'theme': theme,
        'label': label
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
  },
  mounted () {
    axios
      .get('https://lmfr-seo-landing-local-api-744whj-dev.apps.op.acp.adeo.com/landing/local/admin/theme/')
      .then(response => {
        this.info = response.data
        this.dataLoaded = true
      })
  },
  computed: {
    sortedTheme: function () {
      if (this.dataLoaded) {
        return this.info.slice().sort((a, b) => {
          let modifier = 1
          if (this.currentSortDir === 'desc') modifier = -1
          if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
          if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
          return 0
        })
      }
    },
    citiesArray: function () {
      if (this.citiesLoaded) {
        return this.cities.data.slice().map((x) => {
          return x.nom
        })
      }
    }
  }
}
</script>
