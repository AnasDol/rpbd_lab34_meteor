// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import App from './App';
// import Login from './components/Login';

// const MainRouter = () => {
//   return (
//     <Router>
//       <Switch>
//         <Route exact path="/login" component={Login} />
//         <Route path="/" component={App} />
//       </Switch>
//     </Router>
//   );
// };

// export default MainRouter;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import Login from './components/Login';
import BreedList from '../imports/ui/BreedList';
import AdminPanel from '../imports/ui/AdminPanel';
import UserList from '../imports/ui/UserList';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<BreedList />} />
        <Route path="/app" element={<App />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/userlist" element={<UserList />} />
      </Routes>
    </Router>
  );
};

export default MainRouter;