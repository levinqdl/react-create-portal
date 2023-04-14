import React, {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react"
import ReactDOM from "react-dom"
import SlotContext from "./SlotContext"

type ISlotRender = FC<{}>

type SlotProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & {
  payload?: any
  fallback?: ReactNode
}

export type ISlot = React.FC<SlotProps>

const createPortal: () => [ISlot, ISlotRender, () => number] = () => {
  let key: string

  const Slot: ISlot = ({ payload, fallback, children, ...props }) => {
    const elem = useRef(null)
    const { registerSlot: addSlot, removeSlot, setPayload, slots } = useContext(
      SlotContext
    )
    useLayoutEffect(() => {
      key = addSlot(elem.current)

      return () => {
        removeSlot(key)
      }
    }, [])
    useEffect(() => {
      setPayload(key, payload)
    }, [payload])
    return (
      <div ref={elem} {...props}>
        {children ?? (slots[key]?.renders ? null : <>{fallback}</>)}
      </div>
    )
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
