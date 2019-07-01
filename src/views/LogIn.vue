<template>
  <div>
    <Navbar/>
    <v-container>
      <v-layout justify-center align-center>
        <v-flex xs12 sm10 md8>
          <v-card class="login-card">
            <h3 class="display-2 font-weight-medium">เข้าสู่ระบบ</h3>
            <form>
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
            </form>
            <div style="width: 100%; height: 10px; border-bottom: 1px solid grey; text-align: center">
              <span style="font-size: 14px; background-color: white; padding: 0 10px;">
                or <!--Padding is optional-->
              </span>
            </div>
            <FacebookLogin />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import FacebookLogin from '@/components/LoginPage/FacebookLogin'

export default {
  components: {
    Navbar,
    FacebookLogin
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
  }
}
</script>

<style scoped>
  .login-card {
    padding: 2em;
  }
</style>
