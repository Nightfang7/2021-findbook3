import React, { useContext, useEffect } from 'react'
import Carousel from './Carousel'
import TopproductList from './TopproductList';
import TopProduct from '../json/Topproduct.json';
import Ad from './ad';
import { StoreContext } from "../store"
import { getTitle } from "../util"
import { setPage } from "../action";


function Homecontent() {
    const { state: { page: {title, products} }, dispatch } = useContext(StoreContext);
    useEffect(() => {
        const url = "/store/topproduct";
        setPage(dispatch, url, getTitle(url))
    }, []);
    return (
        <div className="container content-container">
            <Carousel />
            <TopproductList TopProduct={products} />
            <Ad />
        </div>
        
    );
}

export default Homecontent
