import React, { Component } from 'react';

class AuthForm extends Component {
    state = {
        email: '',
        password: '',
    }

    setEmail = (event) => (this.setState({
        email: event.target.value,
    }));

    setPassword = (event) => (this.setState({
        password: event.target.value,
    }));

    onSubmit = (event) => {
        event.preventDefault();
        const { email, password} = this.state;
        this.props.onSubmit({ email, password });
    }

    render() {
        return (
            <div className="row">
                <form className="col s6" onSubmit={this.onSubmit}>
                    <div className="input-field">
                        <input
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.setEmail}
                        />
                    </div>
                    <div className="input-field">
                        <input
                            placeholder="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.setPassword}
                        />
                    </div>
                    <div className="errors">
                        { this.props.errors.map((error, index) => <div key={index}>{error}</div>) }
                    </div>
                    <button className="btn">Submit</button>
                </form>
            </div>
        );
    }
}

export default AuthForm;