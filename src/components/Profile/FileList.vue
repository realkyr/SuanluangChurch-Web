<template>
  <div>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            label="Search"
            placeholder="search by file name"
            prepend-icon="search"
          ></v-text-field>
        </v-flex>

        <v-flex xs1 offset-xs1 offset-sm5>
          <v-btn @click="$router.push('/upload')">upload</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center justify-space-between>
        <v-flex xs2>
          <span class="title">File Name</span>
        </v-flex>
        <v-flex xs2>
          <span class="title">Uploaded Date</span>
        </v-flex>
        <v-flex xs1>
          <span class="title">Public</span>
        </v-flex>
      </v-layout>
      <v-layout row wrap align-center justify-space-between :key="item.id" v-for="item in files">
        <v-flex xs2>
          <span class="subheader font-weight-medium">{{ item.name }}</span>
        </v-flex>
        <v-flex xs2>
          <span class="subheader">{{ item.uploaded_date ? item.uploaded_date : 'unknown' }}</span>
        </v-flex>
        <v-flex xs1>
          <v-chip class="check-icon" color="green" text-color="white"><v-icon>check</v-icon></v-chip>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      files: {}
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
        let exp = val.uid !== 'pending' && val.uid !== ''
        if (exp) {
          console.log('get again')
          const db = firebase.firestore()
          const ref = db.collection('users').doc(this.user.uid).collection('files')
          const querySnapshots = await ref.get()
          for (let doc of querySnapshots.docs) {
            this.files = {
              ...this.files,
              [doc.id]: doc.data()
            }
          }
        }
      },
      deep: true
    }
  }
}
</script>

<style scoped>
  .check-icon span i {
    font-size: 15px;
  }
</style>
