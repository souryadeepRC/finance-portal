
import { BrowserRouter as Router } from 'react-router-dom';
// styles
import './App.scss';
// components
import { Header } from 'src/components/common/header/Header';
import { AppRoutes } from 'src/routes'; 

const App = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <AppRoutes />
    </Router>
  );
}

export default App;
