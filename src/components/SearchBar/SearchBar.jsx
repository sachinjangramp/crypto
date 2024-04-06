import React, { useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { fetchKeySuccess, fetchKeyError } from '../../features/searchKey/searchKeySlice';

const SearchBar = () => {
    const dispatch = useDispatch();
    const [isFocused, setIsFocused] = useState(false);
    const searchHandler = (event) => {
        try {
            dispatch(fetchKeySuccess(event.target.value));
        } catch (error) {
            dispatch(fetchKeyError(error));
        }
    }

    const handleFocus = () => {
        setIsFocused(true);
    }

    const handleBlur = () => {
        setIsFocused(false);
    }
    console.log(isFocused)
    return (
        <div className='flex items-center h-full bg-white rounded-lg'>
            <FiSearch size={'23'} className={`ml-3  align-start ${isFocused ? 'text-[#3660cb]' : 'text-gray-500'}`} />
            <input type="text" placeholder='Search by coin' onFocus={handleFocus} onBlur={handleBlur} onChange={searchHandler} className={`w-full ml-3 text-base font-semibold text-gray-500 focus:outline-none`} />
        </div>
    )
}

export default SearchBar;