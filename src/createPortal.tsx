import React, {
  CSSProperties,
  SFC,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect,
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

type ISlot = SFC<SlotProps>

const createPortal: () => [ISlot, ISlotRender] = () => {
  let key: string

  const Slot = ({ payload, ...props }: SlotProps) => {
    const elem = useRef(null)
    const container = useRef(null)
    const { registerSlot: addSlot, setPayload, slots } = useContext(SlotContext)
    useLayoutEffect(() => {
      elem.current = document.createElement("div")
      key = addSlot(elem.current)
    }, [])
    useEffect(() => {
      setPayload(key, payload)
    }, [payload])
    useLayoutEffect(() => {
      if (container.current && elem.current) {
        container.current.appendChild(elem.current)
      }
    })
    return (
      (key && slots[key] && slots[key].renders && (
        <div ref={container} {...props} />
      )) ||
      null
    )
  }

  const SlotRender: ISlotRender = ({ children }) => {
    const { slots, registerRender } = useContext(SlotContext)
    useEffect(() => registerRender(key), [])
    return (
      <SlotContext.Consumer>
        {({ slots }) => {
          const { element: elem, payload } = slots[key] || {}
          return elem
            ? ReactDOM.createPortal(
                typeof children === "function" ? children(payload) : children,
                elem
              )
            : null
        }}
      </SlotContext.Consumer>
    )
  }
  return [Slot, SlotRender]
}

export default createPortal
