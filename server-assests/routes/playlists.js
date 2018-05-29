var router=require('express').Router()
var Playlists=require('../models/playlist')

// GET PLAYLIST BY ID OR ALL
router.get('/api/playlists/:id?',(req,res)=>{
  if(req.params.id){
    Playlists.findById(req.params.id)
      .then(playlist=>{
        return res.status(200).send(playlist)
      })
      .catch(err=>{
        res.status(400).send(err)
      })
  }
  Playlists.find(req.query)
    .then(playlists=>{
      res.status(200).send(playlists)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

// CREATE PLAYLIST
router.post('/api/playlists',(req,res)=>{
  var playlist=req.body
  Playlists.create(playlist)
    .then(newPlaylist=>{
      res.status(200).send(newPlaylist)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

// EDIT PLAYLIST - REPLACE ENTIRE SONG ARRAY
router.put('/api/playlists/:id',(req,res)=>{
  Playlists.findByIdAndUpdate(req.params.id, req.body, {new:true}).then(list=>{
    res.send(list)
  })
})

// EDIT PLAYLIST - ADD ONE SONG
router.put('/api/playlists/:id/songs', (req,res)=>{
  Playlists.findById(req.params.id)
    .then(function(playlist){
      playlist.songs.addToSet(req.body)
      playlist.save()
        .then(()=>{
          console.log("Successfully Updated ", playlist)
          res.status(200).send(playlist)
        })
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

// DELETE PLAYLIST
router.delete('/api/playlists/:id', (req,res)=>{
  Playlists.findByIdAndRemove(req.params.id)
    .then(data=>{
      res.send("Successfully Deleted Playlist")
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

module.exports={router}