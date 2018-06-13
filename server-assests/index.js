// can login and have own playlist this is extra

var express=require('express')
var bp=require('body-parser')
var app=express()
var server = require('http').createServer(app)
var cors=require('cors')
var port=process.env.PORT || 3000

var whitelist = ['http://localhost:8080', 'http://mytunes-vue.herokuapp.com'];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true
};
app.use(cors(corsOptions))

require('./db/mlab-config')

app.use(express.static(__dirname+'/../www/dist'))

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
