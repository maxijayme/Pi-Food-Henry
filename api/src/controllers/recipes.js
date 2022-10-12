const { Recipe, Diet} = require("../db");
const { APIKEY, SPOON_URL } = process.env;
const axios = require('axios');

//Con esta funcion obtengo todas las recetas desde la api
// const getApiRecipes = async () => {
const getApiRecipes = () => {
    
    try{                               
        // const apiUrl =  await axios.get(`${SPOON_URL}/recipes/complexSearch?apiKey=${APIKEY}&addRecipeInformation=true&number=100`);
      
        
        // const apiRecipes = await apiUrl.data.results.map(e => {
  
        
         const apiRecipes =  [{
                id: 1,
                vegetarian: true,
                vegan:false,
                glutenFree: false,
                name: 'cositas ricas',
                summary: 'mucho texto',
                score: 76,
                healthScore: 86,
                image: "https://spoonacular.com/recipeImages/715497-312x231.jpg",
                weightWatcherSmartPoints: 14,
                readyInMinutes: 45,
                servings: 6,
                dishTypes: [
                    "morning meal",
                    "brunch",
                    "breakfast"
                    ],
                diets: [
                    "lacto ovo vegetarian"
                    ],
                steps: [
                    {
                    "number": 1,
                    "step": "Take some yogurt in your favorite flavor and add 1 container to your blender.",
                    "ingredients": [
                    {
                    "id": 1116,
                    "name": "yogurt",
                    "localizedName": "yogurt",
                    "image": "plain-yogurt.jpg"
                    }
                    ],
                    "equipment": [
                    {
                    "id": 404726,
                    "name": "blender",
                    "localizedName": "blender",
                    "image": "blender.png"
                    }
                    ]
                    },
                    {
                    "number": 2,
                    "step": "Add in the berries, banana, and soy milk and blend. Top your glass with a few graham cracker crumbs and serve.",
                    "ingredients": [
                    {
                    "id": 10018617,
                    "name": "graham cracker crumbs",
                    "localizedName": "graham cracker crumbs",
                    "image": "graham-crackers.jpg"
                    },
                    {
                    "id": 16223,
                    "name": "soymilk",
                    "localizedName": "soymilk",
                    "image": "soy-milk.jpg"
                    },
                    {
                    "id": 1009054,
                    "name": "berries",
                    "localizedName": "berries",
                    "image": "berries-mixed.jpg"
                    },
                    {
                    "id": 9040,
                    "name": "banana",
                    "localizedName": "banana",
                    "image": "bananas.jpg"
                    }
                    ],
                    "equipment": []
                    }
                    ]
            }]
        //     return {
        //         id: e.id,
        //         vegetarian: e.vegetarian,
        //         vegan: e.vegan,
        //         glutenFree: e.glutenFree,
        //         name: e.title,
        //         summary: e.summary,
        //         score: e.spoonacularScore,
        //         healthScore: e.healthScore,
        //         image: e.image,
        //         readyInMinutes: e.readyInMinutes,
        //         weightWatcherSmartPoints: e.weightWatcherSmartPoints,
        //         servings: e.servings,
        //         dishTypes: e.dishTypes?.map(dish => dish),
        //         diets: e.diets?.map(diet => diet),
        //         steps: e.analyzedInstructions[0]?.steps.map(e => {
        //             return {
        //                 number: e.number,
        //                 step: e.step
        //             }
        //         })
        //     }
        // }))
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
    // const apiRecipes = await getApiRecipes();
    const apiRecipes = getApiRecipes();
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
