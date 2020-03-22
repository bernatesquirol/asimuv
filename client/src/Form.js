import React from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map.jsx'
import { Button, Accordion, Modal, Icon, Input, Dropdown } from 'semantic-ui-react'
import useDimensions from "react-use-dimensions";

class Form extends React.Component  {
  state = { activeIndex:-1, rutes:[], modalVisible:true, newRute:{markers:[]} }
  createNewRute = (e)=>{
    this.setState((prevState)=>({rutes:[...prevState.rutes, prevState.newRute], newRute:{markers:[]}, modalVisible: false}))
  }
  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }

  render(){
    const { activeIndex } = this.state
    const [ref, { x, y, width }] = useDimensions();
    console.log(x,y,width)
    console.log(activeIndex)
    return (
      <>        
        hey
        {this.state.rutes.map((r,i)=>{
          console.log(i, activeIndex === i)
          return (
          <Accordion>
            <Accordion.Title
              active={activeIndex === i}
              index={i}
              onClick={this.handleClick}
            >
              <Icon name='dropdown' />
              {`${r.name}`}
              <Icon name='close' onClick={()=>this.setState((state)=>({rutes:state.rutes.filter((r,i_2)=>i!=i_2)}))}/>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === i}>
              <p>
              {`Nombre de parades: ${r.markers.length}`}<br/>
              {`Freqüència setmanal: ${r.freq}`}
              </p>
            </Accordion.Content>
            </Accordion>
          )
        })}
        <Button onClick={()=>this.setState({modalVisible:true})}>Crear nova ruta</Button>
        <Modal ref={ref} open={this.state.modalVisible} 
              onClose={()=>{this.setState({modalVisible:false, newRute:{}})}}
              trigger={<Button onClick={()=>this.props.saveRoutes(this.state.rutes)}>Troba les rutes recomenades</Button>} >
         <Modal.Header>Crear nova ruta</Modal.Header>
          <Modal.Content>
          <div>Nom de la ruta: <Input placeholder='Name' onChange={(e, name)=>{this.setState((state)=>({newRute:{...state.newRute,name:name.value}}))}}></Input></div>
            <div>Quants dies a la setmana repeteixes aquesta ruta? <Input placeholder='Frequency (per week)' onChange={(e, freq)=>{this.setState((state)=>({newRute:{...state.newRute,freq:parseInt(freq.value)}}))}}></Input></div>

            <Map width={400} height={400} 
                saveRoute={this.createNewRute}
                saveMarkers={(markers)=>
                {
                  console.log(markers)
                  this.setState((state)=>({newRute:{...state.newRute, markers:markers}}))
                }}></Map>
            {/* <Button onClick={this.createNewRute}>Guardar</Button> */}
          </Modal.Content>
        </Modal>
        <hr></hr>
        
        {/* <Map>

        </Map> */}
      </>
    );
  }
}

export default Form;
