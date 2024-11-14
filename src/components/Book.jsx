import React, { useEffect, useState } from 'react';
import cover from '../assets/bookcover2.jpg';
import { MdDelete } from "react-icons/md";

const Book = ({ books, deleteBook, loading }) => {
    const [hoveredBookId, setHoveredBookId] = useState(null);

    if (loading) {
        return (
            <h3>Loading</h3>
        )
    }

    return (
        <div className='body flex flex-wrap gap-12 items-center justify-center'>
            {books?.map((book) => (
                <div key={book._id}>
                    <div
                        className='card relative rounded-md cursor-pointer shadow-[10px_0px_20px_rgba(0,_0,_0,_0.4)] h-[25rem] w-[17rem] bg-white ease-in-out duration-[1s]'
                        style={{
                            transform: "perspective(2000px)",
                            transformStyle: "preserve-3d",
                        }}
                        onMouseEnter={() => setHoveredBookId(book._id)}
                        onMouseLeave={() => setHoveredBookId(null)}
                    >
                        <div
                            className='absolute flex justify-center items-end top-0 left-0 w-full h-full bg-gray-500 rounded-md origin-left'
                            style={{
                                transformStyle: "preserve-3d",
                                transition: "all .5s ease-in-out",
                                transform: hoveredBookId === book._id ? "rotateY(-135deg)" : "rotateY(0deg)",
                            }}
                        >
                            <h2 className='absolute z-10 text-xl mb-6 backface-hidden font-bold text-green-950'>{book.author}</h2>
                            <h2 className='z-10 text-[.9rem] my-auto backface-hidden font-bold text-green-950'>{book.title}</h2>
                            <img className='absolute top-0 left-0 w-full h-full object-cover backface-hidden rounded-md' src={cover} alt="" />
                        </div>
                        <div className="content h-full w-full p-4 flex flex-col text-[15px] items-center">
                            <p className='text-xl font-bold mb-7'>Description</p>
                            <p className='overflow-y-auto'>{book.description}</p>
                        </div>
                    </div>
                    <div className='flex justify-center text-3xl text-red-800 my-5' onClick={() => deleteBook(book?._id)}>
                        <button><MdDelete /></button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Book;
