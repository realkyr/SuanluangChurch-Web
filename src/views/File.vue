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
  data: () => ({
    ref: null
  }),
  async mounted () {
    const storage = firebase.storage()
    const db = firebase.firestore()
    const ref = db
      .collection('users')
      .doc(this.$route.params.uid)
      .collection('files')
      .doc(this.$route.params.fileid)

    const doc = await ref.get()

    if (!doc.exists) {
      alert('File not found!')
      return
    }
    const info = doc.data()

    if (info.file_link) {
      window.location.href = info.file_link
    } else {
      const pathReference = storage.ref(info.path)
      try {
        const url = await pathReference.getDownloadURL()
        ref.set({
          file_link: url
        }, { merge: true })
        window.location.href = url
      } catch (err) {
        switch (err.code) {
          case 'storage/object-not-found':
            // File doesn't exist
            alert('File not found')
            break

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            alert('You do not have permission to access this file')
            break

          case 'storage/canceled':
            // User canceled the upload
            alert('admin canceled the upload')
            break

          case 'storage/unknown':
            // Unknown error occurred, inspect the server
            alert('Unknown Storage Error')
            break
        }
      }
    }
  }
}
</script>
