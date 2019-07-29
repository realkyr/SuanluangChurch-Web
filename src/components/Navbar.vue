<template>
  <div>
    <v-toolbar dark color="grey darken-4" tabs>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>Saungluang Church</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-title style="margin-right: 10px;">
        Welcome! {{ user.dname ? user.dname : 'Guest'}}
      </v-toolbar-title>

      <v-avatar @click="$router.push('/profile')" class="avatar" color="white">
        <i v-if="isNoPhoto" style="color: black;" class="fas fa-user"></i>
        <img v-if="!isNoPhoto" :src="user.photoUrl" alt="avatar">
      </v-avatar>
    </v-toolbar>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  mounted () {
    this.initUser(true)
  },
  methods: {
    ...mapActions([
      'initUser'
    ])
  },
  computed: {
    ...mapState([
      // map this.count to store.state.count
      'user'
    ]),
    isNoPhoto () {
      return this.user.photoUrl === '' || this.user.photoUrl === 'pending'
    }
  }
}
</script>

<style scoped>
  .avatar {
    cursor: pointer;
  }

  .avatar i {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none;   /* Safari */
    -khtml-user-select: none;    /* Konqueror HTML */
    -moz-user-select: none;      /* Firefox */
    -ms-user-select: none;       /* Internet Explorer/Edge */
    user-select: none;
  }
</style>
