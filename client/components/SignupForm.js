import React, { Component } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import AuthForm from './AuthForm';
import signup from '../mutations/Signup';
import currentUser from '../queries/CurrentUser';

class SignupForm extends Component {
    state = {
        errors: [],
    }

    onSubmit = (signup, { email, password }) => {
        signup({
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
                        mutation={signup}
                        refetchQueries={[{
                            query: currentUser,
                        }]}
                    >
                    {(signup) => {
                        return (
                            <div>
                                <h3>Sign Up</h3>
                                <AuthForm
                                    errors={this.state.errors}
                                    onSubmit={(data) => this.onSubmit(signup, data)}
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

export default SignupForm;