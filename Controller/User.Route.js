var express = require('express');
var router = express.Router();
var Controller = require('./UserController');

router.post('/', function (req, res) {
    Controller.insertUser(req.body).then(function(data){
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
router.post('/validate/', function (req, res) {
    Controller.validateUser(req.body).then(function(data){
        res.status(data.status).send({status: true, data: data.data})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    });
});
router.get('/:email', function(req, res){
    Controller.getUserByEmail(req.params.email).then(function(data){
        res.status(data.status).send({status: true, data: data.data})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.put('/:email', function(req,res){
    Controller.updateUser(req.params.email, req.body).then(function(data){
        res.status(data.status).send({status: true, message: data.message});
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.delete('/:email', function(req,res){
    Controller.deleteUser(req.params.email, req.body).then(function(data){
        res.status(data.status).send({status: true, message: data.message});
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});

module.exports = router;