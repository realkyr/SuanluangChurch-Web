<template>
  <div>
    <Navbar />
    <File />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
const Navbar = () => import('../components/Navbar')
const File = () => import('../components/File/File')

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
