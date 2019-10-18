<template>
  <div>
    <v-container grid-list-xs>
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field
            v-model="filter"
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
        <v-flex xs4>
          <span class="title">Uploaded Date (ปี - เดือน - วัน)</span>
        </v-flex>
        <v-flex xs2>
          <span class="title">View Detail</span>
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
        align-center
        justify-space-between
        :key="item.id"
        v-for="(item, item_id, index) in filteredFiles"
        :style="{ background: index % 2 !== 0 ? 'white' : '#B0BEC5' }"
      >
        <v-flex xs2>
          <span style="word-break: break-word;" class="subheader font-weight-medium">{{ item.name }}</span>
        </v-flex>
        <v-flex xs4>
          <span class="subheader">{{ item.uploaded_date ? item.uploaded_date : 'unknown' }}</span>
        </v-flex>
        <v-flex xs2>
          <!-- <v-chip class="check-icon" color="green" text-color="white"><v-icon>check</v-icon></v-chip> -->
          <v-btn @click="$router.push(`/detail/${item.id}`)">View Detail</v-btn>
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
      files: {},
      filter: ''
    }
  },
  computed: {
    ...mapState([
      'user'
    ]),
    filteredFiles () {
      if (this.filter === '') return this.files
      else {
        return this.objectFilter(this.files, this.filterFile)
      }
    }
  },
  methods: {
    objectFilter (obj, predicate) {
      let result = {}
      let key

      for (key in obj) {
        if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
          result[key] = obj[key]
        }
      }

      return result
    },
    filterFile (file) {
      if (file.name.includes(this.filter)) return false
      else return true
    }
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
              [doc.id]: {
                ...doc.data(),
                id: doc.id
              }
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
