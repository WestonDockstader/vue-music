<template>
  <div class="playlist">
    <h1>{{list.title}}</h1>
    <draggable v-model="songs" v-on:change="updateList">
      <div v-for="(song,index) in songs" :key="song._id" class="dis-card">
        <img :src="song.albumArt" alt="" class="img-class">
        <p class="song-info">
          <strong>{{song.title}} - {{song.artist}}</strong>
        </p>
        <p class="song-info">Album: {{song.album}}</p>
        <button class="btn-list" @click="handleButtonClick(index)">{{buttonText}}</button>
        <audio controls>
          <source :src="song.preview">
        </audio>
      </div>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  export default {
    name: 'tracks-list',
    mounted() {
      this.songs = this.$store.state.activeList.songs
    },
    data() {
      return {
        songs: []
      }
    },
    computed: {
      activeList() {
        return this.$store.state.activeList
      }
    },
    props: {
      list: {
        type: Array,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      },
      handleButtonClick: {
        type: Function,
        required: true
      },
      value: {
        type: Array,
        required: false,
        default: null
      }
    },
    components: {
      draggable
    },
    methods: {
      updateList() {
        this.activeList.songs = this.songs
        var update = this.activeList
        this.$store.dispatch('updatePlaylist', update)
      }
    }
  }
</script>

<style>
</style>