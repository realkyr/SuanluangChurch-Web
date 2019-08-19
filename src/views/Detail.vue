<template>
  <div>
    <Navbar />
    <File />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import File from '../components/File/File'
const Navbar = () => import('../components/Navbar')

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
