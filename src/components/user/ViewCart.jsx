import { useEffect, useState } from "react";
import { deleteCartItemAPIService, getAllCartAPIService, updateCartItemAPIService } from "./api/AuthApiService";
import { Link } from "react-router-dom";

export default function ViewCart() {
    const [cartItem, setCartItem] = useState([]);
    const [totalCost, setTotalCost] = useState(0); // Initialize with 0

    function setCartValues(message) {
        setCartItem(message.cartItemsDto);
        setTotalCost(message.totalCost);
    }

    useEffect(() => {
        console.log("fetching cart details using useEffect")
        getAllCartDetails();
    }, // eslint-disable-next-line 
        []
    );

    async function getAllCartDetails() {
        await getAllCartAPIService()
            .then((response) => {
                setCartValues(response.data.message);
            })
            .catch((error) => console.log(error));
    }

    async function DeleteCart(cartItemId) {
        await deleteCartItemAPIService(cartItemId)
            .then(
                (response) => {
                    const event = new CustomEvent('cartUpdated');
                    window.dispatchEvent(event);
                    console.log("fetching cart details using DeleteCart")
                    getAllCartDetails();
                }
            )
            .catch((error) => console.log(error))
    }

    async function updateCart(cartItemId,product_id,quantity){
        const productDetaails = {
            "product_id": product_id,
            "quantity": quantity
        }
        await updateCartItemAPIService(cartItemId,productDetaails)
        .then((response) => {
            if(response.status === 200){
                const event = new CustomEvent('cartUpdated');
            window.dispatchEvent(event);
            console.log("fetching cart details using updateCart")
                getAllCartDetails();
            }
        })
        .catch((error)=>console.log(error))        
    }

    return (
        <div className="ViewCart py-5 bg-dark d-flex flex-column min-vh-100">
            <div className="container text-white d-flex flex-column justify-content-center align-items-center text-light">
                {cartItem.length > 0 ? (
                    <>
                        <div className="row w-100">
                            {cartItem.map((item) => (
                                <div key={item.id} className="col-12 col-md-6 col-lg-6 mb-4">
                                    <div className="card bg-secondary text-white h-100">
                                        <div className="row g-0 align-items-center">
                                            {/* Image Section */}
                                            <div className="col-4 d-flex align-items-center">
                                                <img
                                                    className="img-fluid rounded-start"
                                                    style={{
                                                        width: "100%",
                                                        maxHeight: "200px",  // Limits stretching
                                                        objectFit: "cover",   // Ensures image fills container properly
                                                    }}
                                                    src={item.book.bookCoverImagePath}
                                                    alt={item.book.bookName}
                                                />
                                            </div>
                                            {/* Card Body */}
                                            <div className="col-8 d-flex">
                                                <div
                                                    className="card-body d-flex flex-column justify-content-between align-items-stretch w-100"
                                                    style={{ minHeight: "200px", gap: "8px" }} // Reduce gap in content
                                                >
                                                    <h5 className="card-title mb-0">{item.book.bookName}</h5>
                                                    <p className="card-text mb-0">Price: $ {item.book.price}</p>
                                                    <div className="card-quantity d-flex justify-content-start align-items-center border rounded-4 p-0 m-0">
                                                        {item.quantity > 1 ? (
                                                            <button
                                                                type="button"
                                                                className="btn-quantity btn btn-outline-light border-0 rounded-4 px-2 py-0"
                                                            onClick={()=>updateCart(item.id,item.book.id,item.quantity-1)}>
                                                                -
                                                            </button>
                                                        ) : (
                                                            <button
                                                                type="button"
                                                                className="btn-quantity btn btn-outline-light border-0 rounded-4 px-2 py-0"
                                                            onClick={() => DeleteCart(item.id)}>
                                                                <i className="bi bi-trash"></i>
                                                            </button>
                                                        )}
                                                        <div className="px-2 py-0">{item.quantity}</div>
                                                        <button
                                                            type="button"
                                                            className="btn-quantity btn btn-outline-light border-0 rounded-4 px-2 py-0"
                                                            onClick={() => updateCart(item.id,item.book.id,item.quantity+1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="btn-quantity btn btn-outline-light border-1 rounded-4 w-50 mx-start"
                                                        onClick={() => DeleteCart(item.id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>
                            ))}
                        </div>
                        <div className="fs-5 mt-4 text-center">
                            <strong>Total Cost: ${totalCost.toFixed(2)}</strong>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <div>
                        <img src={require('./images/cart_empty.png')} className="w-75 my-auto" alt="" />
                        <p className="fs-3">Your cart is empty!</p>
                        <p className="fs-5">Looks like you haven't added any books. Go ahead & explore <span>
                            <Link className="text-decoration-none" to="/books">books</Link></span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}