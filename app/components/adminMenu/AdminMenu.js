import React, {Component} from 'react'
import {Menu, Icon} from 'antd'

const menus = [
    {url: '/', name: 'Home', iconType: 'home'},
    {url: '/managerUser', name: 'User', iconType: 'usergroup-delete'},
    {url: '/newArticle', name: 'Post', iconType: 'file-text'},
    {url: '/managerTags', name: 'Tag', iconType: 'tags-o'},
    {url: '/managerArticle', name: 'Content', iconType: 'edit'},
    {url: '/managerHomeBanner', name: 'HomeImage', iconType: 'edit'},
];
export default class AdminMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Menu
                    selectedKeys={[this.props.url]}
                    mode="inline"
                    theme="dark"
                    onClick={({key}) => {
                        this.props.changeUrl(key);
                        this.props.history.push(`/admin${key}`)
                    }}
                >
                    {
                        menus.map((item, index) =>
                            <Menu.Item key={item.url} >
                                <Icon type={item.iconType}/>
                                <span>{item.name}</span>
                            </Menu.Item>)
                    }

                </Menu>
            </div>
        )
    }

}
