import React from "react"
import { render, within } from "react-testing-library"
import Layout from "./Layout"
import createPortal from "./createPortal"

describe("Slot", () => {
  it("renders a portal", () => {
    const Portal = createPortal()
    const { getByText } = render(
      <Layout>
        <div>
          Awesome <Portal.Slot />
        </div>
        <Portal.Render>Portal Layout</Portal.Render>
      </Layout>
    )
    const slotContainer = getByText("Awesome")
    within(slotContainer).getByText("Portal Layout")
  })
  it("reveive style & className", () => {
    const Portal = createPortal()
    const { getByText, container } = render(
      <Layout>
        <div>
          Slot Container{" "}
          <Portal.Slot className="slot" style={{ display: "inline" }} />
        </div>
        <Portal.Render>Styled</Portal.Render>
      </Layout>
    )
    const slot = getByText("Styled")
    expect(slot.classList.contains("slot")).toBeTruthy()
    expect(slot.style).toMatchObject({ display: "inline" })
    expect(container.firstChild).toMatchSnapshot()
  })
})
