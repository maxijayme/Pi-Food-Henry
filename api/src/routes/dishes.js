const {Router} = require('express');
const { Dish } = require('../db');
const {dishes} = require('../controllers/dishes.js')

const router = Router();

router.get('/', async (req,res)=>{
    try{ 
        let dish = await Promise.all(dishes.map(type => {
            return Dish.findOrCreate(
                {
                  where: {name: type}
                })
            }))
        res.status(200).json(dish.flat());
    } catch (error){
        res.status(400).send(error);
    }
})

module.exports = router;