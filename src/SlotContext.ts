import React from "react"

interface Slot {
  element: HTMLElement
  payload: any
  renders: number
}

interface SlotElements {
  [key: string]: Slot
}

export interface ISlotContext {
  slots: SlotElements
  registerSlot: (element: HTMLElement) => string
  registerRender: (key: string) => void
  setPayload: (key: string, payload: any) => void
}

const defaultKey = "body"
const slots: SlotElements = {
  [defaultKey]: { element: null, payload: null, renders: 0 },
}

export default React.createContext<ISlotContext>({
  slots,
  registerSlot: element => {
    slots[defaultKey] = {
      element,
      payload: null,
      renders: 0,
    }
    return defaultKey
  },
  registerRender: () => {
    slots[defaultKey].renders++
  },
  setPayload: (key, payload) => {
    slots[key] = {
      ...slots[key],
      payload,
    }
  },
})
