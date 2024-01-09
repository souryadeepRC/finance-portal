
import { BrowserRouter as Router } from "react-router-dom";
// components 
import { AppRoutes } from "src/routes";
import { AppNavigationBar } from "src/components/app-navigation-bar/AppNavigationBar";

const App = (): JSX.Element => {
  return (
      <Router>
        <AppNavigationBar />
        <AppRoutes />
      </Router>
  );
};

export default App;
