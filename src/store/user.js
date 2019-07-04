import firebase from 'firebase/app'
import router from '../router'

const state = {
  dname: '',
  uid: '',
  photoUrl: ''
}

const mutations = {
  setUserdname (state, dname) {
    state.dname = dname
  },
  setUseruid (state, uid) {
    state.uid = uid
  },
  setUserPhotoUrl (state, photoUrl) {
    state.photoUrl = photoUrl
  },
  clearUser (state) {
    state.dname = ''
    state.uid = ''
    state.photoUrl = ''
  },
  pendingUser (state) {
    state.dname = 'pending'
    state.uid = 'pending'
    state.photoUrl = 'pending'
  }
}

const actions = {
  setUserdname: ({ commit }, payload) => {
    commit('setUserdname', payload)
  },
  setUseruid: ({ commit }, payload) => {
    commit('setUseruid', payload)
  },
  setUserPhotoUrl: ({ commit }, payload) => {
    commit('setUserPhotoUrl', payload)
  },
  clearUser: ({ commit }) => {
    commit('clearUser')
  },
  initUser: async ({ commit }, notRoute) => {
    commit('pendingUser')
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        commit('setUserdname', user.displayName)
        commit('setUserPhotoUrl', user.photoURL + '?height=500')
        commit('setUseruid', user.uid)
      } else {
        // No user is signed in.
        commit('clearUser')
        if (!notRoute) router.push('/login')
      }
    })
  }
}

export default {
  state,
  mutations,
  actions
}
