import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminGetAllBooksApiService } from './api/AuthApiService';

export default function Dashboard() {
  const [msg, setMsg] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Detects route changes

  useEffect(() => {
    adminGetAllBooksApiService()
      .then((response) => setMsg(response.data.message))
      .catch((error) => console.log(error));
  }, [location.pathname]); // Fetches data every time route changes

  function modifyBook(id) {
    navigate(`/admin/edit-book/${id}`);
  }

  return (
    <div className='Dashboard dashboard-container py-5 bg-dark d-flex flex-column min-vh-100'>
      <div className="dashboard-content container text-center">
        <div className="row text-center justify-content-center gap-3">
          {msg.length > 0 ? (
            msg.map((book) => (
              <div key={book.id} className='books col-md-4 d-flex flex-column justify-content-between p-2 bg-light text-dark text-center border rounded m-2'>
                <div>
                  <img className="m-1 rounded" width={150} height={200} src={book.bookCoverImagePath} alt="" />
                </div>
                <div>
                  <h5>{book.bookName}</h5>
                </div>
                <div>
                  <button className="btn btn-primary w-100" type='button' onClick={() => modifyBook(book.id)}>Edit</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-light w-100">No books available</p>
          )}
        </div>
      </div>
    </div>
  );
}