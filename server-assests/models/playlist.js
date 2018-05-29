var mongoose=require('mongoose')
var Schema=mongoose.Schema
var schemaName='Playlist'

let songSchema = new Schema({
  title: {type:String, required:true, unique: true},
  albumArt: {type:String, required:true},
  artist: {type:String, required:true},
  album: {type:String, required:true},
  preview: {type:String, required:true},
  price: {type: Number}
})

let schema = new Schema({
  title: {type:String,required:true},
  songs: [songSchema]
})

schema.pre('save', function(next){
  this.markModified('songs')
  next()
})

module.exports=mongoose.model(schemaName,schema)