import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { routes } from "./pages/routes";

const App: React.FC = () => (
  <Router>
    <Route path={routes.root} exact component={Home} />
  </Router>
);

export default App;
