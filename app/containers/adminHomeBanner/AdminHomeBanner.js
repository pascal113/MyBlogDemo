import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {actions} from '../../reducers/index'
import {bindActionCreators} from 'redux'
import ImageUploader from 'react-images-upload';
import ImagesUploader from 'react-images-uploader';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

const {user_auth} = actions;
class AdminHomeBanner extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return(
            <div>
                <h1 >Upload Banner Image</h1>
                <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                />

                <ImagesUploader
                    url="http://localhost:3030/multiple"
                    optimisticPreviews
                    onLoadEnd={(err) => {
                        if (err) {
                            console.error(err);
                        }
                    }}
                    label="Upload multiple images"
                />
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