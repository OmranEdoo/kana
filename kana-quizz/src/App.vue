<script setup lang="ts">
import { ref } from 'vue'

const links = ref([
  'About Me',
  'Contact',
])
</script>

<template>
  <router-view></router-view>

  <div id="footer" class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <v-btn v-for="link in links" :key="link" color="white" variant="text" class="mx-2" rounded="xl">
        {{ link }}
      </v-btn>
    </v-row>
  </div>
</template>

<style>
#footer {
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
}
</style>
