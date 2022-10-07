import React from "react";

export default function Card ({name, image, diets}){
    return(
        <div>
            <h3>{name}</h3>
            <img src={image} alt={name}/>
            <div>
                <h2>diets=</h2>{diets?.map(diet => <> {diet}, </> )}
            </div>
        </div>
    )
}