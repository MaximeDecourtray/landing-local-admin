<template>
<div>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">My App name</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <router-link class="md-list-item-text" to="/">Home</router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <router-link class="md-list-item-text" to="/themes">Themes list</router-link>
        </md-list-item>
        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>
      </md-list>
</div>
</template>

<script>
export default {
  name: 'Temporary',
  data: () => ({
  })
}
</script>

<style>
  .page-container {
    min-height: 300px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-content {
    padding: 16px;
  }
</style>
