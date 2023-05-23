
const pool = require('../database');
module.exports = {
   
    isLoggedIn(req,res,next){
        if (req.isAuthenticated()) {
            console.log('logeadoo el usuario: ',req.user.fullname);
            console.log('logeadoo el usuario: ',req.user.idusuario);
                        
            return next();
        }
        return res.redirect('/signin');
    },

    isNotLoggedIn(req,res,next){
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/profile');

    },

    async isLoggedInC(req,res,next){
        if (req.isAuthenticated()) {
            console.log('logeadoo el Candidato: ',req.user.fullname);
            const tabla= await pool.query('SELECT count(*) FROM candidato WHERE idusuario=?', [req.user.idusuario]);
            console.log(tabla.length);
            if (tabla.length>0  ) {
                console.log('logeadoo el Candidato: ',req.user.fullname);
            
                return next();    
            } else {
                return res.redirect('/signin');
                 
            }   
            
        }
        return res.redirect('/signin');
    },

    


   async isLoggedInO(req,res,next){
        if (req.isAuthenticated()) {
            console.log('logeadoo la organizaciooon: ',req.user.fullname);
            const tabla= await pool.query('SELECT * FROM organizacion WHERE idusuario=?', [req.user.idusuario]);
            console.log(tabla.length);
            if (tabla.length > 0 ) {
                return next();    
            } else {
                return res.redirect('/');
                 
            }   
            
        }
        return res.redirect('/signin');
    },

    
    async isLoggedInAll(req,res,next){
        if (req.isAuthenticated()) {
            console.log('logeado el usuario: ',req.user.fullname);
            
            const tabla= await pool.query('SELECT FROM candidato WHERE idusuario=?', [req.user.idusuario]);
            console.log(tabla);
            if (tabla>0  ) {
                return 1;    
            } else {
                
                tabla2= await pool.query('SELECT FROM organizacion WHERE idusuario=?', [req.user.idusuario]);
                if (tabla2>0  ) {
                    return 2;    
                }    

            }   
            
        }
        return res.redirect('/signin');
    },
};