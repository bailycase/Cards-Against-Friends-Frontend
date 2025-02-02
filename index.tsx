import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import ReactDOM from 'react-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { useDispatch } from 'react-redux'
import { split } from 'apollo-link';
import { useMediaQuery } from 'react-responsive'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
  RouteProps,
} from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
// import useBeforeUnload from 'use-before-unload';
import { Grommet } from 'grommet';
import { deepMerge } from 'grommet/utils';
import Landing from './components/Home/Landing';
import { Login } from './components/Login';
import Dashboard from './components/Dashboard/Dashboard';
import configureStore from './redux/store';
import './app.css';
import { ReduxState } from './redux/types';

const Theme = deepMerge({
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
    },
    heading: {
      extend: 'Balsamiq Sans',
    },
    colors: {
      brand: '#6320EE',
      secondary: '#5707F7',
      drawer: "rgb(255, 255, 255, 90%)",
      dark: '#32141a',
      light: '#eff9fb',
      grey: '#4c4c4c',
      black: '#000000',
    },
  },
});

// Create an http link
const httpLink = new HttpLink({
  uri: process.env.SERVER_IP,
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: process.env.SUBSCRIPTIONS_URL as string,
  options: {
    reconnect: true,
  },
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const { store, persistor } = configureStore();
const App: React.FunctionComponent = () => {
  // useBeforeUnload('Are you sure you want to leave?');
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const history = useHistory();
  const isAuthenticated: boolean = useSelector((state: ReduxState) => state.User.loggedIn);
  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch({ type: 'CHANGE_VIEW', payload: { isMobile } })
  }, [isMobile])

  React.useEffect(() => {
    if (isAuthenticated) {
      history.replace('/dashboard');
    }
  }, [isAuthenticated]);

  const PrivateRoute = ({ children, ...rest }: RouteProps) => {
    return (
      <Route
        {...rest}
        render={({ location }) => (isAuthenticated ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          ))}
      />
    );
  }
  return (
    <Switch>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute path="/dashboard">
        <Dashboard />
      </PrivateRoute>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  );
};
const Loading = () => <h1>Loading </h1>;
const WrappedApp = () => (
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <ApolloProvider client={client}>
        <ToastProvider>
          <Router>
            <Grommet theme={Theme}>
              <App />
            </Grommet>
          </Router>
        </ToastProvider>
      </ApolloProvider>
    </PersistGate>
  </Provider>
);
ReactDOM.render(<WrappedApp />, document.getElementById('root'));
