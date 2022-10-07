const {Router} = require('express');
const {Recipe, Diet , Dish} = require('../db.js')
const {getAllRecipes, recipeByIbApi, recipeByIbDb} = require('../controllers/recipes.js');

const router = Router();



//Obtengo receta por id, junto a su dieta asociada
//segun tipo id busco en DB o en la api completa
router.get('/:id', async(req,res,next)=>{
    try{
        let recipe;
        const {id} = req.params;
        const regex = /^[0-9]*$/;
        if(!regex.test(id)){  
            recipe = await recipeByIbDb(id)
            console.log(recipe)
            if(recipe) res.status(200).json(recipe);
            else res.status(400).send('Recipe not found');
        }else{
            recipeResponse = recipeByIbApi(id);
            if(recipeResponse.data){
                recipe = {
                    name: recipeResponse.data.title,
                    summary: recipeResponse.data.summary,
                    score: recipeResponse.data.spoonacularScore,
                    healthScore: recipeResponse.data.healthScore,
                    image: recipeResponse.data.image,
                    diets: recipeResponse.data.diets?.map(diet => diet),
                    dishTypes: recipeResponse.data.dishTypes?.map(dish => dish),
                    steps: recipeResponse.data.analyzedInstructions[0]?.steps.map(e => {
                        return {
                            number: e.number,
                            step: e.step
                        }
                    })
                }
                res.status(200).json(recipe);
            }else res.status(400).send('Recipe not found');   
        }   
    }
    catch(e){
        next(e)
    }
});

//si quisiera buscar por id en DB y en API con los datos limitados

// router.get('/:id', async(req,res,next)=>{
//     console.log('hola')
//     try{
//         const id = req.params.id;
//         if(id){
//             const recipes = await getAllRecipes();
//             const recipe = await recipes.filter(r => r.id === id);
//             recipe.length ?
//             res.status(200).json(recipe)
//             : res.status(400).send('Recipe not found')
//         }
//     }
//     catch(e){
//         next(e)
//     }
// })

//Obtengo todas las recetas desde los controllers
//si tengo una query intento obtenerla por name
//caso contrario obtengo todas

router.get('/', async (req,res,next)=>{
    const name = req.query.name;
    try{
         const allRecipes = await getAllRecipes();
         if(name){
             const recipeByName = allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
             recipeByName.length ?
             res.status(200).send(recipeByName)
             : res.status(404).send("We don't have that recipe");
         }else{
             res.status(200).send(allRecipes);
         }
    }
     catch(e){
         next(e)
     };
 });



//Creo una receta donde name y summary son obligatorios
//si se le pasa dieta se le agrega a la receta.

router.post('/', async(req,res,next) =>{
    const{ name,
        summary,
        score,
        healthScore,
        image,
        steps,
        dietname,
        dishTypes} = req.body;
    if (!name) return res.status(400).send({error:'You must enter the name for the recipe'});
    if (!summary) return res.status(400).send({error:'You must enter the summary for the recipe'});
    else{
        try{
            const recipe = await Recipe.create(
                {name,
                summary,
                score,
                healthScore,
                image,
                steps,
                }
                );
            if(dishTypes) { 
                const dishes = await Dish.findAll({ 
                    where: {name: dishTypes}
                })
                var dish = dishes.map(e => e.dataValues.name)
                await recipe.addDish(dish)
            }
            if(dietname) { 
                const diets = await Diet.findAll({ 
                    where: {name: dietname}
                })
                var dieta = diets.map(e => e.dataValues.name)
                await recipe.addDiet(dieta)
            }
            res.status(201).send(recipe);
        }
        catch(e){
            next(e);
        }
    }
});

module.exports = router;