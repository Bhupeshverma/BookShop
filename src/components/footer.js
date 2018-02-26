import React,{Component} from 'react';
import { Segment ,Header,Grid, List,Container} from 'semantic-ui-react'
class Footer extends Component{
  render(){
    return(
      <Segment inverted vertical style={{ padding: '5em 0em',marginTop:"20px" }}>
      <Container>
        <Grid  inverted stackable centered>
          <Grid.Row style={{textAlign: 'center'}}>
          <Header as='h4' inverted color='white'>Copyright 2018 BooksShop. All rights reserved</Header>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
    );
  }
}
export default Footer
