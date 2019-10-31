import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { BlockchainNetworkAwareWrapper } from "./components";
import { Home } from "./pages/home";
import { routes } from "./pages/routes";

const App: React.FC = () => (
  <BlockchainNetworkAwareWrapper>
    <Router>
      <Route path={routes.root} exact component={Home} />
    </Router>
  </BlockchainNetworkAwareWrapper>
);

export default App;
