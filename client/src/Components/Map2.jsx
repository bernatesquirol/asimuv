import React, { useState, PureComponent } from 'react';
import ReactMapGL, { Marker, CanvasOverlay }from 'react-map-gl';
import { Icon } from 'semantic-ui-react'
class PolylineOverlay extends PureComponent {
    _redraw ({ width, height, ctx, isDragging, project, unproject }) {
      const { points, color = 'black', lineWidth = 2, renderWhileDragging = true } = this.props
      ctx.clearRect(0, 0, width, height)
      ctx.globalCompositeOperation = 'lighter'
  
      if ((renderWhileDragging || !isDragging) && points) {
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = color
        ctx.beginPath()
        points.forEach(point => {
          const pixel = project([point[0], point[1]])
          ctx.lineTo(pixel[0], pixel[1])
        })
        ctx.stroke()
      }
    }
  
    render () {
      return <CanvasOverlay redraw={this._redraw.bind(this)} />
    }
}

function Map(props) {
    const points =props.points 
    // [{
    //     lat: 41.3870154,
    //     long: 2.1700471,
    //     color:'olive'
    // }, {
    //     lat: 41.3870154,
    //     long: 2.1701471,
    //     color:'orange'
    // }]//props.points
    const [viewport, setViewport] = useState({
        width: props.width,
        height: props.height,
        latitude: points.reduce((prev, current)=>prev+current.lat,0)/points.length,
        longitude: points.reduce((prev, current)=>prev+current.long,0)/points.length,
        bearing: -44.4105,
        zoom: 14
    });
    
    return (
    <ReactMapGL
        mapboxApiAccessToken={"pk.eyJ1IjoiYmVybmF0ZXNxdWlyb2wiLCJhIjoiY2s4MXFneWVkMHJzaDNkcnV3NjE4czlzNCJ9.MxSlFFg9k2o_ad_G_A3gug"}
        {...viewport}
        onViewportChange={setViewport}
        mapStyle={'mapbox://styles/bernatesquirol/ck82o72do39201iod1pno8huk'}
    >
        {/* <PolylineOverlay points={points} /> */}
        {points.map(p=><Marker latitude={p.lat} longitude={p.long}><Icon name='map marker' color={p.color}></Icon></Marker>)}
    </ReactMapGL>
    );
}
export default Map