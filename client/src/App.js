import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import RecipeDetails from './components/RecipeDetails/RecipeDetails'
import CreateRecipe from './components/CreateRecipe/CreateRecipe'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Henry Food</h1>
        <Route exact path={'/'} component={LandingPage}/>
        <Switch>
          <Route exact path={'/home'} component={Home}/>
          <Route path="/home/:id" component={RecipeDetails}/>
          <Route exact path="/create" component={CreateRecipe}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
