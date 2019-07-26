<template>
  <div>
    <Navbar />
    <File />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Navbar from '../components/Navbar'
import File from '../components/File/File'

export default {
  components: {
    Navbar,
    File
  },
  mounted () {
    this.initUser()
  },
  methods: {
    ...mapActions([
      'initUser'
    ])
  }
}
</script>
