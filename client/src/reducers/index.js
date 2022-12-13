import {CREATE_RECIPE, GET_RECIPES, GET_DIETS, FILTER_RECIPES, ORDER_BY_NAME, ORDER_BY_SCORE, GET_RECIPE_ID, CLEAR_DETAIL} from '../actions/actionTypes.js'

const initialState = {
    recipes : [],
    recipesOriginal: [],
    recipeDetails : {},
    diets:[],
}

function rootReducer( state = initialState, action ){
    switch(action.type){
        case GET_RECIPES:{
            if(state.recipes.length===0){
                return{
                    ...state,
                    recipesOriginal: action.payload,
                    recipes: action.payload
                }
            }
            break;
        }
        case GET_DIETS:
          return {
            ...state,
            diets: action.payload
        }
        case FILTER_RECIPES:{
            let allRecipes = state.recipesOriginal;
            if(action.payload.name){
                allRecipes = allRecipes.filter(e => e.name.toLowerCase().includes(action.payload.name.toString().toLowerCase()));          
            }
            if(action.payload.dietType && allRecipes.length){
                action.payload.dietType === 'All' ? allRecipes = allRecipes : allRecipes = allRecipes.filter(recipe => recipe.diets.find(element => element.name === action.payload.dietType || element === action.payload.dietType) || recipe[action.payload.dietType] === true)
            }
            if(action.payload.source && allRecipes.length){
                action.payload.source === 'Db'? allRecipes = allRecipes.filter(recipe => recipe.createdInDb) : allRecipes = allRecipes.filter(recipe => !recipe.createdInDb)
            }
            return{
                ...state,
                recipes: allRecipes
            }
            
        }
        case GET_RECIPE_ID:{
            return{
                ...state,
                recipeDetails: action.payload
            }
        }
        case CREATE_RECIPE:{
            return {
                ...state
            }
        }        
        case ORDER_BY_NAME:{
            const allRecipesSource = state.recipes;
            const recipeSorted = action.payload === 'Asc' ?
            allRecipesSource.sort(function(a, b) {
            if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            }) :
            allRecipesSource.sort(function(a, b) {              
              if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            });          
            return {
              ...state,
              recipes: recipeSorted
            }
        }
        case ORDER_BY_SCORE:{
            const allRecipesSorded= state.recipes;
            const recipeSortedScore = action.payload === 'Low' ?
            allRecipesSorded.sort((a,b)=>a.healthScore-b.healthScore):          
            allRecipesSorded.sort((a,b)=>b.healthScore-a.healthScore);
            return {
              ...state,
              recipes: recipeSortedScore
            }
        }
        case CLEAR_DETAIL:{
            return{
                ...state,
                recipeDetails: action.payload
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;