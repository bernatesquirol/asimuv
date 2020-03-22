import React, { useState } from 'react';
import InteractiveMap, {Marker, MapController} from 'react-map-gl';
import pin from '../static/pin.svg'
import finish from '../static/finish.svg'
import start from '../static/start.svg'
import { Dropdown, Container, Button, Grid, GridColumn } from 'semantic-ui-react'
import _ from 'lodash'
function getHoursLeft(from){
  return Array.from({length: 24-from}, (x,i) => i+from);
}

function Overlay(props) { 
  const hourFrom = 8
  const latlng = {
    latitude: props.latitude?props.latitude:41.3870154,
    longitude: props.longitude?props.longitude:2.1700471,
  }
  const setLatlong = props.setLatLong
  // const [latlng, setLatlong] = useState({
  //   latitude: props.latitude?props.latitude:41.3870154,
  //   longitude: props.longitude?props.longitude:2.1700471,
  // })
  const dropdownValue = props.value
  const setDropdownValue = props.setDropdownValue
  // const [dropdownValue, setDropdownValue] = useState(hourFrom)
  let hours = getHoursLeft(hourFrom)
  return (
    <Marker latitude={latlng.latitude} 
            longitude={latlng.longitude} 
            onDragEnd={(e)=>{console.log('dragend');setLatlong({latitude:e.lngLat[1], longitude:e.lngLat[0]})}} 
            offsetLeft={-35} offsetTop={-92} 
            draggable={true}>
        <Container style={{width:75}} textAlign='center'>          
        <Dropdown text={dropdownValue+':00'}
                  placeholder='arrival by '
                  fluid
                  selection
                  value={dropdownValue}
                  onClose={()=>{props.setLock(false)}}
                  onOpen={()=>{props.setLock(true)}}
                  
                  
        >
          <Dropdown.Menu>
          {hours.map(h=><Dropdown.Item text={h+':00'} key={h} value={h} onClick={()=>setDropdownValue(h)} />)}
          </Dropdown.Menu>
        </Dropdown>
        <img style={{width:50}} src={props.isFirst?start:(props.isLast?finish:pin)}/>
        </Container>   
    </Marker>
  )
}

function Map(props) {
  const [viewport, setViewport] = useState({
    width: props.width?props.width:400,
    height: props.height?props.height:400,
    bearing: -44.4105,
    latitude: props.latitude?props.latitude:41.3870154,
    longitude: props.longitude?props.longitude:2.1700471,
    zoom: 12
  });
  
  const [markers, setMarkers] = useState([]);
  const [lock, setLock] = useState(false)
  const saveMarkers = (newMarkers)=>{
    setMarkers(newMarkers)
    props.saveMarkers(newMarkers)    
  }
  const changeValueMarker = (i_change, value)=>{
    saveMarkers(markers.map((m,i)=>i==i_change?{...m, value:value}:m))
  }
  const changeLngLatMarker = (i_change, lngLat)=>{
    saveMarkers(markers.map((m,i)=>i==i_change?{...m, latitude: lngLat.latitude, longitude:lngLat.longitude }:m))
  }
  
  return (
    <>
    <InteractiveMap
      onClick={(e)=>{
        saveMarkers([...markers, {longitude:e.lngLat[0], latitude:e.lngLat[1], from: 8, value: 8 }])
      }}
      mapboxApiAccessToken={"pk.eyJ1IjoiYmVybmF0ZXNxdWlyb2wiLCJhIjoiY2s4MXFneWVkMHJzaDNkcnV3NjE4czlzNCJ9.MxSlFFg9k2o_ad_G_A3gug"}
      mapStyle={'mapbox://styles/bernatesquirol/ck82o72do39201iod1pno8huk'}
      {...viewport}
      onViewportChange={lock?null:setViewport}
    >
      {markers.map((m, i)=><Overlay 
                              setLock={setLock} 
                              from={i>1?markers[i-1].time:8} 
                              key={i} 
                              longitude={m.longitude} 
                              latitude={m.latitude}
                              value={m.value}
                              setDropdownValue={(value)=>changeValueMarker(i, value)}
                              setLatLong={(latlong)=> changeLngLatMarker(i, latlong)}
                              isLast={i==markers.length-1}
                              isFirst={i==0}
                            />)}
    </InteractiveMap>
    <hr></hr>
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}/>
        <Grid.Column width={4}>
        <Button onClick={()=>props.saveRoute()} primary size='big'>Guarda</Button>
        </Grid.Column>
        <Grid.Column width={6}/>
      </Grid.Row>
    </Grid>
    </>
  );
}
export default Map