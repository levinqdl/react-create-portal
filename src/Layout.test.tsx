import React from 'react'
import Layout from './Layout'
import { render } from "react-testing-library"

describe('Layout', () => {
  it("renders full viewport", () => {
    const { getByTestId } = render(<Layout />)
    const layout = getByTestId("layout")
    expect(layout.style).toMatchObject({ width: "100vw", height: "100vh" })
  })
})