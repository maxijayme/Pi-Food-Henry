import * as actions  from '../../actions/index.js';
import * as ReactRedux from 'react-redux'
import React from "react";

const RecipeDetails = (props) => {

    let dispatch = ReactRedux.useDispatch()
    let recipeId = props.match.params.id;
    const recipe = ReactRedux.useSelector(state => state.recipeDetails);

    React.useEffect(()=>{
        dispatch(actions.getRecipeByID(recipeId))
    },
    [dispatch,recipeId])
  return (
    
    <div>
      {recipe.name}
      <img src={recipe.image} alt={recipe.name} />
      {recipe.diets}
      {recipe.dishTypes}
      {recipe.summary}
      {recipe.healthScore}
      {recipe.analyzedInstructions}
    </div>
  );
};

export default RecipeDetails;