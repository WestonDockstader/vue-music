// Music-is-fun 
// allows to search for music 

// will have playlists
// can add music to a playlist
// will show current playlists if you want multiple
// can make it so you can rearrange playlists drap and drop or move up and down buttons

// can login and have own playlist this is extra

// use several components
var express=require('express')
var bp=require('body-parser')
var app=express()
var cors=require('cors')
var port=3000

app.use(cors())
require('./db/mlab-config')

app.use(bp.json())
app.use(bp.urlencoded({
  extended: true
}))

// auth would go here when/if you get there

// THEN ROUTES

var playlists=require('./routes/playlists')
app.use(playlists.router)

app.listen(port, ()=>{
  console.log('server is running on port', port)
})
