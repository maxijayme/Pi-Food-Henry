import { GET_RECIPES, GET_RECIPE_ID, FILTER_BY_TYPE, FILTER_BY_SOURCE, ORDER_BY_NAME } from "../actions";

const initialState = {
    recipes : [],
    recipeDetails : [],
    recipesCopy: []
}

 export default function rootReducer( state = initialState, action ){
    switch(action.type){
        case GET_RECIPES:{
            return{
                ...state,
                recipes: action.payload,
                recipesCopy: action.payload
            }
        }
        case GET_RECIPE_ID:{
            return{
                ...state,
                recipeDetails: action.payload
            }
        }
        case FILTER_BY_TYPE:{
            const allRecipes = state.recipes;
            const statusFilter= action.payload === 'All' ? allRecipes : allRecipes.filter(recipe => recipe.diet === action.payload)
            return{
                ...state,
                recipesCopy: statusFilter
            }
        }
        case FILTER_BY_SOURCE:{
            const allRecipesSource = state.recipes;
            const sourceFilter = action.payload === 'Db'? allRecipesSource.filter(recipe => recipe.createdInDb) : allRecipesSource.filter(recipe => !recipe.createdInDb)
            return{
                ...state,
                recipesCopy: action.payload === 'All'? allRecipesSource : sourceFilter
            }
        }
        case ORDER_BY_NAME:{
            const allRecipesSource = state.recipes;
            const recipeSorted = action.payload === 'Asc' ?
            allRecipesSource.sort(function(a, b) {
              if(a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            }) :
            allRecipesSource.sort(function(a, b) {
              if(a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              if(a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              return 0;
            });          
            return {
              ...state,
              recipes: recipeSorted
            }
        }
        default:
            return {
                ...state
            }
    }
}