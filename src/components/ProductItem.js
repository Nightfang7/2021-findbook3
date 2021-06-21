import React, { useContext } from 'react'
import { Card } from "antd"
import { Link } from 'react-router-dom';
import ProductShoppingbag from './ProductShoppingbag';
import { StoreContext } from "../store"
import { setProductDetail } from "../action";

function ProductItem({ product }) {
    const { dispatch } = useContext(StoreContext);
    return (
        <div>
            
            <Card className="BookCard black"> 
                <Link to={`/product/${product.category}/${product.id}`}
                    onClick={() => {
                        setProductDetail(dispatch, product.id, 1);
                    }}
                >
                    <div className="book-size book-shadow"></div>
                    <div className="book-size book-img">
                        <img src={product.image}
                        style={{ width: '100%', height: '100%' }}
                        alt={product.name1} />
                    </div>
                </Link>   
                    {/* 商品資訊 */}
                    <div className="product-info text-white">          
                        <h3 className="product-name text-white">{product.name1}<br/>{product.name2}</h3>
                        <div className="product-shop">
                            <h4 className="price text-white">NT. {product.price} </h4>
                            <ProductShoppingbag product={product} qty={1} />
                        </div>
                    </div>    
            </Card>
             
        </div>
    )
}

export default ProductItem
