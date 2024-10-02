var express = require('express');
var router = express.Router();
const userModel=require('./users');
const passport=require('passport');
const localStrategy=require('passport-local');
const { deleteModel } = require('mongoose');
passport.use(new localStrategy(userModel.authenticate()));

//profile route()
router.get('/profile',isLoggedIn,(req,res)=>{
  res.render('profile');
 });

//404
router.get('/error',(req,res)=>{
  res.render('error');
})
//register route
router.post('/register',(req,res)=>{
  var userdata=new userModel({
   username:req.body.username,
   email:req.body.email
  });

userModel.register(userdata,req.body.password)
  .then(function(registereduser){
    passport.authenticate('local')(req,res,function(){
      res.redirect('/profile');
    })
  })

});

//login route
router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/error'
  }),(req,res)=>{});

//logout route
router.get('/logout',(req,res,next)=>{
  req.logout((err)=>{
  if(err){return next(err);}
  res.redirect('/');
  });
});

//protection middleware
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
 
//data update
router.post('/update',async(req,res)=>{
  const currEmail=req.body.currEmail;
  const cngEmail=req.body.cngEmail;
  await userModel.updateOne({email:currEmail},{$set:{email:cngEmail}});
  res.redirect('/');
});

//data delete
router.post('/delete',async(req,res)=>{
  const deluser=req.body.username;
  await userModel.findOneAndDelete({username:deluser})
  res.redirect('/');
})
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
