<template>
  <div>
    <Navbar/>
    <v-container>
      <h3>Profile Page</h3>
      <v-flex v-if="user.uid == 'pending'">
        <v-layout style="height: 90vh;" justify-center align-center>
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </v-layout>
      </v-flex>
      <v-flex v-if="user.uid != 'pending'">
        <v-layout column align-center justify-center>
          <v-avatar
            :size="'180px'"
            color="grey lighten-4"
          >
          <img :src="user.photoUrl" alt="avatar">
          </v-avatar>
          <h4>{{ user.dname }}</h4>
          <v-btn @click="signout">Log Out</v-btn>
        </v-layout>
      </v-flex>
      <FileList />
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Navbar from '@/components/Navbar'
import FileList from '@/components/Profile/FileList'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: {
    Navbar,
    FileList
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
