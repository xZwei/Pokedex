import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";

function App({baseUrl}) {
    
    return (
        <Router basename={baseUrl}>
            <Switch>
                <Route exact path="/" render={() => <Home />} />
                <Route exact path="/details/:id" render={(routeProps) => <Details {...routeProps} />} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;