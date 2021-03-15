import React, { Component } from 'react';
import appConfig from '../appConfig';

export default class Signup extends Component {
    state = {username:'', email:''}

    onFormSubmit = (event) => {
        event.preventDefault();
        const redirectUrl = `http://${window.location.host}/login`;
        const applicationId = appConfig.applicationId;

        const {email, username} = this.state;

        window.location.href = `https://hatters.dataswift.io/services/baas/signup?email=${email}&hat_name=${username}&application_id=${applicationId}&redirect_uri=${redirectUrl}&lang=en`;
    }

    render() {
        return (
            <div className="ui middle aligned center aligned grid">
                <div className="column" style={{ maxWidth: '450px', marginTop: '100px' }}>
                    <form className="ui large form" onSubmit={this.onFormSubmit}>
                        <div className="ui stacked segment">
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Enter Username"
                                    value={this.state.username}
                                    onChange={(e) => this.setState({ username: e.target.value })}
                                />
                            </div>
                            <div className="field">
                                <input
                                    type="text"
                                    placeholder="Enter Email"
                                    value={this.state.email}
                                    onChange={(e) => this.setState({ email: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="ui fluid large teal submit button">
                                Signup
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
