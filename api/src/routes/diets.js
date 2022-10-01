const {Router} = require('express');
const { Diet } = require('../db');

const router = Router();

router.get('/', async (req,res)=>{
    const dietsTypes = ['gluten free',
    'ketogenic',
    'vegetarian',
    'lacto vegetarian',
    'ovo vegetarian',
    'vegan',
    'pescatarian',
    'paleo',
    'primal',
    'low foodmap',
    'whole 30',]
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