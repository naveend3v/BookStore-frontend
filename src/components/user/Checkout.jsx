import { loadStripe } from "@stripe/stripe-js"

export default function Checkout() {

    async function makePayment() {
        const stripe_publishable_key = process.env.REACT_APP_STRIPE_PK_TOKEN;

        console.log("Stripe Publishable Key:", process.env.REACT_APP_STRIPE_PK_TOKEN);

        if (!stripe_publishable_key) {
            console.error("Stripe publishable key is not defined. Please check your .env file.");
            return;
        }
    
        const stripe = await loadStripe(stripe_publishable_key);
    
        if (!stripe) {
            console.error("Failed to initialize Stripe. Please check your publishable key.");
            return;
        }

        const result = stripe.redirectToCheckout({
            sessionId: sessionStorage.getItem("checkoutSessionId")
        })

        if((await result).error){
            console.log(result.error);
        }
    }
 
    return (
        <div className="Checkout py-5 bg-dark d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="container text-white d-flex flex-column justify-content-center align-items-center text-light">
                <h3>
                    You will be redirected to the payment gateway. please wait...
                </h3>
                <div className="alert alert-primary">
                    while making payment use card number 4242 4242 4242 4242, and enter random date and cvv.
                </div>
                <button className="btn btn-primary" onClick={()=>makePayment()}>
                    Make Payment
                </button>
            </div>
        </div>
    )
}