const {Router} = require('express');
const { Diet } = require('../db');
const {dietsTypes} = require('../controllers/dietsTypes.js')

const router = Router();

router.get('/', async (req, res, next) => {
    
    try {
       dietsTypes.forEach(type => {
            Diet.findOrCreate({
                where: { name: type}
            })
        });
        res.send(dietsTypes)
    } catch (error) {
        next(error)
    }
})


module.exports = router;