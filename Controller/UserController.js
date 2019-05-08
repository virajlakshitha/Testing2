var mongoose = require('../DBSchema/DBConfig');
var Schema = mongoose.model('User');

var Controller = function () {
    this.getAll = function () {
        return new Promise(function (resolve, reject) {
            Schema.find({}, {password: 0,__v: 0}).exec().then(function (data) {
                resolve({status:200, data:data});
            }).catch(function (err) {
                reject({status:404, message: "No Data Available"});
            })
        })
    }
    this.getUserByEmail = function (email) {
        return new Promise(function (resolve, reject) {
            Schema.find({email:email},{password: 0,__v: 0}).exec().then(function (data){
                if (data.length === 0) {
                    reject({status:404, message: "User not found"});
                } else {
                    resolve({status:200, data:data});
                }
            }).catch(function(err){
                reject({status:404, message: "No User Found"});
            })
        })
    }
    this.insertUser = function (data) {
        return new Promise(function (resolve, reject) {
            var User = new Schema({
                name: data.name,
                password: data.password,
                email: data.email
            });
            User.save().then(function(){
                resolve({status:200, message: "Successfully Added"});
            }).catch(function(err){
                reject({status:500, message:"Cannot Add User"});
            })
        })
    }
    this.validateUser = function (data) {
        return new Promise(function (resolve, reject) {
            Schema.find({email: data.email, password: data.password}, {password: 0,__v: 0}).exec().then(function (data) {
                if (data.length === 0) {
                    reject({status:404, message: "User not found"});
                } else {
                    resolve({status:200, data:data});
                }
            }).catch(function (err) {
                reject({status:404, message: "No Data Available"});
            })
        });
    }
    this.updateUser = function (email, body) {
        return new Promise(function (resolve, reject) {
            Schema.update({email:email},body).then(function (data){
                resolve({status:200, message: "Successfully Updated"});
            }).catch(function(err){
                reject({status:404, message: "No User Found"});
            })
        })
    }
    this.deleteUser = function (email) {
        return new Promise(function (resolve, reject) {
            Schema.remove({email:email}).then(function (data){
                resolve({status:200, message:"Successfully Deleted"});
            }).catch(function(err){
                reject({status:404, message: "No User Found"});
            })
        })
    }
};
module.exports = new Controller();