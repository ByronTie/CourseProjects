import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postNewMessage } from '../store/actions/messages';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    handleNewMessage = e => {
        e.preventDefault();
        this.props.postNewMessage(this.state.message);
        this.setState({ message: "" });
        this.props.history.push("/");
    }

    render() {
        let { errors } = this.props;
        let errorMessage = errors.message;
        return (
            <form onSubmit={this.handleNewMessage}>
                {errorMessage && (
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                )}
                <input
                    type="text"
                    className="form-control"
                    value={this.state.message}
                    onChange={e => this.setState({ message: e.target.value })}
                />
                <button type="submit" className="btn btn-success pull-right">
                    Add my message!
                </button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    };
}

export default connect(mapStateToProps, { postNewMessage })(MessageForm);