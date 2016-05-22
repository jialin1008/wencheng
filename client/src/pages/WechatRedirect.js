import React from 'react'
import Ajax from '../util/ajax';
import Page from '../component/page';
import auth from '../util/auth.js';
import { withRouter } from 'react-router'

class WechatRedirect extends React.Component {
    componentDidMount() {
        var code = getParameterByName('code');
        var target = getParameterByName('target');

        var data = {code, target, hash:window.location.hash};
        console.log(data);

        Ajax.post('/api/wechat/getUser', data)
            .then((data) => {
                console.log(data);
                var user = data.user;
                
                if (user.userid) {
                    auth.didLogin(user);
                    this.props.router.replace(target);
                } else {
                    console.log(target);
                    this.props.router.replace('/bind');
                }
            })
            .catch((err) => {
                this.page.showAlert(err.msg);
            });
    }

    render() {
        return (
            <Page ref="page" className="cell" title="跳转中">
                <p>跳转中</p>
            </Page>
        );
    }

    get page() {
        return this.refs.page;
    }
}

export default withRouter(WechatRedirect);


function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.href);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}