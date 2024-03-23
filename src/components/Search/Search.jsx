import React, { useEffect, useState } from 'react'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useNavigate } from 'react-router-dom';
import { IconButton, InputBase, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { SearchProduct } from '../../store/slices/ProductSlice';
import "../../pages/SellItem/SellItem.css";
const Search = (props) => {

    const navigate=useNavigate();
    const [searchproductname, setsearchproductname] = useState(""); 
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch=useDispatch();

    const Back=()=>{
        navigate("/userhome")
      }
      const handleSearchName=(e)=>{
        const { name, value } = e.target;
        setsearchproductname(value);
    
       
      }

      useEffect(() => {
        if(searchproductname){
          console.log("searchhhhhhhhhhh", searchproductname)
          console.log("searchhhhhhhhhhh", props.UserProductsAuction)
          const filtered = props.UserProductsAuction.filter(item => 
            item.ProductName?.toLowerCase().includes(searchproductname.toLowerCase())
          );
          setFilteredProducts(filtered)
     console.log("filtered",filtered)
        }else{
    setFilteredProducts(props.UserProductsAuction);
        }
      }, [searchproductname, props.UserProductsAuction]);

      dispatch(SearchProduct(filteredProducts));

  return (

    <>
      <div className='SearchEngine'>

<div className='customerSupport'>
<ArrowBackIcon className='backBtn' onClick={Back}/>
  <SupportAgentIcon className='customerSupportIcon' />
  <h3>Customer Support</h3>
</div>



<Paper
  component="div"
>

  <InputBase

    placeholder="Search Product By Name"
    className='ProductsearchBar'
    inputProps={{ 'aria-label': 'search google maps' }}
    onChange={handleSearchName}
   
    value={searchproductname}
    name="searchproductname"
  />
  <IconButton type="button" aria-label="search">
    <SearchIcon />
  </IconButton>


</Paper>

</div>
    </>

  )
}

export default Search
