import React,{useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './Components/Map.jsx'
import { Button, Accordion, Modal, Icon, Input, Header, Popup } from 'semantic-ui-react'
import useDimensions from "react-use-dimensions";

function Form2 (props) {
  // state = { activeIndex:-1, rutes:[], modalVisible:true, newRute:{markers:[]} }
  const [activeIndex, setActiveIndex] = useState(-1)
  const [rutes, setRutes] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const closeModal = ()=>{setNewRute({markers:[]});setModalVisible(false)}
  const openModal = ()=>{setModalVisible(true)}
  const [newRute, setNewRute] = useState({markers:[]})
  const createNewRute = (e)=>{
    console.log(newRute)
    setRutes([...rutes, newRute])
    closeModal()
  }
  const handleClick = (e, titleProps) => {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
    // this.setState({ activeIndex: newIndex })
  }
  const [ref, { x, y, width }] = useDimensions();
  
  
  return (
    <> 
    <div style={{minWidth:250}}>
    <Header as='h2'>
      Welcome to bidaIA, your mobility manager.<br></br>
    </Header>
    <Header as='h4'>
      We want to make your life easy and offer you the best option for your transport needs
    </Header>
    <Accordion>
      {rutes.map((r,i)=>{
        
        return (
          <>
          <Accordion.Title
            active={activeIndex === i}
            index={i}
            onClick={handleClick}
          >
            <Icon name='dropdown' />
            {`${r.name}`}
            <Icon name='close' onClick={()=>setRutes(rutes.filter((r,i_2)=>i!=i_2))}/>
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
            <p>
            {`Nombre de parades: ${r.markers.length}`}<br/>
            {`Freqüència setmanal: ${r.freq}`}
            </p>
          </Accordion.Content>
          </>
        )
      })}
      <Accordion.Title
        active={false}
        index={rutes.length}        
      >
        <Icon name='dropdown' />
        <Popup content='Insert here the routes that you usually do, press the button to analyse a new route!' 
        trigger={<Button onClick={openModal} primary>Crete new route</Button>}/>
      </Accordion.Title>
      </Accordion>
      </div>
      {rutes.length>0?
        <>
        <br></br>     
        <Popup content='See the different mobility options we found'
        trigger={<Button width={width} onClick={()=>{props.saveRoutes(rutes)}} secondary>Calculate optimal routes</Button>}
        />
        </>
      :null}
      <Modal open={modalVisible} 
            onClose={closeModal}
             >
        <Modal.Header>Input your usual route</Modal.Header>
        <Modal.Content>
          <div ref={ref}>Route's name: <Input placeholder='Name' onChange={(e, name)=>{console.log(e,name);setNewRute({...newRute,name:name.value})}}></Input></div>
          <div>How many days a week you repeat this route? <Input placeholder='Frequency (per week)' onChange={(e, freq)=>{setNewRute({...newRute,freq:parseInt(freq.value)})}}></Input></div>
          <br></br>
          <div>Click on the map to define places and hours</div>
          {width?<Map width={width} height={400} 
              saveRoute={createNewRute}
              saveMarkers={(markers)=>
              {
                console.log(newRute)
                setNewRute({...newRute, markers:markers})
              }}></Map>:null}
          {/* <Button onClick={this.createNewRute}>Guardar</Button> */}
        </Modal.Content>
      </Modal>
      
      {/* <Map>

      </Map> */}
    </>
  );
}

export default Form2;
