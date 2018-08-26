import React, {Component} from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  items: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
  render: PropTypes.func.isRequired,
  offset: PropTypes.number
}

const defaultProps = {
  items: [],
  height: 10,
  render: (item, index, style) => {},
  offset: 2
}

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fragment: [],
      start: 0,
      stop: 0,
    }

    this.references = {
      element: React.createRef()
    }

    this.handleScroll = this.handleScroll.bind(this)
    this.compute = this.compute.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
    window.addEventListener('resize', this.handleScroll)

    this.compute(true)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleScroll)
  }

  componentDidUpdate(props) {
    const previous = props.items
    const next = this.props.items

    let diff = (previous.length !== next.length)
    let recompute = false
    let gap = false
    let visible = false

    for (let index = 0; index < next.length; index++) {
      gap = previous[index] !== next[index]
      visible = index >= this.state.start && index <= this.state.stop

      if (diff || (gap && visible)) {
        recompute = true
        break
      }
    }

    if (recompute) {
      this.compute(true)
    }
  }

  handleScroll(e) {
    this.compute()
  }

  compute(force = false) {
    const fragment = []

    const total = this.props.items.length

    const height = Math.max(window.innerHeight, 320)
    const top = Math.min(Math.max(window.pageYOffset - (this.references.element.current.offsetTop || 0), 0), Math.max((this.props.height * total) - height, 0))
    const bottom = top + height

    const count = Math.ceil(height / this.props.height)
    const start = Math.max(Math.floor(top / this.props.height) - this.props.offset, 0)
    const stop = Math.min(start + count + (this.props.offset * 2), total)

    if (force || start !== this.state.start || stop !== this.state.stop) {
      for (let i = start; i < stop; i++) {
        fragment.push(this.props.render(this.props.items[i], i, {
          position: 'absolute',
          height: this.props.height + 'px',
          top: (this.props.height * i) + 'px'
        }))
      }

      this.setState({
        start,
        stop,
        fragment
      })
    }
  }

  render() {
    const style = {
      position: 'relative',
      height: (this.props.height * this.props.items.length) + 'px'
    }

    return (
      <div ref={this.references.element} className={this.props.className} style={Object.assign({}, this.props.style, style)}>
        { this.state.fragment }
      </div>
    )
  }
}

List.propTypes = propTypes
List.defaultProps = defaultProps

export default List
