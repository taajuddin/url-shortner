const Url =require('../models/url')
const useragent = require('useragent');
const urlCltr={}

urlCltr.list=(req,res)=>{
    Url.find()
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

urlCltr.create=(req,res)=>{
    const body=req.body
    const url=new Url(body)
    url.save()
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}
urlCltr.show=(req,res)=>{
    const id=req.params.id
    Url.findById(id)
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

urlCltr.update=(req,res)=>{
    const id=req.params.id
    const body=req.body
    Url.findByIdAndUpdate(id, body, {new:true, runValidators:true})
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}
urlCltr.destroy=(req,res)=>{
    const id=req.params.id
    Url.findByIdAndDelete(id)
    .then((url)=>{
        res.json(url)
    })
    .catch((err)=>{
        res.json(err)
    })
}

urlCltr.hashShow=(req,res)=>{
    let hash = req.params.hash;
    let agent = useragent.parse(req.headers['user-agent']);
    let arrayElement = {      //construct an object to push it in 'clicks' array 
        ipAddress: req.ip,
        browserName: agent.family,
        osType: agent.os,
        deviceType: agent.device
    };

    
    Url.findOne({ hashedUrl: hash })
    .then((url) => {
        if (!url) {
            res.send({
                notice: 'url not found'
            })
        }
        url.findOneAndUpdate({ hashedUrl: hash }, { $push: { clicks: arrayElement}} )
        .then((res) => {  
            res.redirect(url.originalUrl )
        })
        .catch((err)=>{
            res.json(err)
        })
   
 })
 .catch((err)=>{
    res.json(err)
 })

}

module.exports=urlCltr