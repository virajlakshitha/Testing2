var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: String,
    password: String,
    email: String
});
const TechDetails = new Schema({
    techName: String,
    details: String,
    postedOn: String,
    iconUrl: String,
    category: String
});
const Comments = new Schema({
    user: String,
    postedDate: String,
    comment: String,
    tech: String
})

mongoose.model('User', User);
mongoose.model('TechDetails', TechDetails);
mongoose.model('Comments', Comments);

// mongoose.connect('mongodb://admin:admin321@ds135537.mlab.com:35537/techpack',{ useNewUrlParser: true }, function(err){
mongoose.connect('mongodb://127.0.0.1:27017/techpack', function(err){
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log('Connected to MongoDB');
});
module.exports = mongoose;
