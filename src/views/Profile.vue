<template>
  <div>
    <Navbar/>
    <v-container>
      <h1>Profile Page</h1>
      <v-flex v-if="user.uid == 'pending'">
        <v-layout style="height: 90vh;" justify-center align-center>
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-layout>
      </v-flex>
      <v-flex v-if="user.uid != 'pending'" style="margin: 10px 0">
        <v-layout row align-center >
          <v-avatar
            :size="'180px'"
            color="grey lighten-4"
            style="margin-right: 10px"
          >
          <img :src="user.photoUrl" alt="avatar">
          </v-avatar>
          <v-flex>
            <h2 style="margin: 6px 8px;">{{ user.dname }}</h2>
            <v-btn color="primary">Change Profile</v-btn>
            <v-btn @click="signout">Log Out</v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
      <FileList />
    </v-container>
    <Footer />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
const FileList = () => import('@/components/Profile/FileList')
const Navbar = () => import('@/components/Navbar')
const Footer = () => import('@/components/Footer')

export default {
  components: {
    Navbar,
    FileList,
    Footer
  },
  mounted () {
    this.initUser()
  },
  methods: {
    async signout () {
      await firebase.auth().signOut()
      this.$router.push('/login')
      this.clearUser()
    },
    ...mapActions([
      'clearUser',
      'initUser'
    ])
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>
