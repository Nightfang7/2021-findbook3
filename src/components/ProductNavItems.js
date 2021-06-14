import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { StoreContext } from '../store';
import { setPage } from "../action";


export default function ProductNavItems(props) {
    const { children, to, className, activeClassName, onClose } = props
    const { state, dispatch } = useContext(StoreContext);

    const onClick = () => {
        setPage(dispatch, to, children);
        console.log(to)
        console.log(children)
        onClose && onClose();
    };

    return (
        <Link to={to}  onClick={onClick}
        className={`
        ${className}
        ${state.navBar.activeItem === to ? activeClassName : ""}`}>
            {children} 
        </Link>
        
    )
}
