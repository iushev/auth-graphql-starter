import React, { Component } from 'react';
import { Query, Mutation } from "react-apollo";
import { Link } from 'react-router-dom';

import currentUser from '../queries/CurrentUser';
import logout from '../mutations/Logout';

class Header extends Component {
    renderButtons(loading, { user }) {
        if (loading) {
            return <div />;
        }

        if (user) {
            return (
                <li>
                    <Mutation
                        mutation={logout}
                        refetchQueries={[{
                            query: currentUser,
                        }]}
                    >
                    {(logout) => {
                        return (
                            <a onClick={(event) => {
                                event.preventDefault();
                                logout();
                            }}>Logout</a>
                        );
                    }}
                    </Mutation>
                </li>
            );
        } else {
            return (
                <React.Fragment>
                    <li>
                        <Link to='/signup'>Signup</Link>
                    </li>
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </React.Fragment>
            );
        }
    }

    render() {
        return (
            <Query query={currentUser}>
                {({ loading, error, data }) => {
                    return (
                        <nav>
                            <div className='nav-wrapper'>
                                <Link to='/' className='brand-logo left'>
                                    Home
                                </Link>
                                <ul className='right'>
                                    { this.renderButtons(loading, data) }
                                </ul>
                            </div>
                        </nav>
                    );
                }}
            </Query>
        );
    }
}

export default Header;
