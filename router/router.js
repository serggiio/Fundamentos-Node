const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', {
        user: req.user
    });
});

router.get('/service', (req, res) => {
    res.render('service', {
        title: "EJS templates",
        description: "Descripcion de la pagina"
    });
});


router.post('/test', (req, res) => {
    res.send('respuesta desde expresss');
});

module.exports = router;

