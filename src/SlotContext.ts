import React from "react"

interface SlotElements {
  [key: string]: HTMLElement
}

export interface ISlotContext {
  slots: SlotElements
  registerSlot: (element: HTMLElement) => string
}

const defaultKey = "body"
const slots: SlotElements = {}

export default React.createContext<ISlotContext>({
  slots,
  registerSlot: element => {
    slots[defaultKey] = element
    return defaultKey
  },
})
