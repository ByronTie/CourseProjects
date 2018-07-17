import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function (ComponentToBeRendered) {
    class Authenticate extends Component {
        componentWillMount() {
            if (this.props.isAuthenticated === false) {
                this.props.history.push("/signin");
            }
        }

        //on updates to react state, redux state, etc
        componentWillUpdate(nextProps) {
            if (nextProps.isAuthenticated === false) {
                this.props.history.push("/signin");
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props} />;
        }

    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated
        }
    }

    return connect(mapStateToProps, null)(Authenticate);
}
