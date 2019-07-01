<template>
  <div>
    <Navbar/>
    <v-container>
      <h3>Profile Page</h3>
      <v-flex v-if="!finish">
        <v-layout style="height: 90vh;" justify-center align-center>
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-layout>
      </v-flex>
      <v-flex v-if="finish">
        <v-layout column align-center justify-center>
          <v-avatar
            :size="'180px'"
            color="grey lighten-4"
          >
          <img :src="profilePic" alt="avatar">
          </v-avatar>
          <h4>{{ dname }}</h4>
          <v-btn @click="signout">Log Out</v-btn>
        </v-layout>
      </v-flex>
    </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: {
    Navbar
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        console.log(user)
        this.profilePic = user.photoURL + '?height=200'
        this.dname = user.displayName
        this.finish = true
      } else {
        // No user is signed in.
        this.$router.push('/login')
      }
    })
  },
  data () {
    return {
      finish: false,
      profilePic: '',
      dname: ''
    }
  },
  methods: {
    async signout () {
      await firebase.auth().signOut()
      this.$router.push('/login')
    }
  }
}
</script>
