var mongoose = require('../DBSchema/DBConfig');
var Schema = mongoose.model('Comments');

var Controller = function () {
    this.getAll = function () {
        return new Promise(function (resolve, reject) {
            Schema.find({}, {__v: 0}).exec().then(function (data) {
                resolve({status:200, data:data});
            }).catch(function (err) {
                reject({status:404, message: "No Data Available"});
            })
        })
    }
    this.getCommentsByTech = function (tech) {
        return new Promise(function (resolve, reject) {
            Schema.find({ tech: tech },{__v: 0}).exec().then(function (data) {
                resolve({status:200, data:data});
            }).catch(function (err) {
                reject({status:404, message: "No Data Available"});
            })
        })
    }
    this.getCommentsByID = function (commentId) {
        return new Promise(function (resolve, reject) {
            Schema.find({_id:commentId},{__v: 0}).exec().then(function (data){
                resolve({status:200, data:data});
            }).catch(function(err){
                reject({status:404, message: "No Comment Found"});
            })
        })
    }
    this.insertComment = function (data) {
        return new Promise(function (resolve, reject) {
            var Comment = new Schema({
                user: data.user,
                postedDate: data.postedDate,
                comment: data.comment,
                tech: data.tech
            });
            Comment.save().then(function(){
                resolve({status:200, message: "Successfully Added"});
            }).catch(function(err){
                reject({status:500, message:"Cannot Add Comments"});
            })
        })
    }
    this.updateComment = function (commentId, body) {
        return new Promise(function (resolve, reject) {
            Schema.update({_id:commentId},body).then(function (data){
                resolve({status:200, message: "Successfully Updated"});
            }).catch(function(err){
                reject({status:404, message: "No Comment Found"});
            })
        })
    }
    this.deleteComment = function (commentId) {
        return new Promise(function (resolve, reject) {
            Schema.remove({_id:commentId}).then(function (data){
                resolve({status:200, message:"Successfully Deleted"});
            }).catch(function(err){
                reject({status:404, message: "No Comment Found"});
            })
        })
    }
};
module.exports = new Controller();