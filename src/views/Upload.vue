<template>
  <div>
    <Navbar />
    <v-btn @click="toProfile" color="primary">Profile</v-btn>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: {
    Navbar
  },
  methods: {
    toProfile () {
      this.$router.push('/profile')
    }
  }
}
</script>
