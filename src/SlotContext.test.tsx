import React, { createRef, RefObject } from "react"
import ReactDOM from "react-dom"
import SlotContext from "./SlotContext"
import { render, within, waitForElement } from "react-testing-library"

const { Consumer } = SlotContext

class Slot extends React.Component {
  static contextType = SlotContext
  context: any
  elem: RefObject<HTMLDivElement> = createRef()
  componentDidMount() {
    this.context.addSlot(this.elem.current)
  }
  render() {
    return <div ref={this.elem} {...this.props} data-testid="slot" />
  }
}

describe("SlotContext", () => {
  it("consumes default slot", async () => {
    const Container = () => (
      <>
        <Slot />
        <Consumer>
          {({ slots: { body } }) =>
            body && ReactDOM.createPortal(<div>hello</div>, body)
          }
        </Consumer>
      </>
    )
    const { container, debug, getByTestId, rerender } = render(<Container />)
    rerender(<Container />)
    await waitForElement(() => within(getByTestId("slot")).getByText("hello"))
    expect(container)
  })
})
