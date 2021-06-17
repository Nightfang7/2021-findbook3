import React, { useContext, useEffect } from 'react'
import { Carousel } from "antd";
import { Link } from "react-router-dom"
import CarouselList from './CarouselList';
import { StoreContext } from "../store"
import { getTitle } from "../util"
import { setPage } from "../action";

function Mycarousel() {
    const { state: { page: {title, products}, producttype1, producttype2  }, dispatch } = useContext(StoreContext);
    console.log(producttype1.products)
    console.log(products)
    useEffect(() => {
        const url = "/store";
        setPage(dispatch, url, getTitle(url))
    }, []);
    const contentStyle = {
        height: '500px',
        color: '#fff',
        lineHeight: '500px',
        textAlign: 'center',
        background: '#D6D5C9',
    };
    return (
        <div className="carousel-container">
            <div className="container carousel" >
                
                <Carousel autoplay dotPosition="right">
                    <div className="slider-container" style={contentStyle}>
                        <Link to="/store/newest">
                            <span className="carousel-title">最新上架</span>
                        </Link>
                    
                        <div className="slider">
                            <CarouselList CarouselProducts={producttype1.products} />
                        </div>
                    </div>
                    <div className="slider-container" style={contentStyle}>
                        <Link to="/store/topproduct">
                            <span className="carousel-title">TOP熱銷</span>
                        </Link>
                        
                        <div className="slider">
                            <CarouselList CarouselProducts={producttype2.products} />
                        </div>
                    </div>
                    <div className="slider-container" style={contentStyle}>
                        <Link to="/store/newest">
                            <span className="carousel-title">最新上架</span>
                        </Link>
                    
                        <div className="slider">
                            <CarouselList CarouselProducts={producttype1.products} />
                        </div>
                    </div>
                    <div className="slider-container" style={contentStyle}>
                        <Link to="/store/topproduct">
                            <span className="carousel-title">TOP熱銷</span>
                        </Link>
                        
                        <div className="slider">
                            <CarouselList CarouselProducts={producttype2.products} />
                        </div>
                    </div>
                </Carousel>
            </div>
        </div>
       
    )
}

export default Mycarousel
