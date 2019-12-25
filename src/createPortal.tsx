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

interface SlotProps {
  className?: string
  style?: CSSProperties
  payload?: any
}

type ISlot = SFC<SlotProps>

const createPortal: () => [ISlot, ISlotRender] = () => {
  let key: string

  const Slot = ({ payload, ...props }: SlotProps) => {
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

  const SlotRender: ISlotRender = ({ children }) => (
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
  return [Slot, SlotRender]
}

export default createPortal
