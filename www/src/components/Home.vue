<template>
  <div class="header">
    <h1>FindTunes</h1>
    <div class="searchbar">
      <form @submit.prevent="search">
        <input type="text" v-model="query" placeholder="Artist Name">
        <button type="submit">Search</button>
      </form>
      <hr>
    </div>

    <div class="display-section">
      <div class="row">
        <h2>Search results for: {{artist}}</h2>
        <tracks :list="results" button-text="Add to Playlist" :handle-button-click="addToPlayList"></tracks>
      </div>
      <div class="playlists">
        <div class="row">
          <div v-if="changeDisplay">
            <button @click="addPlayForm=true">Create Playlist</button>
            <form v-if="addPlayForm" v-on:submit.prevent="createPlaylist">
              <input type="text" v-model="list.title">
              <button @click="addPlayForm=false" type="submit">Submit</button>
            </form>
            <div v-if="playlists">
              <ol>
                <li v-for="playlist in playlists">
                  <h3>{{playlist.title}}</h3>
                  <img src="http://placehold.it/100x100">
                  <p>{{playlist.songs.length}} tracks</p>
                  <button @click="deletePlaylist(playlist)">Delete</button>
                  <button @click="setActiveList(playlist)">CurrentList</button>
                  <button @click="changeDisplay=false, setActiveList(playlist)">Open Playlist</button>
                </li>
              </ol>
            </div>
          </div>
          <div v-if="!changeDisplay">
            <button @click="changeDisplay=true">Back to Playlists</button>
            <h2>{{activeList.title}}</h2>
            <ptracks :list="activeList.songs" button-text="Remove From Playlist" :handle-button-click="removeFromPlayList"></ptracks> 
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import tracks from './Tracks.vue'
  import ptracks from './Playlist.vue'
  export default {
    name: 'Home',
    components: {
      tracks,
      ptracks
    },
    data() {
      return {
        query: '',
        artist: '',
        addPlayForm: false,
        list: {
          title: ''
        },
        changeDisplay: true
      }
    },
    mounted() {
      this.$store.dispatch('getPlaylists')
    },
    computed: {
      results() {
        return this.$store.state.searchResults;
      },
      playlists() {
        return this.$store.state.playlists;
      },
      activeList(){
        return this.$store.state.activeList;
      }
    },
    methods: {
      search() {
        this.$store.dispatch('search', this.query)
        this.artist = this.query
        this.query = ''
      },
      addToPlayList(payload) {
        this.activeList.songs.push(payload)
        this.$store.dispatch('addToPlayList', this.activeList)
      },
      createPlaylist() {
        this.$store.dispatch('createPlaylist', this.list)
      },
      deletePlaylist(list) {
        this.$store.dispatch('deletePlaylist', list)
      },
      setActiveList(list) {
        this.$store.commit('setActiveList',list)
      },
      removeFromPlayList(payload){
        this.$store.dispatch('removeFromPlaylist', payload)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .display-section {
    display: grid;
    grid-template-areas: "results playlists"
  }

  .results {
    grid-area: results
  }

  .playlists {
    grid-area: playlists
  }
</style>