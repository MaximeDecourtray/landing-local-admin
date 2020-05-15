<template>
  <div>
      <md-dialog :md-active.sync="changeOpenBoolean">
        <slot></slot>
        <md-dialog-actions>
          <md-button class="md-primary" @click="changeOpenBoolean = false">Close</md-button>
          <md-button class="md-primary" @click="sendUpdateObject()">Save</md-button>
        </md-dialog-actions>
      </md-dialog>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data () {
    return {
      isPopinOpen: false
    }
  },
  props: {
    showPopin: {
      type: Boolean,
      default: false,
      required: true
    },
    formArrayData: {
      type: Array
    }
  },
  methods: {
    sendUpdateObject: function () {
      this.changeOpenBoolean = false
      console.log('hey', JSON.stringify(this.$store.state.postFormJson), this.$store.state.routePostJson)
      axios.post(this.$store.state.routePostJson, {
        body: JSON.stringify(this.$store.state.postFormJson)
      })
        .then(response => {})
        .catch(e => {
          this.errors.push(e)
        })
    }
  },
  computed: {
    changeOpenBoolean: {
      get () {
        return this.showPopin
      },
      set (showPopin) {
        if (!showPopin) {
          this.$emit('closePopin')
        }
      }
    }
  }
}
</script>
