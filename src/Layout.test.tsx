import React from 'react'
import Layout from './Layout'
import { render } from "react-testing-library"

describe('Layout', () => {
  it("renders full viewport", () => {
    const { container, getByText } = render(<Layout><div>Hello Portal Layout!</div></Layout>)
    getByText("Hello Portal Layout!")
    const layout = container.firstChild
    expect(layout).toHaveStyleRule('width', '100vw')
    expect(layout).toHaveStyleRule('height', '100vh')
    expect(layout).toMatchSnapshot()
  })
})