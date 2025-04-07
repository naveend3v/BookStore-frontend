import { useEffect, useState } from "react";
import { getAllOrdersAPIService } from "./api/AuthApiService";
import { Link } from "react-router-dom";

export default function ViewOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        getAllOrdersAPIService()
            .then((response) => {
                console.log(response);
                setOrders(response.data.message);
            })
            .catch((error) => console.log(error));
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="ViewOrders py-5 bg-dark d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="container text-white text-center">
                {orders.length > 0 ? (
                    <div className="row g-4 justify-content-center">
                        {orders.map((order, index) => (
                            <div key={index} className="col-12 col-md-6 col-lg-4 d-flex justify-content-center">
                                <div className="card bg-secondary text-light p-3 h-100 w-100">
                                    <div className="text-start">
                                    <h5 className="mb-2">Order Date: {formatDate(order.orderDate)}</h5>
                                    <p className="mb-2">Order Total Price: $ {order.totalAmount}</p>
                                    </div>
                                    <div className="order-items">
                                        {order.orderItems.map((book, bookIndex) => (
                                            <div key={bookIndex} className="d-flex flex-column flex-sm-row align-items-start mb-3 border p-2 rounded">
                                                <img 
                                                    className="img-fluid rounded" 
                                                    src={book.bookCoverImage} 
                                                    alt={book.bookName} 
                                                    style={{ maxWidth: "150px" }}
                                                />
                                                <div className="ms-sm-3 mt-2 mt-sm-0 text-start">
                                                    <h5>{book.bookName}</h5>
                                                    <p className="mb-1">Quantity: {book.quantity}</p>
                                                    <p className="mb-1">Price: $ {book.price}</p>
                                                    {book.quantity > 1 && <p className="mb-0">Total Price: $ {book.totalPrice}</p>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center">
                        <img 
                            src={require('./images/empty_orders.png')} 
                            className="img-fluid w-25 w-md-25 my-3" 
                            alt="Empty Orders" 
                        />
                        <p className="fs-3">Your order is empty!</p>
                        <p className="fs-5">
                            Looks like you haven't bought any books. Go ahead & explore 
                            <Link className="text-decoration-none text-warning" to="/books"> books</Link>.
                        </p>
                    </div> 
                )}
            </div>
        </div>
    );
}
