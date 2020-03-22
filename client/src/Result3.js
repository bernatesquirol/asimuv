import React from 'react';
import logo from './logo.svg';
import './App.css';
// import Map from './Components/Map.jsx's
import { Card, Icon, Image, Header, Button, List, Accordion, Grid} from 'semantic-ui-react'
import Map2 from './Components/Map2.jsx'
const json ={
  "routes":[
      {
          "type":"Mix",
          "stops":[
              {
                  "type":"bus",
                  "detail":"7",
                  "from": {"stop_name":"Balmes - Roselló (221)", "lat": 41.393702,  "long":2.157062},
                  "to": {"stop_name":"Gran Via - Llúria (149)", "lat": 41.391856,  "long":2.1706213},
                  "cost": 5,
                  "duration": 10
              },
            {
                  "type":"walk",
                  "detail":"",
                  "from": {"stop_name":"Gran Via - Llúria (149)", "lat": 41.391856,  "long":2.1706213},
                  "to": {"stop_name":"Urquinaona", "lat": 41.389780,  "long": 2.171812},
                  "duration": 7,
                  "cost": 0
            }
          ],
        "via": "Gran Via - Llúria (149)",
        "duration" : 17,
        "cost" : 10
      },
    {
      "type":"Time",
          "stops":[
              {
                  "type":"fgc",
                  "detail":"7",
                  "from": {"stop_name":"Provença", "lat": 41.392959,  "long":2.157885},
                  "to": {"stop_name":"Catalunya", "lat": 41.387391,  "long":2.169435},
                  "cost": 2,
                  "duration": 6
              },
            {
                  "type":"metro",
                  "detail":"L1",
                  "from": {"stop_name":"Catalunya", "lat": 41.387391,  "long":2.169435},
                  "to": {"stop_name":"Urquinaona", "lat": 41.389780,  "long":2.171812},
                  "duration": 3,
                  "cost": 5
            }
          ],
        "via": "Catalunya",
        "duration" : 11,
        "cost" : 7
    },
    {
      "type":"Sharing",
          "stops":[
              {
                  "type":"motorbike",
                  "detail":"",
                  "from": {"stop_name":"Diagonal", "lat": 41.395558,  "long":2.159965},
                  "to": {"stop_name":"Urquinaona", "lat": 41.387391,  "long":2.169435},
                  "cost": 8,
                  "duration": 3
              }
          ],
        "duration" : 9,
        "cost" : 8
    },
    {
      "type":"CO2",
          "stops":[
              {
                  "type":"bike",
                  "detail":"",
                  "from": {"stop_name":"Provença", "lat": 41.392959,  "long":2.157885},
                  "to": {"stop_name":"Urquinaona", "lat": 41.387391,  "long":2.169435},
                  "cost": 2,
                  "duration": 10
              }
          ],
        "duration" : 10,
        "cost" : 2
    },
    {
      "type":"Fit",
          "stops":[
              {
                  "type":"walking",
                  "detail":"",
                  "from": {"stop_name":"Provença", "lat": 41.392959,  "long":2.157885},
                  "to": {"stop_name":"Urquinaona", "lat": 41.387391,  "long":2.169435},
                  "cost": 7,
                  "duration": 27
              }
          ],
        "duration" : 27,
        "cost" : 7
    }

  ]
}
const freq = 4
const getPrice = (r) => {
  switch(r.type){
    case "Fit":
      return 0
    case "Mix":
      return 1      
    case "CO2":
      return 0.30
    case "Sharing":
      return 3.57
    case "Time":
      return 2
  }
}
const getDuration = (r)=>{
  return r.duration
}
const getCO2 = (r)=>{
  switch(r.type){
    case "Fit":
      return 0
    case "Mix":
      return 0.45      
    case "CO2":
      return 0
    case "Sharing":
      return 2.5
    case "Time":
      return 0.75
  }
}
const getHeart = (r)=>{
  switch(r.type){
    case "Fit":
      return 1
    case "Mix":
      return 0.35      
    case "CO2":
      return 1
    case "Sharing":
      return 0
    case "Time":
      return 0.23
  }
}
const getDescription = (r)=>{
  switch(r.type){
    case "Fit":
      return "Ruta per a fer activitat física i descobrir l'entorn"
    case "Mix":
      return "Ruta mixta: sabem que tens pressa però t'importa com et mous "
    case "CO2":
      return "Ruta pensada per reduir la petjada de CO2"
    case "Sharing":
      return "Ruta basada en compartir per a no renunciar a la velocitat"
    case "Time":
      return "Ruta per quan tens pressa i necessites optimitzar el temps"
  }
}
const getColor = (type)=>{
  switch(type){
    case "walk":
      return "black"
    case "walk":
      return "black"
    case "bus":
      return "red"
    case "metro":
      return "blue"
    case "fgc":
      return "green"
    case "motorbike":
      return "olive"
  }
}
const getPoints = (r)=>{
  let first = r.stops[0]
  let allPoints =  r.stops.map(s=>({lat:s.to.lat, long:s.to.long, color:getColor(s.type)}))
  return [{lat:first.from.lat, long:first.from.long, color:getColor(first.type)}, ...allPoints]
}
class App extends React.Component  {
  state = { }
  state = { activeIndex:0, rutes:[] }

  handleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeIndex } = this.state
    const newIndex = activeIndex === index ? -1 : index

    this.setState({ activeIndex: newIndex })
  }
  render(){
    const { activeIndex } = this.state
    const data = this.props.data

    return (
      <div>
        {data.length>0?<Header>Les teves rutes recomenades són...:</Header>:null}
        {data.map((r,i)=>{
          return (<Accordion>
          <Accordion.Title
            active={activeIndex === i}
            index={i}
            onClick={this.handleClick}
          >
            <Icon name='dropdown'/>
            {`${r.name}`}
            
          </Accordion.Title>
          <Accordion.Content active={activeIndex === i}>
          <Grid stackable columns={3}>
          <Grid.Row>
            {json.routes.map((r)=>{
              return (
                <Grid.Column>
                <Card>
                  <Card.Content>
                    <Map2 points={getPoints(r)} width={260} height={400}/>
                    <Card.Header>{r.type}</Card.Header>
                    {r.via?<Card.Meta>{`Via ${r.via}`}</Card.Meta>:null}
                    <Card.Description>
                      {getDescription(r)}
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                  <List>
                      <List.Item icon='eur' content={getPrice(r)*freq} />
                      <List.Item icon='clock' content={getDuration(r)*freq} />
                      <List.Item 
                        icon='leaf'
                        content={getCO2(r)*freq}
                      />
                      <List.Item
                        icon='heart'
                        content={getHeart(r)}
                      />
                    </List>
                  </Card.Content>
                </Card>
                </Grid.Column>
              )
            })}
          </Grid.Row>
          </Grid>
          </Accordion.Content>
          </Accordion>)
          
        })
      }

      </div>
    )
  }
}

export default App;
