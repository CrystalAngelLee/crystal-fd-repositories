import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import { Modal } from 'antd';
import { style } from "./styles";
import { CanvasListProps, StyledProps } from "./index.d";
import { canvasList } from "../../constances/mock";
import { useParentPath } from "../../utils";
import Muzi from "../../constances/images/muzi.jpeg";
import Button from "../../pubcomp/Button";

const CanvasList: FC<CanvasListProps> = ({ className: prefixCls }) => {
  let navigate = useNavigate();
  let location = useParentPath();
  const $onCanvasClick = (id: string) => {
    navigate(`${location}/canvas/${id}`);
  }
  const [visible, setVisible] = useState(false)

  /**
   * 新建模板
   * 打开弹窗
   */
  const $onNewTemplate = () => {
    setVisible(true)
  }

  /**
   * 关闭弹窗
   */
  const $onCancel = () => {
    setVisible(false)
  }

  return (
    <div className={prefixCls}>
      <section className={`${prefixCls}-header`}>
        <Button onClick={$onNewTemplate}>new</Button>
      </section>
      <section className={`${prefixCls}-list`}>
        {canvasList.map(({ id, name, image }) => {
          const onCanvasClick = () => $onCanvasClick(id);
          return (
            <article
              key={id}
              className={`${prefixCls}-item`}
              onClick={onCanvasClick}
            >
              <div className='image'>
                <img src={image || Muzi} alt='' />
              </div>
              <p className='title'>{name}</p>
            </article>
          );
        })}
      </section>
      <Modal
        title="新增灵活模板"
        visible={visible}
        onOk={$onCancel}
        onCancel={$onCancel}
        okText="确认"
        cancelText="取消"
      >
        模板名称： 
      </Modal>
    </div>
  );
};
export default styled(CanvasList)<StyledProps>`
  ${style}
`;
