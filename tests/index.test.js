import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import VirtuaList from 'src/index.js'

describe('VirtuaList', () => {
  let node

  beforeEach(() => {
    node = document.createElement('div')
  })

  afterEach(() => {
    unmountComponentAtNode(node)
  })

  it('should return an empty relative div', () => {
    render(<VirtuaList/>, node, () => {
      expect(node.innerHTML).toContain('<div style="position: relative; height: 0px;"></div>')
    })
  })
})
