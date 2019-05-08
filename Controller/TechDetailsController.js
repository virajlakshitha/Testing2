var mongoose = require('../DBSchema/DBConfig');
var Schema = mongoose.model('TechDetails');

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
    this.getTechByCategory = function (catName) {
        return new Promise(function (resolve, reject) {
            Schema.find({ category: catName },{__v: 0}).exec().then(function (data) {
                resolve({status:200, data:data});
            }).catch(function (err) {
                reject({status:404, message: "No Data Available"});
            })
        })
    }
    this.getTech = function (techId) {
        return new Promise(function (resolve, reject) {
            Schema.find({_id:techId},{__v: 0}).exec().then(function (data){
                resolve({status:200, data:data});
            }).catch(function(err){
                reject({status:404, message: "No Technology Found"});
            })
        })
    }
    this.insertTech = function (data) {
        console.log(data);
        return new Promise(function (resolve, reject) {
            var TechDetails = new Schema({
                techName: data.techName,
                details: data.details,
                category: data.category,
                iconUrl: data.iconUrl,
                postedOn: data.postedOn
            });
            TechDetails.save().then(function(){
                resolve({status:200, message: "Successfully Added"});
            }).catch(function(err){
                reject({status:500, message:"Cannot Add Technology Details"});
            });
        });
    }
    this.updateTech = function (techId, body) {
        return new Promise(function (resolve, reject) {
            Schema.update({_id:techId},body).then(function (data){
                resolve({status:200, message: "Successfully Updated"});
            }).catch(function(err){
                reject({status:404, message: "No Technology Found"});
            })
        })
    }
    this.deleteTech = function (techId) {
        return new Promise(function (resolve, reject) {
            Schema.remove({_id:techId}).then(function (data){
                resolve({status:200, message:"Successfully Deleted"});
            }).catch(function(err){
                reject({status:404, message: "No Technology Found"});
            })
        })
    }
};
module.exports = new Controller();