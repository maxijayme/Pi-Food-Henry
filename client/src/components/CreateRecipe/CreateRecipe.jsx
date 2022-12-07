import React from "react";
import { useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { useHistory } from "react-router-dom";
import { getDiets, postRecipe } from '../../actions/index'
import NavBar from '../NavBar/NavBar.jsx'
import './CreateRecipe.css'

export default function  CreateRecipe(){

    const dispatch = useDispatch();
    const diets = useSelector((state)=>state.diets)
    const response = useSelector((state)=>state.error)
    const history = useHistory()
    const [errors, setErrors] = useState({});
    


    useEffect(()=>{
        dispatch(getDiets()) 
    },[dispatch])
   
    useEffect(()=>{
        console.log(response)
    },[response])
    
    const[input, setInput] = useState({
        name:"",
        summary:"",
        healthScore: "1",
        image: "",
        diets: [],
        steps: "",
        readyInMinutes:"0",
        servings:"0",
        weightWatcherSmartPoints:"0"
    })


    function  handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(input))
        setInput({
            name:"",
            summary:"",
            healthScore: "1",
            image: "",
            diets: [],
            steps: "",
            readyInMinutes:"0",
            servings:"0",
            weightWatcherSmartPoints:"0"
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
        <div className="create">
            <NavBar/>
            <div className="create-body">
                <h1 className="tittle-create">Create recipe</h1>
                <form onSubmit={e => handleSubmit(e)} className='form-cont'>
                    <div className="to-complete">
                        <div className="name-form">
                            <label className="name-label">Name</label>
                            <input 
                                className={(errors.name && 'danger') || 'name-input'} 
                                type="text" 
                                value={input.name} 
                                name="name" 
                                onChange={e=>handleChange(e)}
                            />
                            {errors.name && (
                                <p className="danger">{errors.name}</p>
                            )}
                        </div>
                        <div  className="summary-form">
                            <label className="summary-label">Summary</label>
                            <input 
                                className={(errors.summary && 'danger') || 'summary-input'}
                                type="text" 
                                value={input.summary} 
                                name="summary" 
                                onChange={e=>handleChange(e)} 
                            />
                            {errors.summary && (
                                <p className="danger">{errors.summary}</p>
                            )}
                        </div>
                        <div className="img-form">
                            <label className="img-label">Image</label>
                            <input 
                                className="img-input"
                                placeholder="Find an image on the web"
                                type="text"
                                name="image"
                                value={input.image}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="score-form">
                            <label className="score-label">Healthy Score</label>
                            <input
                                className={(errors.healthScore && 'danger') || 'score-input'}
                                type="range"
                                min="0"
                                max="100"
                                step="1"
                                name="healthScore"
                                value={input.healthScore}
                                onChange={e => handleChange(e)}
                            />
                            <h4 className="score-number" >{input.healthScore}</h4>
                        </div>
                        <div className="minutes-form">
                            <label className="minutes-label">Ready in Minutes: </label>
                            <input
                            className={(errors.readyInMinutes && 'danger') || 'minutes-input'}
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
                        <div className="servings-form">
                            <label className="servings-label">Servings: </label>
                            <input
                            className={(errors.servings && 'danger') || 'servings-input'}
                            name="servings"
                            type="number"
                            min="0"
                            max="999"
                            maxlength="4"
                            value={input.servings}
                            placeholder="Servings"
                            onChange={(e) => handleChange(e)}
                            />
                            {errors.servings && (
                                <p className="danger">{errors.servings}</p>
                            )}
                        </div>
                        <div className="wwsp-form">
                            <label className="wwsp-label">Weight Watcher SmartPoints: </label>
                            <input
                            className={(errors.weightWatcherSmartPoints && 'danger') || 'wwsp-input'}
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
                        <div className="diets-form">
                            <label className="diets-label">Diets </label>
                            <select className="diets-input" name="diets" onChange={e =>handleSelect(e)}>
                                <option name='-Select one-' disabled selected> Choose recipe diet type</option>
                                {diets.map((diet) => (
                                <option key={diet} value={diet} onChange={e =>handleSelect(e)}>
                                    {diet[0].toUpperCase() + diet.substring(1)}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="select-option">
                                {input.diets.map((d) => (
                                    <div key={d} className="div-delete">
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDietDelete(d)}
                                            >
                                            X
                                        </button>
                                        <p className="text-delete">{d[0].toUpperCase() + d.substring(1)}</p>
                                    </div>
                                ))}
                            </div>
                        <div className="steps-form">
                            <label className="steps-label">Steps </label>
                            <textarea
                                className={(errors.steps && 'danger') || 'steps-input' }
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
                    </div>
                    <div className="btns">      
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
                    </div>  
                </form>
            </div>
        </div>
    )
    
}