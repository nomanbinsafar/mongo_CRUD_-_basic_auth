const mongoose=require('mongoose');
const plm=require('passport-local-mongoose');
//connectiong mongoDB+creation of databse
mongoose.connect('mongodb://127.0.0.1:27017/nexAssignment');


const userSchema=mongoose.Schema({
 username:String,
 password:String,
 email:String
});
userSchema.plugin(plm);

module.exports=mongoose.model('user',userSchema);
