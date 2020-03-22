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
    Benvingut/da a bidaIA, el teu nou gestor de mobilitat.<br></br>
    </Header>
    <Header as='h4'>
      Volem fer-te la vida més fàcil i oferir-te la millor opció pels teus desplaçaments
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
        <Popup content='Indica els trajectes que fas normalment i que vols analitzar; prem el botó per afegir-ne un!' 
        trigger={<Button onClick={openModal} primary>Crear nova ruta</Button>}/>
      </Accordion.Title>
      </Accordion>
      </div>
      {rutes.length>0?
        <>
        <br></br>     
        <Popup content='Consulta les diferents opcions de mobilitat que hem trobat per a tu'
        trigger={<Button width={width} onClick={()=>{props.saveRoutes(rutes)}} secondary>Calcula les rutes recomenades</Button>}
        />
        </>
      :null}
      <Modal open={modalVisible} 
            onClose={closeModal}
             >
        <Modal.Header>Introdueix un trajecte quotidià</Modal.Header>
        <Modal.Content>
          <div ref={ref}>Nom de la ruta: <Input placeholder='Name' onChange={(e, name)=>{console.log(e,name);setNewRute({...newRute,name:name.value})}}></Input></div>
          <div>Quants dies a la setmana repeteixes aquesta ruta? <Input placeholder='Frequency (per week)' onChange={(e, freq)=>{setNewRute({...newRute,freq:parseInt(freq.value)})}}></Input></div>
          <br></br>
          <div>Fes click al mapa per definirles hores i els llocs de la ruta</div>
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
