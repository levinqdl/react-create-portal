import React, { useContext } from "react"
import PortalProvider from "./PortalProvider"
import { render, within } from "@testing-library/react"
import SlotContext from "./SlotContext"
import createPortal from "./createPortal"

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

  it("state should be cleaned up after unmounting Slot", () => {
    const [Slot, Render] = createPortal()
    const ActiveSlotCount = () => {
      const { slots } = useContext(SlotContext)

      return <div>Active slots count: {Object.keys(slots).length}</div>
    }

    const { getByText, rerender } = render(
      <PortalProvider>
        <div>
          Hello Portal <Slot />
        </div>
        <Render>Layout!</Render>
        <ActiveSlotCount />
      </PortalProvider>
    )
    const slotContainer = getByText("Hello Portal")
    expect(slotContainer).toBeVisible()
    expect(within(slotContainer).getByText("Layout!")).toBeVisible()
    expect(getByText("Active slots count: 1")).toBeVisible()

    expect(() =>
      rerender(
        <PortalProvider>
          <div>Hello Portal</div>
          <Render>Layout!</Render>
          <ActiveSlotCount />
        </PortalProvider>
      )
    ).not.toThrowError()

    expect(getByText("Active slots count: 0")).toBeVisible()

    expect(() =>
      rerender(
        <PortalProvider>
          <div>Hello Portal</div>
          <ActiveSlotCount />
        </PortalProvider>
      )
    ).not.toThrowError()
  })
})
