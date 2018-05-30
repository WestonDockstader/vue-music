<template>
  <div class="header">
    <h1>FindTunes</h1>
    <div class="searchbar">
      <form @submit.prevent="search">
        <input type="text" v-model="query" placeholder="Artist Name">
        <button class="btn" type="submit">Search</button>
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
            <button style="margin-bottom:1rem;" @click="addPlayForm=true">Create Playlist</button>
            <form v-if="addPlayForm" v-on:submit.prevent="createPlaylist">
              <input type="text" v-model="list.title">
              <button class="btn" @click="addPlayForm=false" type="submit">Submit</button>
              <button class="btn" @click="addPlayForm=false">Cancel</button>
            </form>
            <div v-if="playlists">
              <div class="playlist-card" v-for="playlist in playlists">
                <h2 style="padding-top:1.5rem;">{{playlist.title}}</h2>
                <p>{{playlist.songs.length}} tracks</p>
                <div style="padding-bottom:1rem;">
                  <button class="btn" @click="deletePlaylist(playlist)">Delete</button>
                  <button class="btn" @click="setActiveList(playlist)">Active List</button>
                  <button class="btn" @click="changeDisplay=false, setActiveList(playlist)">Open Playlist</button>
                </div>
              </div>
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
      activeList() {
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
        this.$store.commit('setActiveList', list)
      },
      removeFromPlayList(payload) {
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
  .playlist-card{
    border-radius: 15px;
    background-color: rgba(94, 138, 90, 0.4);
    text-align:center;
  }
  .btn:hover{
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.3)
  }
</style>