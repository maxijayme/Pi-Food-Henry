const {Router} = require('express');
const {Recipe, Diet} = require('../db.js')
const {getAllRecipes, recipeByIbApi, recipeByIbDb} = require('../controllers/recipes.js');

const router = Router();

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

//Obtengo receta por id, junto a su dieta asociada
router.get('/:id', async(req,res,next)=>{
    try{
        let recipe;
        const {id} = req.params;
        if(typeof(id)!=="number"){
            recipe = await recipeByIbDb(id)
            if(recipe.length>0) res.status(200).json(recipe);
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

//Creo una receta donde name y summary son obligatorios
//si se le pasa dieta se le agrega a la receta.

router.post('/', async(req,res,next) =>{
    const{ name,
        summary,
        score,
        healthScore,
        image,
        steps,
        dietname} = req.body;
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
                steps}
                );
            if(dietname) { 
                const diets = await Diet.findAll({ 
                    where: {name: dietname}
                })
                await recipe.addDiet(diets)
            }
            res.status(201).send('Recipe successfully created');
        }
        catch(e){
            next(e);
        }
    }
});

module.exports = router;