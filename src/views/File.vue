<template>
  <v-flex>
    <v-layout style="height: 90vh;" justify-center align-center>
      <v-progress-circular
        indeterminate
        color="primary"
      />
    </v-layout>
  </v-flex>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

export default {
  async mounted () {
    const storage = firebase.storage()
    const db = firebase.firestore()
    const doc = await db
      .collection('users')
      .doc(this.$route.params.uid)
      .collection('files')
      .doc(this.$route.params.fileid)
      .get()

    const info = doc.data()

    const pathReference = storage.ref(info.path)
    try {
      const url = await pathReference.getDownloadURL()
      window.location.href = url
    } catch (err) {
      alert('Error!')
    }
  }
}
</script>
