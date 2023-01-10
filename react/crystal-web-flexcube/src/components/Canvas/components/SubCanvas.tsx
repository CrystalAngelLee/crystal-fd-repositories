import styled from "@emotion/styled";
import React, { FC, useState } from "react";
import { StyledProps, SubCanvasProps } from "../canvas.types";
import { subCanvasStyle as style } from "../styles";
import { useDrop } from "react-dnd";
// import DraggableBox from './DraggableBox';
export const ItemTypes = {
  BOX: "box",
};

//  type boxtype ={
//     [_:string]: any
// }

const SubCanvas: FC<SubCanvasProps> = ({ className: prefixCls, greedy }) => {
  const [, /* hasDropped */ setHasDropped] = useState(false);
  const [, /* hasDroppedOnChild */ setHasDroppedOnChild] = useState(false);
  // const [/* boxes, */ /* setBoxes */] = useState<boxtype>({
  //   a: { top: 20, left: 80, title: 'Drag me around' },
  //   b: { top: 180, left: 20, title: 'Drag me too' },
  // })
  const [, /* { isOver, isOverCurrent } */ drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: unknown, monitor) {
        // console.log('item', item, 'monitor', monitor);
        const didDrop = monitor.didDrop();
        if (didDrop && !greedy) {
          return;
        }
        setHasDropped(true);
        setHasDroppedOnChild(didDrop);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [greedy, setHasDropped, setHasDroppedOnChild]
  );

  //   const Image = styled.img`
  //   width: 100px;
  // `

  return (
    <div ref={drop}>
      {/* {Object.keys(boxes).map((item:string) => <DraggableBox {...boxes[item]} id={item} key={item} />)} */}
      {/* <Image alt='商品图片' src={IMG} draggable={false}  /> */}
    </div>
  );
};

export default styled(SubCanvas)<StyledProps>`
  ${style}
`;
