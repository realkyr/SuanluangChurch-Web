<template>
  <div>
    <Navbar/>
    <v-container>
      <v-layout style="height: 80vh;" justify-center align-center>
        <v-flex xs12 sm10 md8>
          <v-card class="login-card">
            <!-- <h4 class="display-2 font-weight-medium">เข้าสู่ระบบ</h4> -->
            <!-- <form>
              <v-text-field
                v-model="email"
                :error-messages="emailErrors"
                label="E-mail"
                prepend-icon="email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                :type="passwordShow ? 'text' : 'password'"
                @click:append="showPassTrigger"
                :error-messages="passwordError"
                label="Password"
                required
                prepend-icon="lock"
              ></v-text-field>

              <v-btn style="width: 100%;">Log In</v-btn>
            </form> -->
            <div style="margin-bottom: 10px; width: 100%; height: 10px; border-bottom: 1px solid grey; text-align: center">
              <span style="font-size: 14px; background-color: white; padding: 0 10px;">
                เข้าสู่ระบบ
              </span>
            </div>
            <!-- <v-btn @click="anonymousSignIn" style="width: 100%">เข้าสู่ระบบชั่วคราว</v-btn> -->
            <FacebookLogin />
            <router-link tag="a" to="/privacy">เงื่อนไขการใช้งาน</router-link>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <Footer />
  </div>
</template>

<script>
// import firebase from 'firebase'
// import 'firebase/auth'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FacebookLogin from '@/components/LoginPage/FacebookLogin'

export default {
  components: {
    Navbar,
    FacebookLogin,
    Footer
  },
  data () {
    return {
      passwordShow: false,
      email: '',
      password: '',
      passwordError: '',
      emailErrors: ''
    }
  },
  methods: {
    showPassTrigger () {
      this.passwordShow = !this.passwordShow
    }
    // async anonymousSignIn () {
    //   await firebase.auth().signInAnonymously()
    //   this.$router.push('/profile')
    // }
  }
}
</script>

<style scoped>
  .login-card {
    padding: 2em;
  }
</style>
