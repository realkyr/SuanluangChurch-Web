<template>
  <div>
    <v-alert
      class="alert-fileupload"
      :value="error"
      type="error"
      transition="slide-y-transition"
    >
      {{error}}
    </v-alert>
    <v-alert
      class="alert-fileupload"
      :value="success"
      type="success"
      transition="slide-y-transition"
    >
      อัพโหลดสำเร็จ!
    </v-alert>
    <Navbar />
    <v-container v-if="user.uid === 'pending'">
      <v-layout align-center justify-center>
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </v-layout>
    </v-container>
    <v-container v-if="user.uid !== 'pending'">
      <template v-if="uploadTask" transition="slide-y-transition">
        <v-layout row wrap align-center>
          <v-flex xs11>
            <v-progress-linear
              color="info"
              height="10"
              :value="this.uploadProgress"
            />
          </v-flex>
          <v-flex xs1>
            <div style="float: right;">{{uploadProgress}}%</div>
          </v-flex>
        </v-layout>
        <v-btn @click="uploadTask.cancel()" color="error">ยกเลิก</v-btn>
      </template>

      <v-text-field
        label="Select Image"
        @click='pickFile'
        v-model='imageName'
        prepend-icon='attach_file'
        readonly
        :disabled="Boolean(uploadTask)"
      />
      <input
        type="file"
        style="display: none"
        ref="myInput"
        accept="file"
        @change="onFilePicked"
      >
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'
import Navbar from '@/components/Navbar'
import { mapState } from 'vuex'
import { setTimeout } from 'timers'

import moment from 'moment'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      imageName: 'No File Selected',
      uploadProgress: 0,
      uploadTask: null,
      error: false,
      success: false
    }
  },
  methods: {
    pickFile () {
      this.$refs.myInput.click()
    },
    onFilePicked (e) {
      // files handler
      const storage = firebase.storage()
      const files = e.target.files
      if (files.length === 0) {
        this.imageName = 'No File Selected'
        return
      }
      this.imageName = files[0].name
      const ref = storage.ref().child(`${this.user.uid}/${this.imageName}`) // TODO: add moment.js timestamp to make unique

      // Upload handler
      this.uploadTask = ref.put(files[0])
      this.uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          this.uploadProgress = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        },
        err => {
          switch (err.code) {
            case 'storage/canceled':
              this.cancelHandler()
              break
            default:
              this.errorHandler(err.message)
              break
          }
          this.uploadTask = null
        },
        this.successHandler
      )
    },
    cancelHandler () {
      this.error = 'ยกเลิกแล้ว'
      this.uploadProgress = 0
      this.imageName = 'No File Selected'
      setTimeout(() => { this.error = false }, 2000)
    },
    successHandler () {
      const db = firebase.firestore()
      const ref = db.collection('users').doc(this.user.uid).collection('files').doc()
      ref.set({
        size: this.uploadTask.snapshot.totalBytes,
        path: this.uploadTask.snapshot.ref.fullPath,
        name: this.uploadTask.snapshot.ref.name,
        public: true,
        uploaded_date: moment().format('YYYY-MM-DD')
      })
      this.uploadTask = null
      this.success = true
      this.uploadProgress = 0
      this.imageName = 'No File Selected'
      setTimeout(() => { this.success = false }, 3000)
    },
    errorHandler (msg) {
      this.error = msg
      this.uploadProgress = 0
      this.imageName = 'No File Selected'
      setTimeout(() => { this.error = false }, 2000)
    }
  },
  computed: {
    ...mapState([
      'user'
    ])
  }
}
</script>

<style scoped>
.alert-fileupload {
  position: absolute;
  top: 0;
  z-index: 99;
  width: 100%;
  margin: 0;
}
</style>
