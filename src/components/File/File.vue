<template>
  <v-container>
    <v-flex v-if="file == 'pending'">
      <v-layout style="height: 90vh;" justify-center align-center>
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-layout>
    </v-flex>
    <v-flex v-if="file == 'notFound'">
      <v-layout style="height: 90vh;" justify-center align-center>
        File Not Found
      </v-layout>
    </v-flex>
    <template v-if="file.id">
      <h2>{{ file.name }}</h2>
      <img v-if="!url.error" :src="this.url"/>
      <h3 v-if="url.error">{{ url.error }}</h3>
    </template>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      file: 'pending',
      qrcode: false,
      url: { error: 'qrcode is loading' }
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  },
  watch: {
    user: {
      async handler (val, oldVal) {
        console.log(val)
        let exp = val.uid !== 'pending' && val.uid !== ''
        if (!exp) return
        const db = firebase.firestore()
        console.log(this.user.uid)
        console.log(this.$route.params.id)
        db
          .collection('users')
          .doc(this.user.uid)
          .collection('files')
          .doc(this.$route.params.id)
          .onSnapshot({
            // Listen for document metadata changes
            includeMetadataChanges: true
          }, async doc => {
            if (!doc.exists) {
              this.file = 'notFound'
            } else {
              this.file = {
                ...doc.data(),
                id: doc.id
              }
              if (this.file.qrcode) {
                const storage = firebase.storage()
                const pathReference = storage.ref(this.file.qrcode)
                try {
                  this.url = await pathReference.getDownloadURL()
                } catch (err) {
                  this.url = { error: 'qrcode unavaiable' }
                }
              } else {
                this.url = { error: 'qrcode is generating' }
              }
            }
          })
      },
      deep: true
    }
  }
}
</script>
