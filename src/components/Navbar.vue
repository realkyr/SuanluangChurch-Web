<template>
  <div>
    <v-toolbar dark tabs>
      <!-- <v-toolbar-side-icon></v-toolbar-side-icon> -->
      <v-toolbar-title>Saungluang Church</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-avatar class="avatar" color="white">
        <font-awesome-icon
          :style="{ color: 'black' }"
          :prefix="'far'"
          :icon="'fa-user'"
        />
        <img v-if="photoUrl" :src="photoUrl" alt="avatar">
      </v-avatar>
    </v-toolbar>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(user)
        this.photoUrl = user.photoURL + '?height=100'
      } else {
        // No user is signed in.
      }
    })
  },
  data () {
    return {
      photoUrl: ''
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
