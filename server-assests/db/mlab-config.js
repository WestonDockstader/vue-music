var mongoose=require('mongoose')
var connectionString='mongodb://guest:guest@ds135540.mlab.com:35540/vue-music'
var connection=mongoose.connection

mongoose.connect(connectionString)

connection.on('error',err=>{
  console.log('ERROR FROM DATABASE: ', err)
})

connection.once('open',()=>{
  console.log('Connected to Database')
})