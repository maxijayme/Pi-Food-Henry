import {GET_RECIPES, GET_DIETS, FILTER_BY_DIET, FILTER_BY_SOURCE, ORDER_BY_NAME, ORDER_BY_SCORE, GET_RECIPE_NAME, GET_RECIPE_ID, CREATE_RECIPE} from '../actions/actionTypes.js'


const initialState = {
    recipes : [],
    recipesOriginal: [],
    recipeDetails : {},
    diets:[],
}

function rootReducer( state = initialState, action ){
    switch(action.type){
        case GET_RECIPES:{
            return{
                ...state,
                recipesOriginal: action.payload,
                recipes: action.payload
            }
        }
        case GET_DIETS:
          return {
            ...state,
            diets: action.payload
        }
        case FILTER_BY_DIET:{
            const allRecipes = state.recipesOriginal;
            const statusFilter= action.payload === 'All' ? allRecipes : allRecipes.filter(recipe => recipe.diets.find(element => element.name === action.payload || element === action.payload) || recipe[action.payload] === true)
            return{
                ...state,
                recipes: statusFilter
            }
        }
        case GET_RECIPE_ID:{
            return{
                ...state,
                recipeDetails: action.payload
            }
        }
        case GET_RECIPE_NAME:{
            return{
                ...state,
                recipes: action.payload
            }
        }
        case CREATE_RECIPE:{
            return {
                ...state
            }
        }        
        case FILTER_BY_SOURCE:{
            const allRecipesSource = state.recipesOriginal;
            const sourceFilter = action.payload === 'Db'? allRecipesSource.filter(recipe => recipe.createdInDb) : allRecipesSource.filter(recipe => !recipe.createdInDb)
            return{
                ...state,
                recipes: action.payload === 'All'? allRecipesSource : sourceFilter
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
            const recipeSortedScore = action.payload === 'Hig' ?
            allRecipesSorded.sort((a,b)=>a.healthScore-b.healthScore):          
            allRecipesSorded.sort((a,b)=>b.healthScore-a.healthScore);
            return {
              ...state,
              recipes: recipeSortedScore
            }
        }
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;