"use strict"
import React, {Component} from 'react';
//import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';
import { Responsive,Container, Divider, Dropdown, Sidebar,
  Grid, Header, Image, List, Menu, Segment,Button,Icon } from 'semantic-ui-react'
import {connect} from 'react-redux';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import Booklist from './pages/bookList';
import App from '../routes';
import {Link} from 'react-router-dom';
class Navigation extends Component{
  constructor(){
    super();
    this.state={
      visible: false
    }
  }
  toggleVisibility(){
    console.log("hello")
    this.setState({ visible: !this.state.visible })
  }

  render(){
    const { visible } = this.state
    return(
      <Menu fixed='top' inverted borderless>
      <Container>
        <Menu.Item >
        <Link to='/'>
          <Image
            size='mini'
            src='/images/logo.jpg'
            style={{ marginRight: '1.5em' }}
          /></Link>
          <Link to='/'>
          BookShop
          </Link>
        </Menu.Item>
        <Menu.Item ><Link to='/about'>About</Link></Menu.Item>
        <Menu.Item ><Link to='/contact'>Contact Us</Link></Menu.Item>
        <Menu.Menu position='right'>
        <Menu.Item ><Link to='/admin'>
         Admin
         </Link>
         </Menu.Item>
        <Menu.Item >
        <Link to='/cart'>
        Cart
        </Link>
        { (this.props.cartItemsNumber > 0)?(
            <NotificationBadge count={this.props.cartItemsNumber} effect={Effect.SCALE}/>
         ):('')
        }
        </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>

  )
}
}
function mapStateToProps(state){
  cartItemsNumber:state.cart.totalQty
}
export default connect(mapStateToProps)(Navigation);
