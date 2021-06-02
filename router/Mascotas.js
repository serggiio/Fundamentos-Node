const express = require('express');
const router = express.Router();

const Pet = require('../models/mascota');

router.get('/', async (req, res) => {

    try {
        
        const petsArray = await Pet.find();        
        res.render('mascotas', {
            petsArray
        });

    } catch (error) {
        console.log('Error supercontrolado');
        console.log(error);
    }
    
});

router.get('/create', (req, res) => {

    res.render('createPet');
    
});

router.post('/savePet', async(req, res) => {

    const body = req.body;
    console.log(req.body);
    
    try {
        const petDB = new Pet(body); 
        await petDB.save();

        const petsArray = await Pet.find();        
        res.render('mascotas', {
            petsArray
        });

    } catch (error) {
        console.log('Erroooooor: ' + error);
    }
    
    
});

router.get('/:id', async (req, res) => {
    
    const id = req.params.id;
    try {
        const petDb = await Pet.findOne({_id: id});
        console.log('Mascota: ' + petDb);
        res.render('editPet', 
            {
                pet: petDb,
                error: false
            }
        );
    } catch (error) {
        console.log('Erroooooor: ' + error);
        res.render('editPet', 
            {
                error: true,
                message: 'No existe'
            }
        );
    }  
});

router.delete('/delete/:id', async(req, res) => {

    const id = req.params.id;

    const petDb = await Pet.findByIdAndDelete({_id: id});

    if(petDb){
        res.json({
            status: true,
            message: 'Deleted'
        });
    }else{
        res.json({
            status: false,
            message: 'operation failed'
        });
    }

    
    res.render('createPet');
    
});

router.put('/edit/:id', async(req, res) => {

    const id = req.params.id;
    const body = req.body;    
    
    try {
        const petDb = await Pet.findByIdAndUpdate(id, body, { useFindAndModify: false});
        console.log(petDb);

        res.json({
            status: true,
            message: 'Edited'
        });

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: 'Edited'
        });
    }

    //res.render('createPet');
    
});

module.exports = router;