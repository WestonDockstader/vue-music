<template>
  <div class="container-fluid">
    <h1>{{list.title}}</h1>
    <draggable v-model="mylist" v-on:change="updateList(mylist)">
            <div v-for="(song,index) in list" :key="index" class="dis-card">
              <img :src="song.albumArt" alt="" class="img-class">
              <div>
                <h3 class="song-info"><strong>{{song.title}}</strong></h3>
                <p class="song-info"><strong>{{song.artist}}</strong></p>
              <p class="song-info">Album: {{song.album}} Price: {{song.price}}</p>
              <button @click="handleButtonClick(song)">{{buttonText}}</button>
            </div>
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
      value:{
        type: Array,
        required: false,
        default: null
      }
    },
    components: {
      draggable
    },
    computed:{
      mylist:{
        get(){
          return this.$store.state.activeList.songs
        },
        set(value){
          this.$store.commit('updateList',value)
        }
      }
    },
  methods:{
    updateList(payload){
      console.log(payload)
      this.$store.dispatch('addToPlayList',payload)
    }  
  }
  }
</script>

<style>

</style>