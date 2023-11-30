import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import App from './App';

const MainRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default MainRouter;