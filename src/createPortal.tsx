import React, {
  SFC,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"
import ReactDOM from "react-dom"
import SlotContext from "./SlotContext"

type ISlotRender = SFC<{}>

type SlotProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  payload?: any
}

export type ISlot = React.FC<SlotProps>

const createPortal: () => [ISlot, ISlotRender, () => number] = () => {
  let key: string

  const Slot: ISlot = ({ payload, ...props }) => {
    const elem = useRef(null)
    const { registerSlot: addSlot, setPayload } = useContext(SlotContext)
    useLayoutEffect(() => {
      key = addSlot(elem.current)
    }, [])
    useEffect(() => {
      setPayload(key, payload)
    }, [payload])
    return <div ref={elem} {...props} />
  }

  const SlotRender: ISlotRender = ({ children }) => {
    const { slots, registerRender } = useContext(SlotContext)
    useEffect(() => registerRender(key), [])
    const { element: elem, payload } = slots[key] || {}
    return elem
      ? ReactDOM.createPortal(
          typeof children === "function" ? children(payload) : children,
          elem
        )
      : null
  }
  const useCountRenders = () => {
    const { slots } = useContext(SlotContext)
    const slot = slots[key]
    return slot ? slot.renders : 0
  }
  return [Slot, SlotRender, useCountRenders]
}

export default createPortal
