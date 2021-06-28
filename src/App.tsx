import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from './pages/Home';
import {NewRoom} from './pages/NewRoom';
import {Room} from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';
import { Page404 } from './pages/Page404';

import {AuthContextProvider} from './contexts/AuthContext';
import {ThemeContextProvider} from './contexts/ThemeContext';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/myroom/:id" component={AdminRoom} />
            <Route path="/*" component={Page404} />
          </Switch>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
