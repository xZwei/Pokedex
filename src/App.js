import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import Home from "./pages/home/Home";

function App({baseUrl}) {
    
    return (
        <Router basename={baseUrl}>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default App;