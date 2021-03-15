import React, { Component } from 'react';
import { HatClient } from '@dataswift/hat-js';
import appConfig from '../appConfig';
import { Link } from 'react-router-dom';

export default class Login extends Component {
    state = { username: '', error: false }

    onFormSubmit = async (event) => {
        event.preventDefault();
        const auth = new HatClient({}).auth();
        const domain = this.state.username + appConfig.cluster;

        const isRegistered = await auth.isDomainRegistered(domain);
        this.setState({error: !isRegistered})

        if(isRegistered) {
            const url = `https://${domain}`;
            const redirectUrl = `http://${window.location.host}`;
            const fallback = `http://${window.location.host}`;
            const applicationId = appConfig.applicationId;
            window.location.href = auth.generateHatLoginUrl(url, applicationId, redirectUrl, fallback);
        }
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
                            <button type="submit" className="ui fluid large teal submit button">
                                Login
                            </button>
                        </div>
                    </form>
                    {!this.state.error && <div className="ui success message">Don't have an account? create an account <Link to="/signup">here</Link>.</div>}
                    {this.state.error && <div className="ui error message">Username not valid. Would like to create an <Link to="/signup">account</Link>?</div>}
                </div>
            </div>
        )
    }
}
