import React, {Component} from 'react';
import { Router, Route,Switch } from 'react-router-dom';
import BookList from './components/pages/bookList';
import BookForm from './components/pages/bookForm';
import Cart from './components/pages/cart';
import Navigation from './components/menu';
import Footer from './components/footer';
import { connect } from 'react-redux';
import {getCart} from './actions/cartActions';
import { Grid, Image,Sidebar,Segment,Menu,Icon } from 'semantic-ui-react'
class App extends Component {
  constructor(){
    super();
    this.state={
      visible:false
    }
  }
  componentDidMount(){
    this.props.getCart();
  }
  render(){
    return(
      <div>
        <Navigation
         cartItemsNumber={this.props.totalQty}
         />
         <Switch>
          <Route exact path="/" component={BookList}/>
          <Route path="/admin" component={BookForm}/>
          <Route path="/cart" component={Cart}/>
          </Switch>
          <Footer/>

      </div>
    )
  }
}
function mapStateToProps(state){
  return {
    totalQty: state.cart.totalQty
  }
}
export default connect(mapStateToProps, {getCart})(App);
