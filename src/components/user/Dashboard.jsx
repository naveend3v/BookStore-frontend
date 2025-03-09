import { useEffect, useState } from "react";
import { getAllBooksAPIService } from "./api/AuthApiService";
import { Link, useLocation } from "react-router-dom";

export default function Dashboard() {

    const [msg, setMsg] = useState([]);
    const location = useLocation(); // Detects route changes

    useEffect(
        () => {
            getAllBooksAPIService()
                .then((response) => {
                    setMsg(response.data.message)
                })
                .catch((error) => console.log(error))
        }, [location.pathname]
    )

    return (
        <div className='Dashboard dashboard-container py-5 bg-dark d-flex flex-column min-vh-100'>
            <div className="dashboard-content container text-center">
                <div className="row text-center justify-content-center align-content-center gap-3">
                    {msg.length > 0 ? (
                        msg.map((book) => (
                            <div key={book.id} className='books col-md-4 d-flex flex-column justify-content-between p-2 bg-light text-dark text-center border rounded m-2'>
                                <Link className="text-decoration-none text-dark" to={`/books/${book.id}`}>
                                    <div>
                                        <img className="bookCoverImg m-1 rounded" width={150} height={200} src={book.bookCoverImagePath} alt="" />
                                    </div>
                                    <div className=''>
                                        <h5>{book.bookName}</h5>
                                    </div>
                                    <div className='text-center'>
                                        <div className='p-2'><i class="bi bi-currency-dollar"></i> {book.price}</div>
                                    </div>
                                </Link>
                                <div>
                                    <button className="btn btn-primary w-100" type='button'>Add to Cart</button>
                                </div>
                                {/* <div>
                                    <button className="btn btn-primary w-100" type='button' onClick={()=> handleClick(book.id)}>Buy</button>
                                </div> */}
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-light w-100">No books available</p>
                    )}
                </div>
            </div>
        </div>
    )
}