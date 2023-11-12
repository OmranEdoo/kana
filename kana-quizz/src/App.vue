<template>
  <router-view></router-view>

  <div id="footer" class="bg-grey-lighten-1">
    <v-row justify="center" no-gutters>
      <router-link :to="{ name: 'about' }">
        <v-btn class="noAnimButton mx-2" target="_blank" color="white" variant="text" rounded="xl">About</v-btn>
      </router-link>
      <v-btn href="mailto:omranedoo@gmail.com" target="_blank" color="white" variant="text" class="mx-2" rounded="xl">
        Contact
      </v-btn>
    </v-row>
  </div>
</template>

<style>
#body {
  background-color: #202124;
}

#footer {
  position: fixed;
  width: 100vw;
  bottom: 0;
  left: 0;
}

.noAnimButton {
  pointer-events: none;
}
</style>
