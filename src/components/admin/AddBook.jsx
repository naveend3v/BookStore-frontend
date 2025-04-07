import React, { useState } from 'react'
import { addNewBookApiService, uploadImgApiService } from './api/AuthApiService';
import { useNavigate } from 'react-router-dom';

export default function AddBook() {

  const [newBook, setNewBook] = useState({
    bookName: "",
    author: "",
    description: "",
    category: "",
    price: 0,
    publishedDate: "",
    bookCoverImagePath: ""
  }
  );

  function imgSizeValidation(event) {
    const uploadImg = event.target.files[0]
    if (!uploadImg) return;
    const fsize = uploadImg.size
    console.log(`File size: ${fsize} bytes`)
    if (fsize > 5242880) {
      alert("File is too big! Please upload an image smaller than 5 MB.");
    }
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setNewBook(values => ({ ...values, [name]: value }))
  }

  async function uploadImgtoS3(event) {
    const uploadImg = event.target.bookCoverImagePath.files[0];
    if (!uploadImg) return;

    const formData = new FormData();
    formData.append("file", uploadImg);

    try {
      const response = await uploadImgApiService(formData);
      const imgURL = response.data.message;

      console.log(`URL: ${imgURL}`);

      setNewBook(prevBook => ({
        ...prevBook,
        bookCoverImagePath: imgURL
      }));

      return imgURL; // Return the uploaded image URL
    } catch (error) {
      console.error("Image upload failed", error);
      throw error; // Rethrow error for further handling
    }

  }

  const navigate = useNavigate();

  async function handleSubmit(event) {

    event.preventDefault();

    try {
      const imgURL = await uploadImgtoS3(event); // Wait for image upload

      const updatedBook = {
        ...newBook,
        bookCoverImagePath: imgURL, // Use the latest image URL
      };

      const resp = await addNewBookApiService(updatedBook);

      if (resp.status === 200) {
        console.log("New Book Added ..", resp.data);
        navigate("/admin/books");
      }
    } catch (error) {
      console.error("Failed to handle submit", error);
    }
  }

  return (
    <div className="AddBook bg-dark min-vh-100 d-flex flex-row text-light align-items-center">
      <div className="container">
        <h3 className='text-white text-center my-4'>Please fill Book Details</h3>

        <form className='m-3' validate onSubmit={handleSubmit}>

          <div className="row mb-3">
            <label for="inputBookName" className="col-sm-3 col-form-label">Book Name</label>
            <div className="col-sm-7">
              <input type="text" className="form-control bg-dark text-white" id="inputBookName" name='bookName' value={newBook.bookName} onChange={handleChange} minLength={1} maxLength={150} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputAuthor" className="col-sm-3 col-form-label">Author Name</label>
            <div className="col-sm-7">
              <input type="text" className="form-control bg-dark text-white" id="inputAuthor" name='author' value={newBook.author} onChange={handleChange} minLength={1} maxLength={150} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputCategory" className="col-sm-3 col-form-label">Book Category</label>
            <div className="col-sm-7">
              <select className="form-select bg-dark text-white" id="datalistOptions" aria-label="Default select example" name='category' value={newBook.category} onChange={handleChange} required>
                <option selected>Choose here...</option>
                <option value="Medical">Medical</option>
                <option value="Science-Geography">Science-Geography</option>
                <option value="Biography">Biography</option>
                <option value="Business">Business</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Personal-Development">Personal-Development</option>
                <option value="Money">Money</option>
                <option value="Sport">Sport</option>
                <option value="Fiction">Fiction</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Finance">Finance</option>
                <option value="Psychology">Psychology</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputPrice" className="col-sm-3 col-form-label">Book Price</label>
            <div className="col-sm-7">
              <input type="number" className="form-control bg-dark text-white" id="inputPrice" step="any" min={1} max={300} name="price" value={newBook.price} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputPublishedDate" className="col-sm-3 col-form-label">Book Published Date</label>
            <div className="col-sm-7">
              <input type="date" className="form-control bg-dark text-white" id="inputPublishedDate" name='publishedDate' value={newBook.publishedDate} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputDescription" className="col-sm-3 col-form-label">Book Description</label>
            <div className="col-sm-7">
              <textarea className="form-control bg-dark text-white" id="inputDescription" rows="4" name='description' value={newBook.description} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="formFile" className="col-sm-3 col-form-label">Book Cover Image</label>
            <div className="col-sm-7">
              <input type="file" className="form-control bg-dark text-white" id="formFile" name="bookCoverImagePath" accept="image/*" onChange={imgSizeValidation} />
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>

        </form>
      </div >
    </div >
  )
}