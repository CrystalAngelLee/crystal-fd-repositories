/* 框架 */
import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
/* public */
import { useRootStore } from "../../store";
/* page */
import { style } from "./styles";
import { StyledProps, CanvasProps, ResProps, DataProps } from "./index.d";
// import { getCanvasConfig } from "./utils";
/* components */
import Form from "../../components/Form";
import Button from "../../pubcomp/Button";
import Loading from "../../pubcomp/Loading";
import { res_data } from "./mock";

// const { TabPane } = Tabs;
const defaultState = {
  loading: true,
  right: false
}

const Canvas: FC<CanvasProps> = ({ className: prefixCls, ...props }) => {
  const { canvasStore: store } = useRootStore();
  if (!store) throw new Error("");
  const { formStore } = store;
  const [inSubConf, setInSubConf] = useState<boolean>(false);
  const [state, setState] = useState(defaultState)
  const [data, setData] = useState<DataProps>()
  useEffect(() => {
    (async function() {
      setState({...state, loading: true})
      const result: ResProps = await new Promise((resolve) => {
        resolve(res_data)
      })
      setState({ loading: false, right: result.data.status === 1})
      setData(result.data)
    })()
  }, [])
  // let $canvasConfig = getCanvasConfig(formStore.formData);

  const $onChange = () => {
    // $canvasConfig = getCanvasConfig(formStore.formData);
  };

  const onChangeMode = () => setInSubConf(!inSubConf);
  let child
  if (state.loading) child = <Loading/>
  else if (!state.loading && !state.right) child = <h2>页面加载失败，请联系管理员</h2>
  else if (!data?.datas) child = <h2>页面加载失败，请联系管理员</h2>
  else {
    const { name } = data.datas
    child = [
      <div className={`${prefixCls}-canvas`} key="canvas"></div>,
        <div className={`${prefixCls}-panel`} key="panel">
          <section className={`${prefixCls}-panel-floor`}>
            <header className='header'>
              <span className='header-title'>{name}</span>
              <div className='header-ops'>
                <Button>保存</Button>
              </div>
            </header>
            <main className='main'>
              <nav className='main-header'>
                <Button
                  type='fastener'
                  className='main-header-btn'
                  onClick={onChangeMode}
                >
                  展开画布
                </Button>
              </nav>
              {/* <Form store={formStore} onChange={$onChange} /> */}
            </main>
          </section>
          {/* <header className={`${prefixCls}-panel-header`}>
              <div className={`${prefixCls}-panel-ops`}>
                <Button type='primary' onClick={onChangeMode}>
                  {CONSTNAME.CANVASSET}
                </Button>
                <Button type='primary'>{CONSTNAME.SAVE}</Button>
              </div>
            </header> */}
          {/* {inSubConf ? (
                <React.Fragment>
                  <aside className={`${prefixCls}-menu`}>
                    <Tabs>
                      <TabPane key='added' tab='已添加'></TabPane>
                      <TabPane key='canAdded' tab='可添加'>
                        {menuList.map((item) => (
                          <div className={`${prefixCls}-menu-item`} key={item.id}>
                            {item.name}
                          </div>
                        ))}
                      </TabPane>
                    </Tabs>
                  </aside>
                  <section className={`${prefixCls}-submain`}>
                    <div>canvas</div>
                    <div>
                      <Form store={formStore} onChange={$onChange} />
                    </div>
                  </section>
                </React.Fragment>
              ) : ( */}
        </div>
    ]
  }
  return (
    <div className={prefixCls}>
      {child}
    </div>
  );
};

export default styled(observer(Canvas))<StyledProps>`
  ${style}
`;

export type { CanvasStoreProps } from "./index.d";
