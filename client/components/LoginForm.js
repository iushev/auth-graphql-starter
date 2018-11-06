import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import AuthForm from './AuthForm';
import login from '../mutations/Login';
import currentUser from '../queries/CurrentUser';

class LoginForm extends Component {
    state = {
        errors: [],
    }

    onSubmit = (login, { email, password }) => {
        login({
            variables: {
                email,
                password,
            }
        })
            .catch((res) => {
                const errors = res.graphQLErrors.map(error => error.message);
                this.setState({ errors });
            });
    }

    render() {
        return (
            <Query
                query={currentUser}
            >
            {({ data: { user } }) => {
                if (user) {
                    return (
                        <Redirect to='/dashboard'/>
                    );
                }
                return (
                    <Mutation
                        mutation={login}
                        refetchQueries={[{
                            query: currentUser,
                        }]}
                    >
                    {(login) => {
                        return (
                            <div>
                                <h3>Login</h3>
                                <AuthForm
                                    errors={this.state.errors}
                                    onSubmit={(data) => this.onSubmit(login, data)}
                                />
                            </div>
                        );
                    }}
                    </Mutation>
                );
            }}
            </Query>
        );
    }
}

export default LoginForm;