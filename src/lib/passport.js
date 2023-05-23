const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField :'username',
    passwordField: 'password',
    passReqToCallback: true
},async(req, username,password,done)=>{
    console.log(req.body);
   const rows= await pool.query('SELECT * FROM usuario WHERE username = ? ', [username]);
    if (rows.length>0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            done(null,user, req.flash('success','Welcome '+user.username));
        }else{
            done(null,false, req.flash("message","Incorrect Password"));
        }
    }else{
        return done(null,false,req.flash("message",'The username does not exist'));
    }
}));


passport.use('local.signup',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async(req,username,password,done)=>{
    const{fullname,email,telefono}=req.body;
    const newUser={
        username,
        password,
        fullname,
        email,
        telefono
    };
    
    newUser.password = await helpers.encryptPassword(password);
    const result= await pool.query('INSERT INTO usuario SET ? ',[newUser]);
    newUser.idusuario = result.insertId;
    console.log(result.insertId);
    console.log(newUser);

    const{fechanac,genero,direccion,nivelEstudios}=req.body;
    const newUser2={
        fechanac,
        genero,
        direccion,
        nivelEstudios
    };
    
    newUser2.idusuario = result.insertId;
    
    console.log(newUser2);
    const result2= await pool.query('INSERT INTO candidato SET ? ',[newUser2]);

    return done(null, newUser);
}));



passport.use('local.signup2',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async(req,username,password,done)=>{
    const{fullname,email,telefono}=req.body;
    const newUser={
        username,
        password,
        fullname,
        email,
        telefono
    };
    
    newUser.password = await helpers.encryptPassword(password);
    const result= await pool.query('INSERT INTO usuario SET ? ',[newUser]);
    newUser.idusuario = result.insertId;
    console.log(result.insertId);
    console.log(newUser);

    const{descripcion,linkwebsite,sectoractividad,direccion}=req.body;
    const newUser2={
        descripcion,
        linkwebsite,
        sectoractividad,
        direccion
    };
    
    newUser2.idusuario = result.insertId;
    
    console.log(newUser2);
    const result2= await pool.query('INSERT INTO organizacion SET ? ',[newUser2]);

    const{nit,linkvideo,fechafundacion}=req.body;
    const newUser3={
        nit,
        linkvideo,
        fechafundacion
    };
    
    newUser3.idusuario = result.insertId;
    
    console.log(newUser3);
    const result3= await pool.query('INSERT INTO empresa SET ? ',[newUser3]);


    return done(null, newUser);
}));


passport.use('local.signup3',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
},async(req,username,password,done)=>{
    const{fullname,email,telefono}=req.body;
    const newUser={
        username,
        password,
        fullname,
        email,
        telefono
    };
    
    newUser.password = await helpers.encryptPassword(password);
    const result= await pool.query('INSERT INTO usuario SET ? ',[newUser]);
    newUser.idusuario = result.insertId;
    console.log(result.insertId);
    console.log(newUser);

    const{descripcion,linkwebsite,sectoractividad,direccion}=req.body;
    const newUser2={
        descripcion,
        linkwebsite,
        sectoractividad,
        direccion
    };
    
    newUser2.idusuario = result.insertId;
    
    console.log(newUser2);
    const result2= await pool.query('INSERT INTO organizacion SET ? ',[newUser2]);

    const{tipoentidad}=req.body;
    const newUser3={
        tipoentidad
    };
    
    newUser3.idusuario = result.insertId;
    
    console.log(newUser3);
    const result3= await pool.query('INSERT INTO entidad SET ? ',[newUser3]);


    return done(null, newUser);
}));





passport.serializeUser((user,done)=>{
    done(null,user.idusuario);
});


passport.deserializeUser(async(id,done)=>{
    const rows = await pool.query('SELECT * FROM usuario Where idusuario = ?', [id]);
    done(null, rows[0]); 
});