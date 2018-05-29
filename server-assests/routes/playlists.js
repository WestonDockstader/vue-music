var router=require('express').Router()
var Playlists=require('../models/playlist')

// GET ALL PLAYLISTS
router.get('/api/playlists',(req,res,next)=>{
  Playlists.find(req.query)
    .then(playlists=>{
      res.status(200).send(playlists)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

// GET PLAYLIST BY ID
router.get('/api/playlists/:id',(req,res,next)=>{
  Playlists.findById(req.params.id)
    .then(playlist=>{
      res.status(200).send(playlist)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

// CREATE PLAYLIST
router.post('/api/playlists',(req,res,next)=>{
  var playlist=req.body
  Playlists.create(playlist)
    .then(newPlaylist=>{
      res.status(200).send(newPlaylist)
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

router.post('/api/playlists/:_id',(req,res,next)=>{
  Playlists.findByIdAndUpdate(req.params._id, req.body).then(list=>{
    res.send(list)
  })
})

// EDIT PLAYLIST
router.put('/api/playlists/:_id/songs', (req,res,next)=>{
  Playlists.findById(req.params._id)
    .then(playlist=>{
      playlist.songs.$addToSet(req.body)
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
router.delete('/api/playlists/:id', (req,res,next)=>{
  Playlists.findByIdAndRemove(req.params.id)
    .then(data=>{
      res.send("Successfully Deleted Playlist")
    })
    .catch(err=>{
      res.status(400).send(err)
    })
})

module.exports={router}