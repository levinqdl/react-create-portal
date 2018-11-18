import React from "react"
import PortalProvider from "./PortalProvider"
import { render } from "react-testing-library"

describe("PortalProvider", () => {
  it("renders children", () => {
    const { container, getByText } = render(
      <PortalProvider>
        <div>Hello Portal Layout!</div>
      </PortalProvider>
    )
    getByText("Hello Portal Layout!")
    const layout = container.firstChild as HTMLElement
    expect(layout).toMatchSnapshot()
  })
})
