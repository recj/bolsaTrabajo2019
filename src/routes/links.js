const express = require('express');
const router = express.Router();

const fs = require('fs');
const fileUpload = require('express-fileupload');


const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isLoggedInC, isLoggedInO, isLoggedInAll } = require('../lib/auth');


//postulantes



router.get("/postulantes", async (req, res) => {
    const postulantes = await pool.query('SELECT * FROM postula ');

    res.render('links/list2', { postulantes });
});


//postulacion
router.get('/postulate/:idpuesto', isLoggedIn, async (req, res) => {
    const { idpuesto } = req.params;
    const links = await pool.query('SELECT * FROM puestolaboral WHERE idpuesto=?', [idpuesto]);

    res.render('links/postulate', { link: links[0] });

});

router.post('/postulate/:idpuesto', isLoggedInC, async (req, res) => {
    const { idpuesto } = req.params;
    const file = req.files.file;
    const tipo = req.files.file.mimetype;


    console.log(idpuesto, req.user.idusuario);

    if (tipo == 'application/pdf' || tipo == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || tipo == 'application/msword') {
        console.log(idpuesto, req.user.idusuario);

        const newCv = {
            file,
            idpuesto: idpuesto,
            idusuario: req.user.idusuario,
            postulante: req.user.fullname
        };
        await pool.query('INSERT INTO postula set ?', [newCv]);
        req.flash('success', 'Postulacion exitosa');
        res.redirect('/links');

    } else {
        req.flash('message', 'Tipo de archivo no soportado');
        res.redirect('/links');

    }



});


/*router.post('/postulate/:idpuesto', isLoggedIn, async (req, res) => {
    const file = req.files.file;
    const tipo= req.files.file.mimetype;
    console.log(tipo);
    console.log(file);
    if (tipo == 'application/pdf' || tipo == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || tipo == 'application/msword' ) {
        console.log('2');
        file.mv(`./src/public/files/${file.name}`,err => {
            if(err) {return res.status(500).send({ message : err })}
                
            else{
                req.flash('success', 'Postulacion exitosa');
                res.redirect('/links');
            
            }
    
            
        });
    } else {
        req.flash('message', 'Tipo de archivo no soportado');
        res.redirect('/links');

    }

});*/


/*router.post('/postulate/:idpuesto', isLoggedIn, async (req, res) => {

    const tmp_path=req.files.file.path;//ruta del archivo
    console.log (tmp_path);
    const tipo=req.files.file.mimetype;//tipo del archivo
    
    if(tipo == 'application/pdf' || tipo == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || tipo == 'application/msword' ){
        //Si es de tipo png jpg o jpeg
        const aleatorio=Math.floor((Math.random()*9999)+1);//Variable aleatoria
        const nombrearchivo=aleatorio+""+req.files.file.name;//nombre del archivo mas variable aleatoria

        var target_path='./src/public/files/'+nombrearchivo;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
        fs.rename(tmp_path,target_path,function (err) {//Escribimos el archivo
            fs.unlink(tmp_path,function (err) {//borramos el archivo tmp
                //damos una respuesta al cliente
                res.send('<p>El archivo se subio correctamente</p></br><img  src="./uploads/'+nombrearchivo+'"/>');
            });
        });

    }else{
        res.send('Tipo de archivo no soportado');
    }

});

*/

//busquedas
router.post("/search", async (req, res) => {
    const categorias = req.body.categoria;
    const ciudades = req.body.ciudad;
    const contrato = req.body.contrato;


    const categoria = await pool.query('SELECT * FROM categoria');
    const ciudad = await pool.query('SELECT * FROM ciudad');

    //const links = await pool.query('SELECT * FROM puestolaboral');

   /* if (categorias == "Cualquier categoria") {

        try {
            links = await pool.query('SELECT * FROM puestolaboral');
            console.log(links);
    
        }
        catch (err) {
            console.log(err)
        }
    } else {

        try {
             links = await pool.query('SELECT * FROM puestolaboral WHERE categoria=? ',[categorias]);
             console.log(links);
    
        }
        catch (err) {
            console.log(err)
        }
    }*/
    /*if ( await categorias ==="Cualquier categoria") {
        if (await contrato === "Cualquier contrato") {
            if (await ciudades==="Cualquier ciudad") {
                links = await pool.query('SELECT * FROM puestolaboral');
            } else {
                links = await pool.query('SELECT * FROM puestolaboral WHERE ubicacion=?',[ciudades]);
            }
        } else {
            if (await ciudades==="Cualquier ciudad") {
                 links = await pool.query('SELECT * FROM puestolaboral WHERE tipocontrato=?',[contrato]);
            } else {
                 links = await pool.query('SELECT * FROM puestolaboral WHERE tipocontrato=? AND ubicacion=? ',[contrato,ciudades]);
            }
        }
    } else {
        if (await contrato === "Cualquier contrato") {
            if (await ciudades==="Cualquier ciudad") {
                 links = await pool.query('SELECT * FROM puestolaboral WHERE categoria=?',[categorias]);
            } else {
                 links = await pool.query('SELECT * FROM puestolaboral WHERE categoria=? AND ubicacion=?',[categorias,ciudades]);
            }
        } else {
            if (await ciudades==="Cualquier ciudad") {
                 links = await pool.query('SELECT * FROM puestolaboral WHERE categoria=? AND tipocontrato=?',[categorias,contrato]);
            } else {
                 links = await pool.query('SELECT * FROM puestolaboral WHERE categoria=? AND tipocontrato=? AND ubicacion=? ',[categorias,contrato,ciudades]);
            }
        }
    }*/


    const links = await pool.query('SELECT * FROM puestolaboral WHERE categoria=? AND ubicacion=? AND tipocontrato=?', [categorias, ciudades, contrato]);
    console.log(ciudad, contrato);
    res.render('links/search', { links, categoria, ciudad });
});

router.get("/search", isLoggedIn, async (req, res) => {

    const categoria = await pool.query('SELECT * FROM categoria');

    const ciudad = await pool.query('SELECT * FROM ciudad');



    res.render('links/search', { categoria, ciudad });



});

//busqueda de empleados

router.post("/search2", async (req, res) => {
    const categorias = req.body.categoria;
    const ciudades = req.body.ciudad;
    const contrato = req.body.contrato;


    //if (ciudades=='Cualquier Ciudad') {
    //   console.log('nadaa');
    //}

    const categoria = await pool.query('SELECT * FROM categoria');

    const ciudad = await pool.query('SELECT * FROM ciudad');



    const links = await pool.query('SELECT * FROM candidato WHERE categoria=? AND direccion=? AND nivelEstudios=? ', [categorias, ciudades, contrato]);
    //const links = await pool.query(`SELECT * FROM candidato WHERE categoria=${categorias} and direccion=${ciudades} and nivelEstudios=${contrato}`);
    console.log(links);
    res.render('links/search2', { links, categoria, ciudad });
});

router.get("/search2", isLoggedIn, async (req, res) => {

    const categoria = await pool.query('SELECT * FROM categoria');

    const ciudad = await pool.query('SELECT * FROM ciudad');



    res.render('links/search2', { categoria, ciudad });



});



//router.get('/add', isLoggedIn, (req, res) => {
//    res.render('links/add');
//});



//variante 


router.get('/add', isLoggedInO, async (req, res) => {
    const categoria = await pool.query('SELECT * FROM categoria');
    const ciudad = await pool.query('SELECT * FROM ciudad');



    res.render('links/add', { categoria, ciudad });
});


/*router.get('/add', async (req, res) => {
    console.log( await isLoggedInAll);
    if (isLoggedInAll==2) {
        res.render('links/add');    
    } else {
        req.flash('mesagge', 'Usuario no valido para la operacion');
        res.redirect('/');
    }
    
});*/

router.post('/add', isLoggedInO, async (req, res) => {
    const { titulo, ubicacion, categoria, tipojornada, tipoperiodo, tipocontrato, salario, descripcion, experiencia, telefono, fechapresentacion } = req.body;
    const newJob = {
        titulo,
        ubicacion,
        categoria,
        tipojornada,
        tipoperiodo,
        tipocontrato,
        salario,
        descripcion,
        experiencia,
        telefono,
        fechapresentacion,
        idusuarioempresa: req.user.idusuario,
        fullname: req.user.fullname
    };
    console.log(newJob);
    console.log(req.user.id);

    await pool.query('INSERT INTO puestolaboral set ?', [newJob]);
    req.flash('success', 'Job saved successfully');

    res.redirect("/links");

});

/*router.get("/", isLoggedIn, async (req, res) => {
    const links = await pool.query('SELECT * FROM puestolaboral WHERE idusuarioempresa= ?', [req.user.idusuario]);
    
    res.render('links/list', { links });
});*/


router.get("/", async (req, res) => {
    const links = await pool.query('SELECT * FROM puestolaboral ORDER BY idpuesto DESC');

    res.render('links/list', { links });
});

router.get('/delete/:idpuesto', isLoggedInO, async (req, res) => {
    const { idpuesto } = req.params;
    await pool.query('DELETE FROM puestolaboral WHERE idpuesto = ?', [idpuesto]);
    req.flash('success', 'Jobs Removed successfully');
    res.redirect('/links');
});

router.get('/edit/:idpuesto', isLoggedInO, async (req, res) => {
    const { idpuesto } = req.params;
    const links = await pool.query('SELECT * FROM puestolaboral WHERE idpuesto=?', [idpuesto]);
    const categoria = await pool.query('SELECT * FROM categoria');

    res.render('links/edit', { link: links[0], categoria });

});

router.post('/edit/:idpuesto', isLoggedInO, async (req, res) => {
    const { idpuesto } = req.params;
    const { titulo, ubicacion, tipojornada, tipoperiodo, tipocontrato, salario, descripcion, experiencia, telefono } = req.body;
    const newLink = {
        titulo,
        ubicacion,
        tipojornada,
        tipoperiodo,
        tipocontrato,
        salario,
        descripcion,
        experiencia,
        telefono

    };

    console.log(newLink);
    await pool.query('UPDATE puestolaboral set ? WHERE idpuesto = ?', [newLink, idpuesto]);
    req.flash('success', 'Links Updated Successfully');
    res.redirect('/links');
});

module.exports = router;

