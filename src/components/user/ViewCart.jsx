import { useEffect, useState } from "react"
import { getAllCartAPIService } from "./api/AuthApiService"
import { useLocation } from "react-router-dom";
import { useAuth } from "./api/AuthContext";

export default function ViewCart(){
    
    const [cartItem,setCartItem] = useState([])
    const [totalCost,setTotalCost]= useState();
    const location = useLocation();
    const user = useAuth().username;
    const userToken = useAuth().token;


    useEffect(
        () => {
            getAllCartAPIService().then(
                (response) => {
                    console.log(response.data.message)
                    setCartItem(response.data.message.cartItemsDto);
                    setTotalCost(response.data.message.totalCost);
                }
            ).catch((error)=>console.log(error));
        }, []
    )
    console.log(user);
    console.log(userToken)

    return(
        <div className="ViewCart py-5 bg-dark d-flex flex-column min-vh-100">
            <div className="container text-white d-flex flex-row justify-content-center align-content-center">
                { cartItem.length > 0 ? (
                    <div>Item available</div>
                ) : (
                   <div>No items available</div>
                )
                }
            </div>
        </div>    
    )
}