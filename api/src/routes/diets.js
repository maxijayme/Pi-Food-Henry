const {Router} = require('express');
const { Diet } = require('../db');
const {dietsTypes} = require('../controllers/dietsTypes.js')

const router = Router();

router.get('/', async (req,res)=>{
    try{ 
        let diets = await Promise.all(dietsTypes.map(type => {
            return Diet.findOrCreate(
                {
                  where: {name: type}
                })
            }))
        res.status(200).json(diets.flat());
    } catch (error){
        res.status(400).send(error);
    }
})

module.exports = router;