var express = require('express');
var router = express.Router();
var Controller = require('./CommentsController');

router.post('/', function (req, res) {
    Controller.insertComment(req.body).then(function(data){
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
router.get('/:tech', function(req, res){
    Controller.getCommentsByTech(req.params.tech).then(function(data){
        res.status(data.status).send({status: true, data: data.data})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.get('/:commentId', function(req, res){
    Controller.getCommentsByID(req.params.commentId).then(function(data){
        res.status(data.status).send({status: true, data: data.data})
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.put('/:commentId', function(req,res){
    Controller.updateComment(req.params.commentId, req.body).then(function(data){
        res.status(data.status).send({status: true, message: data.message});
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});
router.delete('/:commentId', function(req,res){
    Controller.deleteComment(req.params.commentId, req.body).then(function(data){
        res.status(data.status).send({status: true, message: data.message});
    }).catch(function(err){
        res.status(err.status).send({status: false, message: err.message});
    })
});

module.exports = router;