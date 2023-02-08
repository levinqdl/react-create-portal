import React from "react"
import SlotContext, { ISlotContext } from "./SlotContext"

const { Provider } = SlotContext

class PortalProvider extends React.Component<{}, ISlotContext> {
  counter: number = 0
  registerSlot = (element: HTMLDivElement) => {
    const key = `s${this.counter++}`
    this.setState(({ slots }) => ({
      slots: {
        ...slots,
        [key]: { element, payload: null, renders: 0 },
      },
    }))
    return key
  }
  removeSlot = (key: string) => {
    this.setState(({ slots }) => {
      const newSlots = { ...slots }
      delete newSlots[key]

      return {
        slots: {
          ...newSlots,
        },
      }
    })
  }
  registerRender = (key: string) => {
    this.setState(({ slots }) => {
      const slot = slots[key]
      if (!slot) {
        return null
      }

      return {
        slots: {
          ...slots,
          [key]: { ...slot, renders: slot.renders + 1 },
        },
      }
    })
    return () => {
      this.setState(({ slots }) => {
        const slot = slots[key]
        if (!slot) {
          return null
        }

        return {
          slots: {
            ...slots,
            [key]: { ...slot, renders: slot.renders - 1 },
          },
        }
      })
    }
  }
  setPayload = (key: string, payload: any) => {
    this.setState(({ slots }) => {
      const slot = slots[key]
      return {
        slots: {
          ...slots,
          [key]: { ...slot, payload },
        },
      }
    })
  }
  state: ISlotContext = {
    slots: {},
    registerSlot: this.registerSlot,
    removeSlot: this.removeSlot,
    setPayload: this.setPayload,
    registerRender: this.registerRender,
  }
  render() {
    const { children } = this.props
    return <Provider value={this.state}>{children}</Provider>
  }
}
export default PortalProvider
