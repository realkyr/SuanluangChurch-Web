<template>
  <v-footer
    color="grey darken-3"
    padless
  >
    <v-layout
      justify-center
      wrap
    >
      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        @click="toPage(link)"
      >
        {{ link }}
      </v-btn>
      <v-flex
        grey
        darken-4
        py-4
        text-center
        white--text
        xs12
      >
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      'Home',
      'About Us',
      'Team',
      'Services',
      'Blog',
      'Contact Us',
      'Privacy'
    ]
  }),
  methods: {
    toPage (link) {
      this.$router.push(`${link.toLowerCase().replace(/\s+/g, '')}`)
    }
  }
}
</script>
