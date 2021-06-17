import React, { useContext, useEffect } from 'react'
import Carousel from './Carousel'
import TopproductList from './TopproductList';
import Ad from './ad';
import { StoreContext } from "../store"
import { getTitle } from "../util"
import { setPage } from "../action";
import ComicBotton from './ComicBotton';


function Homecontent() {
    const { state: { page: { products }, producttype2 }, dispatch } = useContext(StoreContext);
    useEffect(() => {
        const url = "/store";
        setPage(dispatch, url, getTitle(url))
    }, []);
    return (
        <div className="container content-container">
            <Carousel />
            <TopproductList TopProduct={producttype2.products} />
            {/* <Ad /> */}
            <ComicBotton />
        </div>
        
    );
}

export default Homecontent
