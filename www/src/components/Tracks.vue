<template>
  <div>
    <div v-for="song in list" class="dis-card">
      <img :src="song.albumArt" alt="" class="img-class">
      <div>
        <h3 class="song-info"><strong>{{song.title}}</strong></h3>
        <p class="song-info"><strong>{{song.artist}}</strong></p>
      <p class="song-info">Album: {{song.album}} Price: {{song.price}}</p>
      <button class="btn" @click="handleButtonClick(song)">{{buttonText}}</button>
    </div>
      <audio controls>
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
    border-radius: 20px;
    background-color: rgba(107, 95, 95, 0.3);
    display: block;
    margin-bottom: 1rem;
    margin-right: 1rem;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3)
  }
  .img-class{
    float: left;
    padding: 1rem;
  }
  .song-info{
    margin: 0.3rem;
  }
</style>