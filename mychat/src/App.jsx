import React from "react";

import { Chat, StartPage } from "./pages/";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style.scss";
import "antd/dist/antd.css";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path={["/chat/:name"]}>
                        <Chat />
                    </Route>
                    <Route exact path={["/chat"]}>
                        <StartPage />
                    </Route>
                    <Route path={["/signin", "/"]}>
                        <StartPage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
