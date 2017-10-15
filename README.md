# react-virtualist

💀🚟 Just a dead-simple react library to render big list (`~1M`) by rendering only visible elements (with a few offset of course)

## Pros
* Render only if needed & visible
* Few dependencies (only `react` and `prop-types`)
* Dead-simple (see [KISS principle](https://en.wikipedia.org/wiki/KISS_principle))
* Self-contained (no alteration on `parent`)
* Scroll attached to `body`
* Valid wrapper component `height`
* No problems if `header` or `footer`
* "Fast" update (use `vlid`, check `complex` example with 1M items re-rendered every `100ms`, and try to scroll)
* Configurable `offset`
* Compatible with `placeholder`

## Cons
* Only `horizontal`
* Only `body` scroll
* Fixed item `height`

## Example
*Tips: use a parent when rendering your item, specific item style can alter your component style & behavior*

### Simple
```js
import React, {Component} from 'react'
import VirtuaList from 'react-virtualist'

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
```

### Complex
*Usage with placeholders, prefer simple variable for items (string or number), object are complex to compare and so the library feature of render only if visible will not work*

```js
import React, {Component} from 'react'
import VirtuaList from 'react-virtualist'

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
```

## Build
Commit anything before running theses commands, then:
* `npm build`
* `npm version x.x.x`
* `git push --tags`
* `git push`
* `npm publish`

## More
* [Smooth Scrolling with VirtualScroll](http://www.everyday3d.com/blog/index.php/2014/08/18/smooth-scrolling-with-virtualscroll/)
* [Virtual Scrolling](https://sergimansilla.com/blog/virtual-scrolling/)
* [Large list rendering in javascript](https://stackoverflow.com/questions/17626717/large-list-rendering-in-javascript)
* [Infinite Scroller by Google](https://developers.google.com/web/updates/2016/07/infinite-scroller)
* [How to scroll and view millions of records](https://www.codeproject.com/Articles/1111364/How-to-scroll-and-view-millions-of-records)

## Thanks
* Build with [nwb](https://github.com/insin/nwb/blob/master/docs/guides/ReactComponents.md#building-and-publishing)
