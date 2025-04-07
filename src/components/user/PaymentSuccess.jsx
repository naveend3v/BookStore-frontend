import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { placeOrderAPIService } from './api/AuthApiService';

export default function PaymentSuccess() {
    
    useEffect(() => {
        const sessionId = sessionStorage.getItem("checkoutSessionId");

        if (!sessionId) {
            console.error("No checkout session ID found.");
            return;
        }

        async function placeOrder() {
            try {
                const response = await placeOrderAPIService({ sessionId });
                if (response.status === 200) {
                    console.log("Order placed successfully!");
                    sessionStorage.removeItem("checkoutSessionId");
                }
            } catch (error) {
                console.error("Failed to place order:", error);
            }
        }

        placeOrder();
    }, []);

    return (
        <div className="PaymentSuccess py-5 bg-dark d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="container text-white d-flex flex-column justify-content-center align-items-center text-light">
                <div className='text-center'>
                    <img src={require('./images/payment_success.png')} className="w-25 my-auto" alt="" />
                    <h3 className="fs-3">Payment success!</h3>
                    <p className="fs-5">Go ahead & explore <span>
                        <Link className="text-decoration-none" to="/books">books</Link></span></p>
                </div>
            </div>
        </div>
    );
}
