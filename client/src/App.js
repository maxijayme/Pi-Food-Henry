import './App.css';
import {  Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import CreateRecipe from './components/CreateRecipe/CreateRecipe'

function App() {
  return (
      <div className="App">
        <Route exact path={'/'} component={LandingPage}/>
        <Switch>
          <Route exact path={'/home'} component={Home}/>
          <Route path="/home/:id" component={RecipeDetails}/>
          <Route exact path="/create" component={CreateRecipe}/>
        </Switch>
      </div>
  );
}

export default App;
