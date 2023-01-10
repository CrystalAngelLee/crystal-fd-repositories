import React, { useEffect } from 'react'

function Cart({ cart, getCartProducts, changeProductNumber, deleteProduct}) {
    useEffect(() => {
        // 请求购物车列表
        getCartProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 
    return (
        <section className="container content-section">
            <h2 className="section-header">购物车</h2>
            <div className="cart-row">
                <span className="cart-item cart-header cart-column">商品</span>
                <span className="cart-price cart-header cart-column">价格</span>
                <span className="cart-quantity cart-header cart-column">数量</span>
            </div>
            <div className="cart-items">
                {
                    cart.map(({ id, price, thumbnail, title, count }) => {
                        const onChangeProductNumber = (e) => {
                            changeProductNumber({ cid: id, count: e.target.value})
                        }
                        const onDeleteProduct = () => deleteProduct(id)
                        return (
                            <div className="cart-row" key={id}>
                                <div className="cart-item cart-column">
                                    <img alt='' className="cart-item-image" src={`http://localhost:3005${thumbnail}`} width="100" height="100" />
                                    <span className="cart-item-title">{title}</span>
                                </div>
                                <span className="cart-price cart-column">￥{price}</span>
                                <div className="cart-quantity cart-column">
                                    <input className="cart-quantity-input" type="number" value={count} onChange={onChangeProductNumber} />
                                    <button className="btn btn-danger" type="button" onClick={onDeleteProduct}>删除</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="cart-total">
                <strong className="cart-total-title">总价</strong>
                <span className="cart-total-price">￥{cart.reduce((total, product) => {
                    return total += product.count * product.price
                }, 0)}</span>
            </div>
        </section>
    )
}

export default Cart

