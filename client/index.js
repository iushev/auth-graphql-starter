import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter, Route} from 'react-router-dom';

import App from './components/App';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Dashboard from './components/Dashboard';
import requireAuth from './hoc/requireAuth';

const link = createHttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
});

const client = new ApolloClient({
    link,
    dataIdFromObject: o => o.id,
});

const Root = () => {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <App>
                    <Route path="/login" component={LoginForm}></Route>
                    <Route path="/signup" component={SignupForm}></Route>
                    <Route path="/dashboard" component={requireAuth(Dashboard)}></Route>
                </App>
            </BrowserRouter>
        </ApolloProvider>
    );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
