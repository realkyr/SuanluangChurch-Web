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
      <h2 style="word-break: break-word;" class="display-1">{{ file.name }}</h2>
      <v-layout row wrap align-center justify-space-between>
        <v-layout column align-center class="file-info" justify-center xs4>
          <span class="headline">Size</span>
          <span class="subtitle-1">{{ file.size }} bytes</span>
        </v-layout>
        <v-layout column align-center class="file-info" justify-center xs4>
          <span class="headline">Uploaded File</span>
          <span class="subtitle-1">{{ file.uploaded_date }}</span>
        </v-layout>
        <v-layout column align-center class="file-info" justify-center xs4>
          <span class="headline">Public</span>
          <span class="subtitle-1">{{ file.public }}</span>
        </v-layout>
      </v-layout>
      <v-layout column align-center>
        <img style="width: 200px; margin-bottom: 10px" v-if="!url.error" :src="this.url"/>
        <h3 v-if="url.error">{{ url.error }}</h3>
        <v-btn outlined color="error" @click="overlay = !overlay">Delete File</v-btn>
      </v-layout>
      <!--
        ---------------
        overlay modal
        ---------------
      -->
      <v-dialog v-model="overlay" persistent max-width="400">
        <v-card>
          <v-card-title class="headline">ต้องการจะลบไฟล์จริง ๆ ?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1" text  @click="delFile">ยืนยัน</v-btn>
            <v-btn color="black" text @click="overlay = false">ยกเลิก</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
      url: { error: 'qrcode is loading' },
      overlay: false,
      ref: null
    }
  },
  methods: {
    async delFile () {
      const storage = firebase.storage()
      const qrpath = storage.ref(this.file.qrcode)
      const filepath = storage.ref(this.file.path)
      await qrpath.delete()
      await filepath.delete()
      await this.ref.delete()
      this.$router.push('/profile')
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
        const ref = db
          .collection('users')
          .doc(this.user.uid)
          .collection('files')
          .doc(this.$route.params.id)

        this.ref = ref

        ref.onSnapshot({
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
              if (this.file.qrcode_link) {
                this.url = this.file.qrcode_link
              } else {
                const storage = firebase.storage()
                const pathReference = storage.ref(this.file.qrcode)
                try {
                  const url = await pathReference.getDownloadURL()
                  ref.set({
                    qrcode_link: url
                  }, { merge: true })
                  this.url = url
                } catch (err) {
                  this.url = { error: 'qrcode unavaiable' }
                }
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

<style scoped>
.file-info {
  padding: 40px 0;
  margin: 20px 0;
  border-left-style: solid;
  border-left-color: gray;
  border-left-width: 0.3px;
}
</style>
