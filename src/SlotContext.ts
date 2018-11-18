import React from "react"
import { element } from "prop-types"

export interface ISlotContext {
  slots: {
    [key: string]: HTMLDivElement
  }
  addSlot: (element: HTMLDivElement) => string
}

export default React.createContext<ISlotContext>({
  slots: {},
  addSlot: element => "",
})
