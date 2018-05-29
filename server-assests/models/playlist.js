var mongoose=require('mongoose')
var Schema=mongoose.Schema
var schemaName='Playlist'
// put the song schema in here too

let songSchema = new Schema({
  title: {type:String, required:true},
  albumArt: {type:String, required:true},
  artist: {type:String, required:true},
  album: {type:String, required:true},
  preview: {type:String, required:true}
})

let schema = new Schema({
  title: String,
  songs: [songSchema]
})

schema.pre('save', function(next){
  this.markModified('songs')
  next()
})

module.exports=mongoose.model(schemaName,schema)