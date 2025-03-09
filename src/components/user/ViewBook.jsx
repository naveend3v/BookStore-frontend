import { useEffect, useState } from "react";
import { getBookAPIService } from "./api/AuthApiService";
import { useParams } from "react-router-dom";

export default function ViewBook() {

    const [book, setBook] = useState({});
    const { id } = useParams()

    useEffect(
        () => {
            getBookAPIService(id).then(
                (response) => {
                    setBook(response.data.message)
                }).catch((error) => console.log(error))
        }, [id]
    )

    return (
        <div className="ViewBook min-vh-100 bg-dark d-flex justify-content-center align-items-center py-0">
            <div className="container">
                <div className="row text-white text-center d-flex align-items-center justify-content-center">
                    {/* Left Column: Image & Price */}
                    <div className="col-12 col-md-4 d-flex flex-column align-items-center gap-4">
                        <img
                            className="bookCoverImg rounded shadow"
                            width={200}
                            height={280}
                            src={book.bookCoverImagePath}
                            alt={book.bookName}
                        />
                        <div className="fw-bold fs-4"> <i class="bi bi-currency-dollar"></i> {book.price}</div>
                        <button className="btn btn-primary w-100" type="button">
                            Add to Cart
                        </button>
                    </div>

                    {/* Right Column: Book Details */}
                    <div className="col-12 col-md-8 text-start">
                        <h2 className="fw-bold">{book.bookName}</h2>
                        <h5 className="text-secondary">by {book.author}</h5>
                        <h6 className="badge bg-info text-dark fs-6">{book.category}</h6>
                        <p className="text-break-emphasis">Published: {book.publishedDate}</p>
                        <p className="text-break">{book.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}