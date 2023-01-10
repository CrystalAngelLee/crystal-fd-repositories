import React, { FC, useState } from 'react'
import { useDrag, DragSourceMonitor } from 'react-dnd'
import Box from './Box'

const DraggableBox:FC<any> = (props) => {
    const [forbidDrag, setForbidDrag] = useState(false)
    const [{ isDragging }, drag] = useDrag(
        () => ({
          type: 'yellow',
          canDrag: !forbidDrag,
          beginDrag: (props:any) => {
              // console.log('props', props);
            const { id, title, left, top } = props
            return { id, title, left, top }
          },
          collect: (monitor: DragSourceMonitor) => ({
            // connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
          }),
        }),
        [forbidDrag],
      )

    const getStyle = (): React.CSSProperties => {
        const { left, top } = props;
    
        const transform = `translate(${left}px, ${top}px)`
        return {
          position: 'absolute',
          transform,
        }
      }
    return (
        <div ref={drag} role="SourceBox" style={getStyle()}>
        <Box {...props}/>
      </div>
    )
}

export default DraggableBox
