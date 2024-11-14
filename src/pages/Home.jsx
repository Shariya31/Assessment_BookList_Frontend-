import React, { useEffect, useState } from 'react'
import Book from '../components/Book'
import toast from 'react-hot-toast'
import axios from 'axios'


const Home = () => {
  const [showModal, setShowModal] = useState(false)
  const [books, setBooks] = useState([]);
  const [bookdetails, setBookDetails] = useState({
    title: "",
    author: "",
    description: ""
  })
  const [loading, setLoading] = useState(false)

  const [error, setError] = useState({
    title: "",
    author: "",
    description: ""
  })

  const getBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/books`);
      setBooks(response.data.books);
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  };

  const deleteBook = async (id) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/books/${id}`);
      console.log(response)
      getBooks();
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    let name = e.target.name
    let value = e.target.value

    if (value) {
      setError(prev => ({ ...prev, [name]: "" }))
    }
    setBookDetails({ ...bookdetails, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      setError({ title: "", author: "", description: "" })

      if (!bookdetails.title) {
        setError({ ...error, title: "Title is required" })
        return
      }

      if (!bookdetails.author) {
        setError({ ...error, author: "Author is required" })
        return
      }

      if (!bookdetails.description) {
        setError({ ...error, description: "Description is required" })
        return
      }

      const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/books`, {
        title: bookdetails.title,
        author: bookdetails.author,
        description: bookdetails.description
      })
      
      setBookDetails({
        title: "",
        author: "",
        description: ""
      })
      setShowModal(false)
      toast.success(response.data.message)
      console.log(response)
      getBooks()
    } catch (error) {
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className='relative flex flex-col items-center gap-10 p-8 mt-11'>
      {books.length === 0 && <h3>No Books </h3>}
      <div className='w-full flex justify-end'>
        <button className='w-[9rem] h-[3rem] text-2xl shadow-[10px_0px_20px_rgba(0,_0,_0,_0.4)]' onClick={() => setShowModal(prev => !prev)}>
          Add a Book
        </button>
      </div>

      <div className='w-full'>
        <Book books={books} deleteBook={deleteBook} loading={loading} />
      </div>



      <div className={`${showModal ? 'absolute' : 'hidden'} w-[20rem] h-[35rem] md:w-[40rem] shadow-[10px_0px_20px_rgba(0,_0,_0,_0.4)] bg-white rounded-md`}>
        <div className='flex justify-end text-3xl mr-8 mt-4 cursor-pointer' onClick={() => setShowModal(false)}>X</div>
        <form className='flex flex-col items-center gap-7 p-10' onSubmit={handleSubmit}>
          <div className='w-full flex-col md:flex-row'>
            <label className='mr-[5.1rem]' htmlFor="">Title</label>
            <input className='border-2 border-black w-[60%]' type="text" value={bookdetails.title} name='title' onChange={handleChange} />
            {error.title && <div className='text-red-800'>{error.title}</div>}
          </div>

          <div className='w-full flex-col md:flex-row'>
            <label className='mr-16' htmlFor="">Author</label>
            <input className='border-2 border-black w-[60%]' type="text" value={bookdetails.author} name='author' onChange={handleChange} />
            {error.author && <div className='text-red-800'>{error.author}</div>}
          </div>

          <div className='w-full flex flex-col md:flex-row'>
            <label className='mr-8' htmlFor="">Description</label>
            <textarea className='border-2 border-black w-full' type="text" rows={8} value={bookdetails.description} name='description' onChange={handleChange} />
            {error.description && <div className='text-red-800'>{error.description}</div>}
          </div>
          <button className='w-[5rem] h-[2rem] text-2xl shadow-[10px_0px_20px_rgba(0,_0,_0,_0.4)] hover:border-2 border-black' type='submit'>{loading ? "Adding" : "Add"}</button>
        </form>
      </div>
    </div>

  )
}

export default Home