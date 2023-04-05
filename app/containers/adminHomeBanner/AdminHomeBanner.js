import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {actions} from '../../reducers/index'
import {bindActionCreators} from 'redux'

const {user_auth} = actions;
class AdminHomeBanner extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return(
            <div>
                <h1 >Welcome to my home banner</h1>
            </div>
        )

    }
}

AdminHomeBanner.defaultProps = {
    isAdmin:false
};

function mapStateToProps(state) {
    return {
        isAdmin: state.globalState.userInfo.userType === 'admin',
        userInfo:state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user_auth:bindActionCreators(user_auth,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminHomeBanner)