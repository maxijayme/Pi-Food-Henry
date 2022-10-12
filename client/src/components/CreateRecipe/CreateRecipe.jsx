import React from "react";
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getDiets, postRecipe } from '../../actions/index'


export default function  CreateRecipe(){

    const dispatch = useDispatch();
    const diets = useSelector((state)=>state.diets)
    const history = useHistory()
    const [errors, setErrors] = useState({});
    
    useEffect(()=>{
        dispatch(getDiets()) 
    },[dispatch])
    
    const[input, setInput] = useState({
        name:"",
        summary:"",
        healthScore: "1",
        image: "",
        diets: [],
        steps: "",
        readyInMinutes:"",
        servings:"1",
        weightWatcherSmartPoints:""
    })


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(input))
        console.log(input)
        alert('Recipe was created')
        setInput({
            name:"",
            summary:"",
            healthScore: "1",
            image: "",
            diets: [],
            steps: "",
            readyInMinutes:"",
            servings:"1",
            weightWatcherSmartPoints:""
        })
        history.push('/home')
    }

    const handleSelect = (e) => {
          setInput({
            ...input,
            diets: [...new Set([...input.diets, e.target.value])],
          });
    };

    const handleDietDelete = (el) => {
        setInput({
          ...input,
          diets: input.diets.filter((d) => d !== el),
        });
    };

    
    function validate(input) {
    let errors = {};
        if (input.name){ 
            if (!/[a-zA-Z\s]/.test(input.name)) {
                errors.name = 'Name is invalid';
            }
        }
        if (input.summary){ 
            if (input.summary.length > 140) {
                errors.summary = 'maximum 140 characters';
            }
        }
        if (input.readyInMinutes){ 
            if (input.readyInMinutes > 720) {
                errors.readyInMinutes = 'maximum 720 minutes';
            }
            if (!/^[0-9]+$/.test(input.readyInMinutes)) {
                errors.readyInMinutes = 'Number must be positive';
            }
        }
        if (input.servings){ 
            if (input.servings > 1000) {
                errors.servings = 'maximum 999 servings';
            }
            if (!/^[0-9]+$/.test(input.servings)) {
                errors.servings = 'Number must be positive';
            }
        }
        if (input.weightWatcherSmartPoints){ 
            if (input.weightWatcherSmartPoints > 50) {
                errors.weightWatcherSmartPoints = 'maximum 50 points';
            }
            if (!/^[0-9]+$/.test(input.weightWatcherSmartPoints)) {
                errors.weightWatcherSmartPoints = 'Number must be positive';
            }
        }
        if (input.steps){ 
            if (input.steps.length > 500) {
                errors.steps = 'maximum 500 characters';
            }
        }
    
    return errors;
    };

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });

        setErrors(validate({                 
            ...input,
            [e.target.name]: e.target.value
        }));
        
    }



    return(
        <div>
            <Link to='/home'>
                <button>Return home</button>
            </Link>
            <h1>Create recipe</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Name:</label>
                    <input 
                        className={errors.name && 'danger'}
                        type="text" 
                        value={input.name} 
                        name="name" 
                        onChange={e=>handleChange(e)}
                    />
                    {errors.name && (
                        <p className="danger">{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Summary:</label>
                    <input 
                        className={errors.summary && 'danger'}
                        type="text" 
                        value={input.summary} 
                        name="summary" 
                        onChange={e=>handleChange(e)} 
                    />
                    {errors.summary && (
                        <p className="danger">{errors.summary}</p>
                    )}
                </div>
                <div>
                    <label >Image</label>
                    <input 
                        placeholder="Find an image on the web"
                        type="text"
                        name="image"
                        value={input.image}
                        onChange={e => handleChange(e)}
                    />
                </div>
                <div>
                    <label >0←healthy Score→100</label>
                    <h4 >{input.healthScore}</h4>
                    <br></br>
                    <input
                        className={errors.healthScore && 'danger'}
                        type="range"
                        min="0"
                        max="100"
                        step="1"
                        name="healthScore"
                        value={input.healthScore}
                        onChange={e => handleChange(e)}
                    />
                    {errors.healthScore && (
                        <p className="danger">{errors.healthScore}</p>
                    )}
                </div>
                <div>
                    <label>Ready in Minutes: </label>
                    <input
                    className={errors.readyInMinutes && 'danger'}
                    name="readyInMinutes"
                    type="number"
                    min="0"
                    max="720"
                    value={input.readyInMinutes}
                    placeholder="Ready in...?"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.readyInMinutes && (
                        <p className="danger">{errors.readyInMinutes}</p>
                    )}
                </div>
                <div>
                    <label>Servings: </label>
                    <input
                    className={errors.servings && 'danger'}
                    name="servings"
                    type="number"
                    min="0"
                    max="999"
                    value={input.servings}
                    placeholder="Servings"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.servings && (
                        <p className="danger">{errors.servings}</p>
                    )}
                </div>
                <div>
                    <label>Weight Watcher SmartPoints: </label>
                    <input
                    className={errors.weightWatcherSmartPoints && 'danger'}
                    name="weightWatcherSmartPoints"
                    type="number"
                    min="0"
                    max="50"
                    value={input.weightWatcherSmartPoints}
                    placeholder="Weight Watcher SmartPoints"
                    onChange={(e) => handleChange(e)}
                    />
                    {errors.weightWatcherSmartPoints && (
                        <p className="danger">{errors.weightWatcherSmartPoints}</p>
                    )}
                </div>
                <div className="div-diets-container">
                    <label className="label-main">Diets: </label>
                    <select name="diets" onChange={e =>handleSelect(e)}>
                        {diets.map((diet) => (
                        <option key={diet} value={diet} onChange={e =>handleSelect(e)}>
                            {diet[0].toUpperCase() + diet.substring(1)}
                        </option>
                        ))}
                    </select>
                    <div className="select-option">
                        {input.diets.map((d) => (
                            <div key={d} className="div-delete">
                                <p>{d[0].toUpperCase() + d.substring(1)}</p>
                                <button
                                    className="btn-delete"
                                    onClick={() => handleDietDelete(d)}
                                    >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <label >Steps: </label>
                    <textarea
                        className={errors.steps && 'danger'}
                        name="steps"
                        value={input.steps}
                        type="text"
                        placeholder="Steps of recipe..."
                        onChange={e => handleChange(e)}
                    />
                    {errors.steps && (
                        <p className="danger">{errors.steps}</p>
                    )}
                </div>

                {
                    input.name
                    && input.summary
                    && !errors.readyInMinutes
                    && !errors.weightWatcherSmartPoints
                    && !errors.servings
                    && !errors.steps?
                    (
                        <button className="button-submit">Submit</button>
                    ) : (
                    
                    <button className="btnDisabled" disabled>
                        Submit
                    </button>
                    )
                }

            </form>
        </div>
    )
    
}