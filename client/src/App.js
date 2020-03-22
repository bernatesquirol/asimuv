import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form2 from './Form2'
import Result from './Result'
import { Grid, Header, Icon } from 'semantic-ui-react'

class App extends React.Component  {
  state = { activeIndex:0, rutes:[{markers:[]}] }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  getResults= (rutes)=>{
    console.log(rutes)
    this.setState({rutes:rutes,activeIndex:1})
  }
  render(){
    const { activeIndex } = this.state
    return (
      <div className="App" >
        <Grid style={{marginLeft:20, marginRight:20}}>
        <Grid.Row> 
          <Grid.Column width={2}/>
          <Grid.Column width={12}>
            <Grid.Row>     
            <Grid.Column width={2}/>     
            <Grid.Column>
              <Header>
                <div style={{height: '128px', paddingTop: '95px', fontSize: 'xxx-large'}}>bidaIA </div> 
                <div style={{height: '100px', fontSize: 'large',paddingLeft:'15%'}}>by asimuv</div>
              </Header>
            </Grid.Column>
            <Grid.Column width={2}/>
            </Grid.Row>
            <Grid.Row columns={7}> 
              <Grid >
                <Grid.Row> 
                  <Grid.Column width={3}></Grid.Column>
                  <Grid.Column width={2}>
                    <Icon name='street view' color='teal' className='icon_vehicle' size='big'></Icon>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Icon name='bicycle' color='orange' className='icon_vehicle' size='big'></Icon>
                  </Grid.Column>
                  <Grid.Column width={2}>
                    <Icon name='motorcycle' color='olive' className='icon_vehicle' size='big'></Icon>
                    </Grid.Column>
                  <Grid.Column width={2}>
                    <Icon name='bus' color='red' className='icon_vehicle' size='big'></Icon>
                    </Grid.Column>
                  <Grid.Column width={2}>
                    <Icon name='train' color='blue' className='icon_vehicle' size='big'></Icon>
                  </Grid.Column>
                  <Grid.Column width={3}></Grid.Column>
                </Grid.Row>
              </Grid>         
            </Grid.Row>
            <br></br>
            <hr></hr>    
            <br></br>
            <Grid.Row>
            <Grid.Column>
          {activeIndex==0?<>
            <Form2 saveRoutes={this.getResults}></Form2>
            {/* <Result data={this.state.rutes}/> */}
            </>
          :
            <Result data={this.state.rutes}></Result>
          }
            </Grid.Column>
            </Grid.Row>
          </Grid.Column>
          <Grid.Column width={2}/>
        </Grid.Row> 
        </Grid>
      </div>
    );
  }
}

export default App;
