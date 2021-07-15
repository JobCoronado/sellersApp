import axios from "axios"

export const getOrders = async() => {
    const res = await axios.get("http://localhost:8000/orders/all");
    return res.data;
}