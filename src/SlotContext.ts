import React from "react"

interface Slot {
  element: HTMLElement
  payload: any
}

interface SlotElements {
  [key: string]: Slot
}

export interface ISlotContext {
  slots: SlotElements
  registerSlot: (element: HTMLElement) => string
  setPayload: (key: string, payload: any) => void
}

const defaultKey = "body"
const slots: SlotElements = {
  [defaultKey]: { element: null, payload: null },
}

export default React.createContext<ISlotContext>({
  slots,
  registerSlot: element => {
    slots[defaultKey] = {
      element,
      payload: null,
    }
    return defaultKey
  },
  setPayload: (key, payload) => {
    slots[key] = {
      ...slots[key],
      payload,
    }
  },
})
