import React from 'react';
import { FiSearch } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { fetchKeySuccess, fetchKeyError } from '../../features/searchKey/searchKeySlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const searchHandler = (event) => {
        try {
            dispatch(fetchKeySuccess(event.target.value));
        } catch (error) {
            dispatch(fetchKeyError(error));
        }
    }
    return (
        <div className='flex items-center h-full bg-white rounded-lg'>
            <FiSearch size={'23'} className='ml-3 text-gray-500 align-start' />
            <input type="text" placeholder='Search by coin' onChange={searchHandler} className='w-full ml-3 text-base font-semibold text-gray-500 focus:outline-none' />
        </div>
    )
}

export default SearchBar;