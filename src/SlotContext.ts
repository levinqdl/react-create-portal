import React from "react"

interface SlotElements {
  [key: string]: HTMLElement
}

export interface ISlotContext {
  slots: SlotElements
  addSlot: (element: HTMLElement) => string
}

const defaultKey = "body"
const slots: SlotElements = {}

export default React.createContext<ISlotContext>({
  slots,
  addSlot: element => {
    slots[defaultKey] = element
    return defaultKey
  },
})
