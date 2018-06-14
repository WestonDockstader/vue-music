<template>
  <div class="row justify-content-around">
    <div v-for="song in list" class="col-6 dis-card">
      <img :src="song.albumArt" alt="" class="img-class">
        <p class="song-info"><strong>{{song.title}} {{song.artist}}</strong></p>
      <p class="song-info">Album: {{song.album}}</p>
      <button class="btn-list" @click="handleButtonClick(song)">{{buttonText}}</button>
      <audio ref="player" controls>
        <source :src="song.preview">
      </audio>
    </div>
  </div>
</template>

<script>
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
      }
    }
  }
</script>

<style>
  .desc-pad {
    padding-top: 0.5rem;
  }
  .dis-card{
    /* border-radius: 20px; */
    background-color: rgba(107, 95, 95, 0.7);
    /* display: inline-block; */
    margin-bottom: 0rem;
    margin-right: 0rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    color: rgb(179, 172, 172);
  }
  .img-class{
    float: left;
    padding: 0.5rem;
  }
  .song-info{
    margin: 0.1rem;
  }
  .btn{
    padding-bottom: 2px;
  }
  .btn-list{
    font-size: 15px; 
  }
</style>