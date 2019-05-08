var express = require('express');
var router = express.Router();
var Controller = require('./TechDetailsController');

router.post('/', function (req, res) {
    Controller.insertTech(req.body).then(function(data){
        res.status(data.status).send({status: true, message: data.message})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.get('/', function (req, res) {
    Controller.getAll().then(function(data){
        res.status(data.status).send({status: true, data: data.data})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.get('/category/:catName', function(req, res){
    Controller.getTechByCategory(req.params.catName).then(function(data){
        res.status(data.status).send({status: true, data: data.data})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.get('/:techId', function(req, res){
    Controller.getTech(req.params.techId).then(function(data){
        res.status(data.status).send({status: true, data: data.data})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.put('/:techId', function(req,res){
    Controller.updateTech(req.params.techId, req.body).then(function(data){
        res.status(data.status).send({status: true, message: data.message});
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.delete('/:techId', function(req,res){
    Controller.deleteTech(req.params.techId, req.body).then(function(data){
        res.status(data.status).send({status: true, message: data.message});
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});

module.exports = router;