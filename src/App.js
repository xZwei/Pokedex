import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App({baseUrl}) {
    
    return (
        <Router basename={baseUrl}>
            <Switch>
                <Route exact path="/"></Route>
            </Switch>
        </Router>
    );
}

export default App;