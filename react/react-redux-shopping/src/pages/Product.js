import React, { useEffect } from 'react'

function Product({ products, loadProducts, addProductToCart, ...props }) {
    useEffect(() => {
        // 向服务器端发送请求 获取商品列表数据
        loadProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <section className="container content-section">
            <h2 className="section-header">商品列表</h2>
            <div className="shop-items">
                {products.map(({ id, price, thumbnail, title }) => {
                    const onAddProductToCart = () => {
                        addProductToCart(id)
                    }
                    return (
                        <div className="shop-item" key={id}>
                            <img alt='' className="shop-item-image" src={`http://localhost:3005${thumbnail}`} />
                            <span className="shop-item-title">{title}</span>
                            <div className="shop-item-details">
                                <span className="shop-item-price">￥{price}</span>
                                <button className="btn btn-primary shop-item-button" type="button" onClick={onAddProductToCart}>加入购物车</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Product