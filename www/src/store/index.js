import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import router from '../router'

vue.use(vuex)
var api=axios.create({
  baseURL:'http://localhost:3000/api',
  timeout: 3000
})

var iURL=axios.create({
  baseURL:'https://itunes.apple.com/',
  timeout: 3000
})

function swapUrlSize(url, pixels){
  var sizeString=`${pixels}x${pixels}`;
  var newURL=url.replace("60x60",sizeString)
  return newURL;
}

export default new vuex.Store({
  state:{
    user:{},
    playlists:[],
    searchResults:[],
    activeList:{}
  },
  mutations:{
    setUser(state,user){
      state.user=user
    },
    addSong(state,playlist){
      state.playlists=playlist
    },
    setSearchResults(state,payload){
      // vue.set(state,"searchResults", payload)
      state.searchResults=payload
    },
    setPlaylists(state,payload){
      state.playlists=payload
    },
    setActiveList(state,payload){
      state.activeList=payload
    },
    updateList(state,payload){
      state.activeList.songs=payload
    }
  },
  actions:{
    // WRITE IN LOGIN LOGOUT ACTIONS
    search({dispatch,commit},payload){
      iURL.get('search?media=music&term='+payload)
        .then(res=>{
          var songList=res.data.results.map(song=>{
            return{
              title: song.trackName,
              albumArt: swapUrlSize(song.artworkUrl60, 100),
              artist: song.artistName,
              album: song.collectionName,
              price: song.collectionPrice,
              preview: song.previewUrl
            }
          })
          commit('setSearchResults',songList)
        })
        .catch(err => dispatch('showNotification', err))
    },
    getPlaylists({dispatch,commit}){
      api.get('/playlists')
        .then(res=>{
          commit('setPlaylists', res.data)
        })
    },
    createPlaylist({dispatch,commit},payload){
      api.post("/playlists",payload)
        .then(res=>{
          dispatch('getPlaylists')
        })
    },
    addToPlayList({dispatch,commit},payload){
      api.put("/playlists/"+payload._id,payload)
        .then(res=>{
          dispatch('getPlaylists')
        })
    },
    updatePlaylist({dispatch,commit},payload){
      api.put("/playlists/"+payload._id,payload)
      .then(res=>{
        dispatch('getPlaylists')
      })
    },
    removeFromPlaylist({dispatch,commit,state},payload){
      state.activeList.songs.splice(payload,1)
      api.post('/playlists/'+state.activeList._id, state.activeList)
      .then(res=>{
        dispatch('getPlaylists')
      })
    },
    deletePlaylist({dispatch,commit},payload){
      api.delete('/playlists/'+payload._id,payload)  
      .then(res=>{
          dispatch('getPlaylists')
        })
    }
  }
})