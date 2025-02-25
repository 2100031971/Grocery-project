import React, { useReducer, useEffect } from 'react';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import Search from '../../components/Search/Search';
import Tags from '../../components/Tags/Tags';
import NotFound from '../../components/Notfound/NotFound';
import {getAllByTag } from '../../Services/foodservice';


// ✅ Import all required functions from foodservice
import { getAll, getAllTags, search } from '../../Services/foodservice';

// ✅ Initial state
const initialState = { foods: [], tags: [] };

// ✅ Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'FOODS_LOADED':
      return { ...state, foods: action.payload };
    case 'TAGS_LOADED':
      console.log("Reducer Updated - Tags:", action.payload); // ✅ Debugging
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

const Homepage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { foods, tags } = state;
  const { searchTerm, tag } = useParams(); // ✅ Get both searchTerm & tag

  useEffect(() => {
    getAllTags().then((tags) => {
        console.log("🚀 API Response - Tags:", tags);  // ✅ Debug API response
        dispatch({ type: 'TAGS_LOADED', payload: tags });
    }).catch((error) => console.error("❌ Error fetching tags:", error));

    const loadFoods = tag
        ? getAllByTag(tag)
        : searchTerm
        ? search(searchTerm)
        : getAll();

    loadFoods
        .then((foods) => {
            console.log("🍔 API Response - Foods:", foods);  // ✅ Debug API response
            dispatch({ type: 'FOODS_LOADED', payload: foods });
        })
        .catch((error) => console.error("❌ Error fetching foods:", error));
}, [searchTerm, tag]);


  console.log("Tags being passed to Tags.jsx:", tags); // ✅ Debug before rendering

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {foods.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails foods={foods} />
    </>
  );
};

export default Homepage;
