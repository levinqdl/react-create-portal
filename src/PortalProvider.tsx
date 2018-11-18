import React from "react"
import SlotContext, { ISlotContext } from "./SlotContext"

const { Provider } = SlotContext

class PortalProvider extends React.Component<{}, ISlotContext> {
  counter: number = 0
  addSlot = (element: HTMLDivElement) => {
    const key = `s${this.counter++}`
    this.setState(({ slots }) => ({
      slots: {
        ...slots,
        [key]: element,
      },
    }))
    return key
  }
  state: ISlotContext = {
    slots: {},
    addSlot: this.addSlot,
  }
  render() {
    const { children } = this.props
    return <Provider value={this.state}>{children}</Provider>
  }
}
export default PortalProvider
