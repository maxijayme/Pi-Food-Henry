const { Recipe, Diet} = require("../db");
const { APIKEY, SPOON_URL } = process.env;
const axios = require('axios');

//Con esta funcion obtengo todas las recetas desde la api
const getApiRecipes = async () => {

    
    try{                               
        const apiUrl =  await axios.get(`${SPOON_URL}/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);
      
        const apiRecipes = await apiUrl.data.results.map(e => {            
            return {
                id: e.id,
                vegetarian: e.vegetarian,
                vegan: e.vegan,
                glutenFree: e.glutenFree,
                name: e.title,
                summary: e.summary,
                score: e.spoonacularScore,
                healthScore: e.healthScore,
                image: e.image,
                readyInMinutes: e.readyInMinutes,
                weightWatcherSmartPoints: e.weightWatcherSmartPoints,
                servings: e.servings,
                dishTypes: e.dishTypes?.map(dish => dish),
                diets: e.diets?.map(diet => diet),
                steps: e.analyzedInstructions[0]?.steps.map(e => {
                    return {
                        number: e.number,
                        step: e.step
                    }
                })
            }
        })
        return apiRecipes;
    }
    catch(e){
        console.log(e);
        return[];
    }
};

//con esta funcion obtengo todas las recetas desde la DB
//incluyendo las dietas asociadas

const getDbRecipes = async () => {
return await Recipe.findAll({
    include: [
        {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes:[],
            }
        },    

    ]
});
}


//Obtengo todas las recetas, concatenando las de la api con las de la DB

const getAllRecipes = async() => {
    const apiRecipes = await getApiRecipes();
    const dbRecipes = await getDbRecipes();
    return apiRecipes.concat(dbRecipes);
}

//Obtengo recipe por ID desde la Api

const recipeByIdApi = async(id) => {
    const recipe = await axios.get(`${SPOON_URL}/recipes/${id}/information?apiKey=${APIKEY}`);
    return recipe;
}

//Obtengo recipe por ID desde la DB

const recipeByIbDb = async(id) => {
    const recipe = await Recipe.findByPk(id,{
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }  
    })
    return recipe;
}


module.exports = {
    getApiRecipes,
    getDbRecipes,
    getAllRecipes,
    recipeByIdApi,
    recipeByIbDb
}
