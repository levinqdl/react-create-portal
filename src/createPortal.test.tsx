import React from "react"
import { render, within } from "@testing-library/react"
import PortalProvider from "./PortalProvider"
import createPortal from "./createPortal"

describe("Slot", () => {
  it("renders a portal", () => {
    const [Slot, Render] = createPortal()
    const { getByText } = render(
      <PortalProvider>
        <div>
          Awesome <Slot />
        </div>
        <Render>Portal Layout</Render>
      </PortalProvider>
    )
    const slotContainer = getByText("Awesome")
    within(slotContainer).getByText("Portal Layout")
  })
  it("reveive style & className", () => {
    const [Slot, Render] = createPortal()
    const { getByText, container } = render(
      <PortalProvider>
        <div>
          Slot Container <Slot className="slot" style={{ display: "inline" }} />
        </div>
        <Render>Styled</Render>
      </PortalProvider>
    )
    const slot = getByText("Styled").parentElement
    expect(slot.classList.contains("slot")).toBeTruthy()
    expect(slot.style).toMatchObject({ display: "inline" })
    expect(container.firstChild).toMatchSnapshot()
  })
  test("pass data from Slot to Render", () => {
    const [Slot, Render] = createPortal()
    const { getByText } = render(
      <PortalProvider>
        <div>
          Awesome <Slot payload={{ data: "payload" }} />
        </div>
        <Render>{(payload: any) => <>Portal Layout {payload.data}</>}</Render>
      </PortalProvider>
    )
    const slotContainer = getByText("Awesome")
    within(slotContainer).getByText("Portal Layout payload")
  })
  it("hides Slot if no Render", () => {
    const [Slot, Render] = createPortal()
    const { getByText } = render(
      <PortalProvider>
        <div>
          Awesome <Slot id="slot" />
        </div>
      </PortalProvider>
    )
    expect(document.querySelector("#slot")).toBeNull()
  })
})
