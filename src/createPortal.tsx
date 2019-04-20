import React, {
  createRef,
  RefObject,
  SFC,
  ComponentClass,
  CSSProperties,
} from "react"
import ReactDOM from "react-dom"
import SlotContext from "./SlotContext"

type ISlotRender = SFC<{}>

interface SlotProps {
  className?: string
  style?: CSSProperties
}

type ISlot = ComponentClass<SlotProps>

const createPortal: () => [ISlot, ISlotRender] = () => {
  let key: string

  class Slot extends React.Component {
    static contextType = SlotContext
    context: any
    elem: RefObject<HTMLDivElement> = createRef()
    componentDidMount() {
      key = this.context.addSlot(this.elem.current)
    }
    render() {
      return <div ref={this.elem} {...this.props} />
    }
  }

  const SlotRender: ISlotRender = ({ children }) => (
    <SlotContext.Consumer>
      {({ slots }) => {
        const elem = slots[key]
        return elem ? ReactDOM.createPortal(children, elem) : null
      }}
    </SlotContext.Consumer>
  )
  return [Slot, SlotRender]
}

export default createPortal
