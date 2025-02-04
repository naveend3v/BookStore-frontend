import React, { useEffect, useState } from 'react'
import { adminGetAllBooksApiService } from './api/AuthApiService'
import '../../components/Home.css'

export default function Dashboard() {
  const [msg, setMsg] = useState([])

  useEffect(() => {
    adminGetAllBooksApiService()
      .then((response) => setMsg(response.data.message))
      .catch((error) => console.log(error))
  }, [])

  return (
    <div className='Dashboard dashboard-container vh-100 pt-5 bg-dark d-flex justify-content-start'>
      <div className="container dashboard-content">
        <div className='text-light text-center'>dashboard</div>
        {msg.map((book) => (
          <div key={book.id} className='text-light'>
            <div>
              <h2>{book.bookName}</h2>
            </div>
            <div>
              {/* <img src={book.bookCoverImagePath} alt="" /> */}
              </div>
            <div>
              <div>Rs.{book.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
