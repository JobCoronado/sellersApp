import React,{useEffect,useState} from 'react'
import {getOrders} from "../../api/order"
const ShowOrders = () => {
    const [orders, setorders] = useState([]);
    useEffect(() => {
       (async ()=>{
        const resOrders = await getOrders();
        setorders(resOrders);
       })()
    }, [])
    return (
        <div>
            {orders.map((order)=>(<li>{order.orderID}</li>))}
        </div>
    )
}

export default ShowOrders
