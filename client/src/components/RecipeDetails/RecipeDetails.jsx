import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeByID, clearDetail } from '../../actions/index';
import { useHistory } from 'react-router-dom'
import NavBar from '../NavBar/NavBar.jsx'
import './recipeDetails.css'

export default function RecipeDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const history = useHistory();
    
    // useEffect(()=>{
    //     dispatch(clearDetail())
    // })
    
    useEffect(() => {
        
        dispatch(getRecipeByID(id))
    }, [dispatch, id]);
    
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(clearDetail())
        history.goBack();
     }    

    let recipeDetails = useSelector(state => state.recipeDetails);
    
    return ( 
        <div className="details-container-d" key={id}>            
            <NavBar/> 
            <div className='details-d'>  
                <div className='card-cont-d'> 
                <button className="backButton-d" onClick={e => handleClick(e)}>Go back to recipes</button>
                    <div className='card-d'> 
                        <div className='head-card-d'>
                            <div className="recipeHealthScore-d">
                                <h2 className="hs-text-d">{recipeDetails.healthScore}</h2>
                                <p className="hs-text-d">Health Score</p>
                            </div>  
                            <div className='name-container-d'>           
                            <h1 className="recipeName-d">{recipeDetails.name}</h1>
                        </div>  
                        </div>
                        <div className="image-diet-d">
                            <div className="recipeImg-container-d">
                                <img className="recipeImg-d" 
                                src={recipeDetails.image ? 
                                recipeDetails.image : 
                                ''} alt="Pic not found"/>
                            </div>
                        </div>
                        <div className='items-details-container'>
                            <div className="items-container-d">
                                <div className="time-d">
                                    <h5>Cooking time</h5>
                                        <div className="line-time-d"></div>
                                    <h5 className="recipeReadyInMinutes-d">{recipeDetails.readyInMinutes}</h5>
                                </div>
                                <div className="servings-d">
                                    <h5>Servings</h5>
                                        <div className="line-servings-d"></div>
                                    <h5 className="recipeServings-d">{recipeDetails.servings}</h5>
                                </div>
                                <div className="wwsp-d">
                                    <h5>Weight Watchers Points</h5>
                                        <div className="line-wwsp-d"></div>
                                    <h5 className="recipeWeightWatcherSmartPoints-d">{recipeDetails.weightWatcherSmartPoints}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className='rest-details-d'>       
                    <div className="summary-container-d">
                        <h1 className="texts-summary-d">Summary</h1>
                        <p className="summary-d">{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
                    </div>
                    
                    <div className="steps-container-d">
                        <div className="steps-d">{recipeDetails.steps ?
                            Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(e => {
                            return(
                                <p key={e.number} className="steps">
                                    <strong>Step {e.number}</strong> - {e.step}
                                </p>
                                )
                            }) :
                            <p>{recipeDetails.steps}</p> : <p className='none-steps'>No steps</p>
                        }
                        </div>
                        <h3 className="texts-steps-d">Steps </h3>
                    </div>
                    <div className="diets-container-d">
                        <h2 className="texts-diets-d">Diet Types</h2> 
                        <div className='diets-list-container'>
                            {recipeDetails.diets? 
                            recipeDetails.diets.map(e => {
                                if(e.hasOwnProperty('name')){
                                return(
                                    <h2 className="diets-d" key={e.name}>{e.name}</h2>
                                )}else{
                                return(
                                    <h2 className="diets-d" key={e}>{e}</h2>
                                )}
                            }):null}
                        </div>
                    </div>

                    {recipeDetails.dishTypes ?
                    <div className="dishes-container-d">
                        <h2 className="texts-dish-d">Dish Type</h2>
                        <div className='dish-list-container'>
                            {Array.isArray(recipeDetails.dishTypes)? recipeDetails.dishTypes.map(e => {
                                return(
                                    <h2 className="dishes-d" key={e}>{e}</h2>
                                )
                            }): <h2 className='dishes-d'>{recipeDetails.dishTypes}</h2>}
                        </div> 
                    </div> :
                    null
                    }

                    
                </div> 
            </div>
        </div>

    )      
        
}