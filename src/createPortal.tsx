import React, {
  CSSProperties,
  SFC,
  useContext,
  useRef,
  useLayoutEffect,
  useEffect,
  MutableRefObject,
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
  let payloadRef: MutableRefObject<any>

  const Slot = ({ payload, ...props }: SlotProps) => {
    const elem = useRef(null)
    payloadRef = useRef(payload)
    const { registerSlot: addSlot } = useContext(SlotContext)
    useLayoutEffect(() => {
      key = addSlot(elem.current)
    }, [])
    useEffect(() => {
      payloadRef.current = payload
    })
    return <div ref={elem} {...props} />
  }

  const SlotRender: ISlotRender = ({ children }) => (
    <SlotContext.Consumer>
      {({ slots }) => {
        const elem = slots[key]
        return elem
          ? ReactDOM.createPortal(
              typeof children === "function"
                ? children(payloadRef.current)
                : children,
              elem
            )
          : null
      }}
    </SlotContext.Consumer>
  )
  return [Slot, SlotRender]
}

export default createPortal
