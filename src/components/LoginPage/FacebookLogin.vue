<template>
  <div>
    <button @click="loginWithFacebook" class="facebook-login-button">
      <v-flex>
        <v-layout justify-center align-center>
          <FacebookLogo style="margin-right: 10px"/> เข้าสู่ระบบด้วย Facebook
        </v-layout>
      </v-flex>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import FacebookLogo from './FacebookIcon.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: {
    FacebookLogo
  },
  mounted () {
    this.initUser()
  },
  methods: {
    async loginWithFacebook () {
      firebase.auth().useDeviceLanguage()
      const provider = new firebase.auth.FacebookAuthProvider()
      try {
        let result = await firebase.auth().signInWithPopup(provider)
        // The signed-in user info.
        let { user } = result

        // map data to Vuex
        this.setUseruid(user.uid)
        this.setUserdname(user.displayName)
        this.setUserPhotoUrl(user.photoURL + '?height=200')
        this.$router.push('/profile')
      } catch (error) {
        console.log(error)
      }
    },
    ...mapActions([
      'setUserdname',
      'setUserPhotoUrl',
      'setUseruid',
      'initUser'
    ])
  },
  computed: {
    uid () {
      return this.$store.state.user.uid
    }
  },
  watch: {
    uid (newUser, oldUser) {
      if (newUser !== 'pending' && newUser !== '') this.$router.push('/profile')
    }
  }
}
</script>

<style>
  #Ebene_1 {
    height: 30px;
  }
  .st0 {
    fill: #1877F2;
  }
  .facebook-login-button {
    font-family: 'Prompt', sans-serif;
    margin: 10px 3px;
    width: 100%;
    padding: 2px 10px;
    border-width: 2px;
    border-radius: 5px;
    border-style: solid;
    color: #1877F2;
    border-color: #1877F2;
  }
</style>
