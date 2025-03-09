import React, { useEffect, useState } from 'react'
import { getBookApiService, updateBookApiService, uploadImgApiService } from './api/AuthApiService';
import { useNavigate, useParams } from 'react-router-dom';

export default function ModifyBook() {

  const { id } = useParams()

  const [oldBook, setUpdateOldBook] = useState({});
  const [newImgPath, setNewImgPath] = useState('');
  const navigate = useNavigate();

  useEffect(() => getOldBook(), [id])

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUpdateOldBook(values => ({ ...values, [name]: value }))
  }

  function getOldBook() {
    getBookApiService(id)
      .then((response) => {
        setOldBook(response.data.message)
      })
      .catch((error) => console.log(error))
  }

  function setOldBook(book) {
    setUpdateOldBook(book)
  }

  useEffect(() => {
    if (newImgPath) {
      setUpdateOldBook(prevBook => ({
        ...prevBook,
        bookCoverImagePath: newImgPath
      }));
    }
  }, [newImgPath]);

  async function updateImgtoS3(event) {
    console.log("clicked updateImgtoS3 func")
    const uploadImg = document.getElementById("formFile").files[0];
    if (!uploadImg) return;

    const formData = new FormData();
    formData.append("file", uploadImg);

    try {
      const response = await uploadImgApiService(formData);
      const imgPath = response.data.message
      setNewImgPath(imgPath)

      setOldBook(prevBook => ({
        ...prevBook,
        bookCoverImagePath: newImgPath
      }));

      console.log("New img path: " + newImgPath)

      console.log(oldBook)
    } catch (error) {
      console.error("Image upload failed", error);
      throw error; // Rethrow error for further handling
    }

  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {

      const resp = await updateBookApiService(oldBook, id)
      console.log('response: ' + resp)
      if (resp.status === 200) {
        console.log("New Book Added ..", resp.data);
        navigate("/admin/books");
      }

    } catch (error) {
      console.log('Failed to update Book with error: ' + error)
    }

  }

  return (
    <div className="AddBook bg-dark min-vh-100 d-flex flex-row text-light align-items-center">
      <div className="container">
        <h3 className='text-white text-center my-4'>Please Update Book Details</h3>

        <form className='m-3' validate onSubmit={handleSubmit}>

          <div className="row mb-3">
            <label for="inputBookName" className="col-sm-3 col-form-label">Book Name</label>
            <div className="col-sm-7">
              <input type="text" className="form-control bg-dark text-white" id="inputBookName" name='bookName' value={oldBook.bookName} onChange={handleChange} minLength={1} maxLength={80} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputAuthor" className="col-sm-3 col-form-label">Author Name</label>
            <div className="col-sm-7">
              <input type="text" className="form-control bg-dark text-white" id="inputAuthor" name='author' value={oldBook.author} onChange={handleChange} minLength={1} maxLength={80} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputCategory" className="col-sm-3 col-form-label">Book Category</label>
            <div className="col-sm-7">
              <select className="form-select bg-dark text-white" id="datalistOptions" aria-label="Default select example" name='category' value={oldBook.category} onChange={handleChange} required>
                <option selected>Choose here...</option>
                <option value="Medical">Medical</option>
                <option value="Science-Geography">Science-Geography</option>
                <option value="Biography">Biography</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Personal-Development">Personal-Development</option>
                <option value="Sport">Sport</option>
                <option value="Fiction">Fiction</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputPrice" className="col-sm-3 col-form-label">Book Price</label>
            <div className="col-sm-7">
              <input type="number" className="form-control bg-dark text-white" id="inputPrice" step="any" min={1} max={300} name="price" value={oldBook.price} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputPublishedDate" className="col-sm-3 col-form-label">Book Published Date</label>
            <div className="col-sm-7">
              <input type="date" className="form-control bg-dark text-white" id="inputPublishedDate" value={oldBook.publishedDate} name='publishedDate' onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <label for="inputDescription" className="col-sm-3 col-form-label">Book Description</label>
            <div className="col-sm-7">
              <textarea className="form-control bg-dark text-white" id="inputDescription" rows="4" name='description' value={oldBook.description} onChange={handleChange} required />
            </div>
          </div>

          <div className="row mb-3">
            <label for="formFile" className="col-sm-3 col-form-label">Book Cover Image</label>
            <div className="col-sm-7 d-flex flex-column justify-content-start align-items-center gap-2">
              <img className="m-1 rounded" width="150" src={oldBook.bookCoverImagePath} alt="" name="bookCoverImagePath" onChange={handleChange} />
              <div className='d-flex flex-column align-items-center gap-2'>
                <input type="file" className="form-control bg-dark text-white" id="formFile" name="bookCoverImage" accept="image/*" />
                <button class="btn btn-outline-warning" type="button" onClick={updateImgtoS3}>Update</button>

              </div>
            </div>
          </div>

          <div className="d-flex flex-row justify-content-center">
            <button type="submit" className="btn btn-primary w-50">Submit</button>
          </div>

        </form>
      </div >
    </div >
  )
}
