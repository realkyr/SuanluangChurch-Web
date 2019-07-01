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
import FacebookLogo from './FacebookIcon.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  components: {
    FacebookLogo
  },
  mounted () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.$router.push('/profile')
      } else {
        // No user is signed in.
        console.log('user is not signed in')
      }
    })
  },
  methods: {
    async loginWithFacebook () {
      firebase.auth().useDeviceLanguage()
      const provider = new firebase.auth.FacebookAuthProvider()
      try {
        let result = await firebase.auth().signInWithPopup(provider)
        let token = result.credential.accessToken
        // The signed-in user info.
        let { user } = result
        // ...
        console.log({ token, user })
        this.$router.push('/profile')
      } catch (error) {
        console.log(error)
      }
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
