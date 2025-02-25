import React, { useEffect, useState } from 'react';
import './search.css'
import {useNavigate,useParams} from 'react-router-dom';
const Search = () => {
    const[term,setTerm]=useState('');
    const navigate=useNavigate();
    const{searchTerm}=useParams();
    

    useEffect(()=>{
      setTerm(searchTerm ?? '');
    },[searchTerm]);

    const search=async()=>{
        term? navigate('/search/'+term):navigate('/');
    };


  return (
    <div className='container'>
        <input type='text'
        placeholder='Search on ShopOn'
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e=>e.key==='Enter' && search()}
        value={term}
        />
        <button onClick={search}>Search</button>
      
    </div>
  )
}

export default Search
