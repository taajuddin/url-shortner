const express=require('express')
const router=express.Router()
const urlCltr=require('../app/controllers/urlCltr')

router.get('/urls',urlCltr.list)
router.post('/urls',urlCltr.create)
router.get('/urls/:id',urlCltr.show)
router.put('/urls/:id',urlCltr.update)
router.delete('/urls/:id',urlCltr.destroy)

router.get('/hash',urlCltr.hashShow)


module.exports=router