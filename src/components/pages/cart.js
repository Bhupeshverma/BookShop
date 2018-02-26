"use strict"

import React,{Component} from 'react';
import {connect} from 'react-redux';
//import {Modal, Panel, Col, Row, Well, Button, ButtonGroup, Label,Image, Tab} from 'react-bootstrap';
import {deleteCartItem, updateCart,getCart} from '../../actions/cartActions';
import { Segment ,Header,Step,Image,Form, Grid,Button,Dimmer,Progress,Accordion, List,Container,Icon} from 'semantic-ui-react'
import PaymentCard from 'react-payment-card-component'


const style ={
  cartPanel:{
    margin:"20px",
    justifyContent: "center",
  },
  checkout:{
    padding:"20px",

  }
}
class Cart extends Component{
  constructor(){
    super();
    this.state = {
      showModal:false,
      step: 1,
      active: false,
      active2:false,
      activeIndex:0,
      number:'',
      name:'',
      exp:'',
      cvv:''
    }
  }
  componentDidMount(){
    this.props.getCart();
  }
  open(){
    this.setState({showModal:true})
  }
  close(){
    this.setState({showModal:false})
  }
  render(){
    if(this.props.cart[0]){
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
  onDelete(_id){
      // Create a copy of the current array of books
      const currentBookToDelete = this.props.cart;
      // Determine at which index in books array is the book to be deleted
      const indexToDelete = currentBookToDelete.findIndex(
        function(cart){
          return cart._id === _id;
        }
      )
      //use slice to remove the book at the specified index
      let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]

      this.props.deleteCartItem(cartAfterDelete);
    }

  onIncrement(_id){
    this.props.updateCart(_id, 1,this.props.cart);
  }

  onDecrement(_id, quantity){
    if(quantity > 1){
      this.props.updateCart(_id, -1,this.props.cart);
    }
  }

handleChange = (e, { name, value }) => this.setState({ [name]: value })

  renderEmpty(){
    return(<div></div>)
  }
  handleProced(){
    this.setState({
      step : this.state.step + 1
    })
  }
  previosStep(){
    this.setState({
      step : this.state.step - 1
    })
  }
  handleOpen(){
    this.setState({
      active: true
    })
  }
  handleClose(){
    this.setState({
      active: false,
      active2:false
    })
  }
  handleSubmit =()=>{
    this.setState({
      active2: true,
      number:'',
      name:'',
      exp:'',
      cvv:''
    })
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  showStep(){
    const {active, activeIndex, number, name,exp,cvv,active2} = this.state
    const options = [
  { key: '0', text: 'State Bank Of India', value: 'State Bank Of India' },
  { key: '1', text: 'HDFC Bank', value: 'HDFC Bank' },
  { key: '2', text: 'Punjab National Bank', value: 'Punjab National Bank' },

]
const panels = [
  {
    title: 'Delivery Address',
    content: {
      as: Form.Input,
      key: 'content',
      label: 'Address',
      placeholder: 'billing address',
    }
  },
  {
    content: {
      as: Form.Input,
      key: 'content',
      label: 'Pincode',
      placeholder: "Pincode"
    }
  }
]
    const cartItemsList = this.props.cart.map((cartArr)=>{
      return(
        <Grid celled>
        <Grid.Row>
          <Grid.Column width={3}>
            <Image src={cartArr.images} />
          </Grid.Column>
          <Grid.Column width={13}>
          <Grid.Row>
          <Header as='h3'>{cartArr.title}</Header>
          <Header as='h4'>Price $.{cartArr.price}</Header>
          <Button.Group>
            <Button icon onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)}>
              <Icon name='minus' />
            </Button>
            <Button icon onClick={this.onIncrement.bind(this, cartArr._id)}>
              <Icon name='add' />
            </Button>
            <Button color='red' onClick={this.onDelete.bind(this, cartArr._id)}>Delete</Button>

            </Button.Group>
          </Grid.Row>
          </Grid.Column>
        </Grid.Row>
        </Grid>
      )
    })
    switch (this.state.step){
      case 1:
        return <Segment>
        {cartItemsList}
        <Header as='h4'>Total amount. {this.props.totalAmount}</Header>
      <Button color='teal' onClick={this.handleProced.bind(this)}>Proceed to Checkout</Button>
        </Segment>
      case 2:
        return <Segment>
                  <Grid celled>
                  <Grid.Row>
                    <Grid.Column width={8}>
                    <Header as="h4">Personal Detail</Header>
                    <Form>
                    <Form.Input label='Name' placeholder='Name' />
                    <Form.Input label='Email' placeholder='email' />
                    <Form.Input label='Phone' placeholder='Phone' />
                    </Form>
                    </Grid.Column>
                    <Grid.Column width={8}>
                    <Header as="h4">Billing Address</Header>
                    <Form>
                    <Form.Input label='Address' placeholder='Address' />
                    <Form.Input label='Pincode' placeholder='pincode' />
                    <Form.Input label='City' placeholder='city' />
                    <Form.Input label='State' placeholder='state' />
                    </Form>
                    </Grid.Column>
                  </Grid.Row>
                  <Button type='submit'color='blue' onClick={this.handleProced.bind(this)}>Submit</Button>
                  <Button content="back" color="black" onClick={this.previosStep.bind(this)} style={{marginLeft:"20px"}}/>
                  </Grid>

                </Segment>
      case 3:
        return <Segment>
                <Segment>
                <Header as='h4'> COD payment option</Header>
                <Button content="click here" color='black' onClick={this.handleOpen.bind(this)}></Button>
                <Dimmer
                 active={active}
                 onClickOutside={this.handleClose.bind(this)}
                 page
               >
                 <Header as='h2' icon inverted>
                   <Icon name='checkmark box' />
                   Payment Successfull!!!

                 </Header>
               </Dimmer>
                </Segment>
                <Accordion fluid styled as={Segment} active={activeIndex === 0} index={0} onClick={this.handleClick.bind(this)}>
                  <Accordion.Title >
                    <Icon name='payment' />
                    Pay through debit Card
                  </Accordion.Title>
                  <Accordion.Content active={activeIndex === 0}>
                  <Grid celled>
                  <Grid.Row>
                    <Grid.Column width={7}>
                    <PaymentCard
                       bank="SBI"
                       model="personnalite"
                       type="black"
                       brand="mastercard"
                       number={number}
                       cvv={cvv}
                       holderName={name}
                       expiration={exp}
                       flipped={false}
                     >
                     </PaymentCard>
                    </Grid.Column>
                    <Grid.Column width={9}>
                    <Form onSubmit={this.handleSubmit}>
                       <Form.Group >
                       <Form.Input fluid label='Card Number' placeholder='421XXXXXXXXXXXXXXXXXX' name="number"
                       type="text" max={16}  ref="number" width={6} onChange={this.handleChange}/>
                       <Form.Input fluid label='Name' name="name" placeholder='Name On Card' width={6} onChange={this.handleChange} />
                       </Form.Group>
                       <Form.Group >
                       <Form.Select fluid label='Select Bank' options={options}
                        placeholder='Select Bank' width={6}  />
                       <Form.Input fluid label='Expiry'type="text"
                           ref="expiration"
                           name="exp"
                           placeholder="MM/YYYY" width={6}
                           onChange={this.handleChange} />
                       <Form.Input fluid label='CVV' name="cvv" placeholder='CVV' width={4}
                       onChange={this.handleChange} />
                     </Form.Group>
                     <Form.Button content='Submit' color="black" />
                     </Form>
                    </Grid.Column>
                  </Grid.Row>
                  </Grid>
                  <Dimmer
                   active={active2}
                   onClickOutside={this.handleClose.bind(this)}
                   page
                 >
                   <Header as='h2' icon inverted>
                     <Icon name='checkmark box' />
                     Payment Successfull!!!

                   </Header>
                 </Dimmer>
                  </Accordion.Content>
                </Accordion>
                <Button content="back" color="black" onClick={this.previosStep.bind(this)} style={{marginLeft:"20px"}}/>
              </Segment>
    }
  }

  renderCart(){
    var wid = (this.state.step)/3 *100;

    console.log("wid",wid);
    return(
    <Container style={{marginTop: "100px"}} centered>
      <span className="progress-step" centered>{this.state.step}.</span>
      <Progress percent={wid} attached='top' small sucess style={{marginBottom: "10px"}}/>
      {this.showStep()}
    </Container>
    )
  }
}
function mapStateToProps(state){
  return{
    cart: state.cart.cart,
    totalAmount:state.cart.totalAmount,
  }
}
export default connect(mapStateToProps,{deleteCartItem, updateCart,getCart})(Cart);
