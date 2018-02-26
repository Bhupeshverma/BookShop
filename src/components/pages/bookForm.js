"use strict"
import React,{Component} from 'react';

import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';
import {postBooks, deleteBooks,getBooks,resetButton} from '../../actions/bookActions';
import axios from 'axios';
import {  Dropdown, Sidebar,Segment,Image,Message,
  Grid, Button,Icon,Form,Menu, Input} from 'semantic-ui-react'

const style = {
  bookForm:{
    padding: "15px"
  }
}
class BookForm extends Component{
  constructor() {
    super();
    this.state = {
      images:[{}],
      img:'',
      title:'',
      description:'',
      price:"",
      name:"",
      email:"",
      idToBeDelete:''
    }
  }
  componentDidMount(){
    this.props.getBooks();
    //GET IMAGES FROM API
    axios.get('/api/images')
      .then(function(response){
        this.setState({images:response.data});
      }.bind(this))
      .catch(function(err){
        this.setState({images:'error loading image files from the server', img:''})
      }.bind(this))
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })
  handleSelect(img){
    this.setState({
      img: '/images/'+ img
    })
  }
  handleDelete(id){
    this.setState({
      idToBeDelete:id
    })
  }
  handleSubmit =()=>{
    const { title,description,price,img } = this.state
    console.log(title, description,price,img);
    const book=[{
      title: title,
      description: description,
      images:img,
      price: price,
    }]
    console.log("book",book);
    this.props.postBooks(book);
  }

  onDelete(){
    const {idToBeDelete} = this.state
    
    this.props.deleteBooks(idToBeDelete);
  }
  handleSuccess(){
    this.props.resetButton();
    this.setState({
      title:'',
      description:'',
      price:'',
      img:''
    })
    return(
      <Message
      success
     
      content={this.props.msg}
    />
    )
  }
  handleError(){
    return(
      <Message
      error
      content={this.props.msg}
    />
    )
  }

  render(){
    const { title, description, price} = this.state
    const booksList = this.props.books.map(function(booksArr){
      return (
        <Menu.Item key={booksArr._id} eventKey={booksArr._id} 
        onClick={this.handleDelete.bind(this, booksArr._id)}
        >{booksArr._id}</Menu.Item>
        // <option key={booksArr._id}> {booksArr._id}</option>
      )
    },this)
    console.log("booksList",booksList)
    const imgList = this.state.images.map(function(imgArr, i){
      return(
        <Menu.Item key={i} eventKey={imgArr.name}
          onClick={this.handleSelect.bind(this, imgArr.name)}>{imgArr.name}</Menu.Item>
      )
    }, this)
    return(
    <Grid stackable columns={2} style={{margin: "30px"}}>
    <Grid.Column >
      <Segment >
      <Input
      label={<Dropdown defaultValue='' text="Select an Image" options={imgList} style={{backgroundColor: 'teal', color: 'white'}} />}
      labelPosition='right'
      placeholder=' '
      ref="image"
      style={{width:"100%"}}
      value={this.state.img}
    />
    <Image src={this.state.img}/>
      </Segment>
    </Grid.Column>
    <Grid.Column>
      <Segment >
      <Form onSubmit={this.handleSubmit}>
          <Form.Input label='Title' placeholder=''  width={12} required onChange={this.handleChange}
            name="title" value={title}
           />
          <Form.Input label='Description' placeholder=''   width={12} required onChange={this.handleChange}
           name="description" value={description}
          />
          <Form.Input label='Price' placeholder=''  width={12} required onChange={this.handleChange}
           name="price" value={price}
          />
          <Form.Button content='Submit' style={{backgroundColor: 'teal',color:"white", marginTop:"20px"}}
          >
          </Form.Button>
          
      </Form>
      {this.props.validation == "success" ? this.handleSuccess():null}
          {this.props.validation == "error" ? this.handleError():null}
      </Segment>
      <Segment style={{marginTop: "10px"}}>
      <Input
      label={<Dropdown defaultValue='' text="Select an Id to Delete" options={booksList} style={{backgroundColor: 'teal', color: 'white'}} />}
      labelPosition='right'
      placeholder=' '
      ref="delete"
      style={{width:"100%"}}
      value={this.state.idToBeDelete}
    />
      <Button onClick={this.onDelete.bind(this)} content='Delete' style={{backgroundColor: 'Red',color:"white", marginTop:"20px"}}/> 
      {this.props.validation == "null"? this.setState({idToBeDelete:''}):null}
      {this.props.validation == "error"? this.handleError():null}
      </Segment>
    </Grid.Column>
    </Grid>
    )
  }
}
function mapStateToProps(state){
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  }
}

export default connect(mapStateToProps, {postBooks, deleteBooks,getBooks,resetButton})(BookForm);
