import React from "react";
import './card.css'

export default function Card ({name, image, diets, healthScore, readyInMinutes, servings, weightWatcherSmartPoints}){
    return(
        <div className="recipe">
            <div className="head-card">
                <div className="recipeHealthScore">
                    <h5 >{healthScore}</h5>
                    <p className="hs-text">Health Score</p>
                </div>
                <div className="name-container">
                    <h3 className="recipeName">{name}</h3>
                </div>
            </div>
            <div className="image-diet">
                <div className="recipeImg-container">
                    <img className="recipeImg" src={image} alt={name}/>
                </div>
                <div className="dietCointainer">
                    {diets?.map(e => <h5 className="diets" key={e}>{e}</h5>)}            
                </div>
            </div>
            <div className="items-container">
                <div className="time">
                    <h5>Cooking time</h5>
                    <div className="line-time"></div>
                    <h5 className="recipeReadyInMinutes">{readyInMinutes}</h5>
                </div>
                <div className="servings">
                    <h5>Servings</h5>
                    <div className="line-servings"></div>
                    <h5 className="recipeServings">{servings}</h5>
                </div>
                <div className="wwsp">
                    <h5>Weight Watchers Points</h5>
                    <div className="line-wwsp"></div>
                    <h5 className="recipeWeightWatcherSmartPoints">{weightWatcherSmartPoints}</h5>
                </div>
            </div>
        </div>
    )
}
