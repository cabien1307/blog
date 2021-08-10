import Home from "./page/Home/Home";
import Topbar from "./components/topbar/Topbar";
import Login from "./page/Login/Login";
import Register from "./page/Register/Register";
import Setting from "./page/Setting/Setting";
import Single from "./page/Single/Single";
import Write from "./page/write/Write";

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {

    const { user } = useContext(Context)
    
    return (
        <Router>
            <Topbar />
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>

                <Route path="/register">
                    {user ? <Home /> : <Register />}
                </Route>

                <Route path="/login">
                    {user ? <Home /> : <Login />}
                </Route>

                <Route path="/post/:postId">
                    { user ? <Single /> : <Register/> }
                </Route>

                <Route path="/write">
                    { user ? <Write /> : <Register/> }
                </Route>

                <Route path="/setting">
                    { user ? <Setting /> : <Register/> }
                </Route>


            </Switch>







        </Router>
    );
}

export default App;
