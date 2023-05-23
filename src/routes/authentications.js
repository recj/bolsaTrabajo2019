const express= require('express');
const router = express.Router();
const passport= require('passport');
const {isLoggedIn,isNotLoggedIn} = require('../lib/auth');

router.get('/register',isNotLoggedIn,(req,res)=>{
 res.render('auth/register');
});

/*router.post('/signup',(req,res)=>{
    
    passport.authenticate('local.signup',{
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    });
    res.send('received');
});*/ 


router.post('/signup',isNotLoggedIn,passport.authenticate('local.signup',{
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
})); 
router.post('/signup2',isNotLoggedIn,passport.authenticate('local.signup2',{
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
})); 
router.post('/signup3',isNotLoggedIn,passport.authenticate('local.signup3',{
    successRedirect: '/profile',
    failureRedirect: '/register',
    failureFlash: true
})); 

router.post('/signin',isNotLoggedIn ,(req,res,next)=>{
    passport.authenticate('local.signin',{
    successRedirect:'/profile',
    failureRedirect: '/signin',
    failureFlash: true
    })(req,res,next);    
});
router.get('/signin',isNotLoggedIn,(req,res)=>{
    res.render('auth/signin');
});

router.get('/profile',isLoggedIn , (req,res)=>{
    res.render('profile');
});

router.get('/logout', isLoggedIn,(req,res)=>{
    req.logOut();
    res.redirect('/signin');
});

module.exports=router;
