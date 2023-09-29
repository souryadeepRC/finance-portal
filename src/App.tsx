
import { BrowserRouter as Router, Link } from 'react-router-dom';
// styles
import './App.scss';
// components
import { AppRoutes } from 'src/routes';

const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
