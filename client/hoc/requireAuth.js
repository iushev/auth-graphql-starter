import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

import currentUser from '../queries/CurrentUser';

export default (WrappedComponent) => {
    class RequireAuth extends Component {
        render() {
            return (
                <Query
                    query={currentUser}
                >
                {({data: { user } }) => {
                    if (!user) {
                        return (
                            <Redirect to="/login" />
                        );
                    }

                    return <WrappedComponent {...this.props} />
                }}
                </Query>
            );
        }
    }

    return RequireAuth;
};
