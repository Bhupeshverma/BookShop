import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getBooks} from '../../actions/bookActions';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';
//import {Grid, Row, Col,Panel,Button, ButtonGroup, Label,Carousel} from 'react-bootstrap';
var Carousel = require('nuka-carousel');
import { Grid, Image,Sidebar} from 'semantic-ui-react'

class BookList extends Component{
  componentDidMount(){
    this.props.getBooks();
  }
  render(){
    const bookList = this.props.books.map((booksArr)=>{
      return(
        <Grid.Column key={booksArr._id}>
          <BookItem
                _id= {booksArr._id}
                title={booksArr.title}
                description={booksArr.description}
                images={booksArr.images}
                price={booksArr.price}
          />
        </Grid.Column>
      )
    })
    return(
      <Grid container >
       <Grid.Row centered >
        <Carousel autoplay>
        <Image src="/images/home1.jpg"/>
        <Image src="/images/home2.jpg"/>
        </Carousel>
       </Grid.Row>
       <Grid.Row doubling columns={4}>
        {bookList}
      </Grid.Row>
      </Grid>
      
    )
  }
}
function mapStateToProps(state){
  return{
    books: state.books.books
  }
}
export default connect(mapStateToProps, {getBooks})(BookList);
