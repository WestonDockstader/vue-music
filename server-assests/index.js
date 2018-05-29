// can login and have own playlist this is extra

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

app.get('*', (req,res,next)=>{
  res.status(404).send({
    error:"No matching routes"
  })
})

app.listen(port, ()=>{
  console.log('server is running on port', port)
})
