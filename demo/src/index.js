import React, {Component} from 'react'
import {render} from 'react-dom'

import VirtuaList from '../../src'

class Simple extends Component {
  render(){
    return (
      <div>
        <h1 style={{height: '200vh', background: 'green'}}>Header</h1>
        <VirtuaList
          height={100}
          items={[
            'Henry Fonda',
            'Lee J. Cobb',
            'Martin Balsam',
            'Jack Klugman',
            'Ed Begley',
            'John Fiedler',
            'E. G. Marshall',
            'Jack Warden',
            'Joseph Sweeney',
            'Robert Webb',
            'Jiri Voskovec',
            'Ed Binns',
            'Rudy Bond',
            'Billy Nelson'
          ]}
          render={(actor, index, style) => {
            return (
              <div key={index} style={Object.assign({ background: 'red' }, style)} vlid={'vlid' + index}>
                <p>Hello #{actor}</p>
              </div>
            )
          }}
        />
        <h1 style={{height: '200vh', background: 'blue'}}>Footer</h1>
      </div>
    )
  }
}

class Complex extends Component {
  constructor(props){
    super(props)

    this.state = {
      videos: [
        'FKkhLWjN_I4',
        'J3sq8tculJM',
        '0U_g1z1CeqU',
        '405EwMgtlyg',
        'FmUDe7P0fzg',
        'ENMrJoEwO4Q',
        'QDdSSQpua_g',
        '8Ri-sT8DVeg',
        'v-e7p_IG0nY',
        'eUw9aolPlog',
        'LtrUSZ-Kcns'
      ],
      total: 1000000 // suppose we're currently fetching others and we want placeholders for empty
    }
  }

  componentDidMount(){
    // suppose we're currently fetching others and we want placeholders for empty
    const videos = this.state.videos
    const interval = setInterval(() => {
      videos.push(Math.random().toString(36).substr(2, 11))

      if (videos.length > this.state.total) {
        clearInterval(interval)
      }

      this.setState(videos)
    }, 100)
  }

  render(){
    return (
      <VirtuaList
        height={20}
        items={[].concat(this.state.videos, Array(this.state.total - this.state.videos.length).fill(null))}
        render={(id, row, style) => {
          return (
            <div key={row} style={Object.assign({ width: '100%' }, style)}>
              { id ? <a href={ 'https://youtu.be/' + id }>{ id }</a> : <p>Fetching...</p> }
            </div>
          )
        }}
        offset={5}
        style={{
          width: '100%'
        }}
      />
    )
  }
}

render(
<div>
  <h1>VirtuaList</h1>
  <h3>Simple</h3>
  <Simple />
  <h3>Complex</h3>
  <Complex />
</div>
, document.querySelector('#demo'))
