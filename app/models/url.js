const mongoose = require ('mongoose')
// const validator = require('validator')
const  sh=require('shorthash')
const Schema=mongoose.Schema
const urlSchema=new Schema({
    title:{
        type:String,
        required:[true, 'url should have title']
    },
    originalUrl:{
        type:String,
        required:true
        // validate: {
        //      validator:function(url){
        //         return this.validator.isURL(url)
        //     },
        //     message:function(){
        //         return 'invalid URL'
        //     }
        // }
    },
    hashedUrl:{
        type:String,
        required:true
        
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
})
urlSchema.pre('validate',function(next){
    this.hashedUrl=sh.unique(this.originalUrl)
    next()
})


// urlSchema.statics.redirectUrl=function(hash,req){
//     const url=this
//     const clicked={
//         "clicked":new Date(),
//         "ip":req.connection.remoteAddress
//     }
//     return url.findOneAndUpdate({ hashedUrl: hash },{$push:{click:clicked}})
// }

const Url=mongoose.model('Url',urlSchema)

module.exports=Url