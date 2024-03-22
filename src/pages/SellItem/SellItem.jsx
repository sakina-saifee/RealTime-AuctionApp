

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


// import debounce from 'lodash.debounce';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper, TextField } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import "./SellItem.css"
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';
import { IconButton, InputBase, MenuItem, Select } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { useEffect, useState } from 'react';
import { auth, db, storage } from './../../firebaseConfig/firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { ref as dbref, onValue, push, remove, set, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AddProduct, DeleteProduct, EditProduct } from '../../store/slices/ProductSlice';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SellItem() {

  const currencies = [
    {
      value: 'Mobile Phones',
      label: 'Mobile Phones',
    },
    {
      value: 'Laptop',
      label: 'Laptop',
    },
    {
      value: 'Tv Screen',
      label: 'LCDs',
    },
    {
      value: 'Camera',
      label: 'Camera',
    },
    {
      value: 'Headphones',
      label: 'Headphones',
    },
  ];
  const [url, seturl] = useState(null);
  const [UploadImage, setUploadImage] = useState(null);

  const [UserProductsAuction, setUserProductsAuction] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  // const [searchQuery, setSearchQuery] = useState("");
  // const [filteredProducts, setFilteredProducts] = useState(UserProductsAuction);

  const dispatch = useDispatch();
  const [category, setCategory] = useState(""); 
  const [searchproductname, setsearchproductname] = useState(""); 

  const [openEditModal, setopenEditModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [productdata, setproductdata] = useState({
    productname: "",
    productdescription: "",
    startingbidprice: 0,
    productCategory: "",
  });
  const [Editproductdata, setEditproductdata] = useState({
    productname: "",
    productdescription: "",
    startingbidprice: 0,
    productCategory: "",
    pushKey: "",
    index: 0,
  });
  const navigate = useNavigate();


  //normal handle change
  const handleDropdownChange = (event) => {
    const value = event.target.value;
    setCategory(value); // This will update the category state
    setproductdata((prevData) => ({
      ...prevData,
      productCategory: value, // This will update the productCategory in productdata state
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setproductdata((prevdata) => ({

      ...prevdata,
      [name]: value,


    }));

  };


  //edit handle change
  const handleEditDropdownChange = (event) => {
    const value = event.target.value;
    setCategory(value); // This will update the category state
    setEditproductdata((prevData) => ({
      ...prevData,
      productCategory: value, // This will update the productCategory in productdata state
    }));
  };



  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditproductdata((prevdata) => ({

      ...prevdata,
      [name]: value,


    }));

    // console.log(productdata);
  };


  // handle image change
  function imageChanges(file) {
    if (!file) {
      // toast.error("No image to upload");
      return;
    }

    const ImageRef = ref(storage, `images/${file?.name}`)
    uploadBytes(ImageRef, file).then((snapshot) => {
      // toast.success('Uploaded a blob or file!');
      getDownloadURL((ImageRef)).then((url) => {
        console.log("Url", url);
        seturl(url)
      });
    }).catch((error) => {
      toast.error("Failed to upload");
    });
  }

  useEffect(() => {
    if (UploadImage) {
      imageChanges();
    }
  }, [UploadImage]);



  //add product
  const UploadProduct = () => {

    console.log("Product Data", productdata)

    if (UploadImage == null) {
      return
    }


    const user = auth.currentUser;

    const postListRef = dbref(db, 'productUploadedForAuction/' + user?.uid);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      ProductName: productdata?.productname,
      ProductDescription: productdata?.productdescription,
      StartingBidPrice: productdata?.startingbidprice,
      ProductCategory: productdata?.productCategory,
      Url: url,
      DateUploaded: Date.now(),
      PushKey: newPostRef.key,
    })

      .then(() => {
        toast.success("Product Added For Auction Successfully!");
        setproductdata({
          productname: "",
          productdescription: "",
          startingbidprice: 0,
          productCategory: "",
        }
        );


        setTimeout(() => {
          navigate('/sellitem');
        }, 4000);
      }).catch((error) => {
        toast.error("Error", error);
      })

  }

  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {


        const userRef = dbref(db, 'productUploadedForAuction/' + `${userlogged?.uid}/`)
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const Proddata = Object.values(data);
            // console.log("Proddata", Proddata);
            setUserProductsAuction(Proddata);
          }

        });
      } else {
        setUserProductsAuction(null);
      }
    });
  }, []);


  //edit chnages in product details
  const editProductDetails = (ProductName, ProductDescription, ProductCategory, StartingBidPrice, pushkey, index) => {
    // console.log("edit indexxx", index)
    setopenEditModal(true);
    handleOpen();
    setEditproductdata({
      productname: ProductName,
      productdescription: ProductDescription,
      startingbidprice: StartingBidPrice,
      productCategory: ProductCategory,
      pushKey: pushkey,
      index: index,
    })

  }

  const UpdateProductDetails = (Editproductdata) => {

    const user = auth.currentUser;

    update(dbref(db, 'productUploadedForAuction/' + `${user?.uid}/` + `${Editproductdata?.pushKey}/`), {
      ProductCategory: Editproductdata.productCategory,
      ProductDescription: Editproductdata.productdescription,
      ProductName: Editproductdata.productname,
      StartingBidPrice: Editproductdata.startingbidprice,
    }).then(() => {
      toast.success("Updated Successfully!");
    }).catch((error) => {
      toast.error("Cannot be Updated!");
    })
    dispatch(EditProduct(Editproductdata))
  }


  //delete action

  const DeleteProductItem = (pushkey, index) => {
    console.log("deltee", pushkey, index);
    const user = auth.currentUser;


    remove(dbref(db, `productUploadedForAuction/${user?.uid}/${pushkey}`), {

    }).then(() => {
      toast.error("Deleted Successfully!");
    }).catch((error) => {
      toast.error("Cannot be Deleted!");
    })
    dispatch(DeleteProduct(Editproductdata))

  }

  const handleSearchName=(e)=>{
    const { name, value } = e.target;
    setsearchproductname(value);

   
  }

  // const handleSearchName = (e) => {
  //   const { value } = e.target;
  //   setsearchproductname(value);
  
  //   if (value.trim() === "") {
  //     // If the search query is empty, show all products
  //     setFilteredProducts(UserProductsAuction);
  //   } else {
  //     // Filter the UserProductsAuction based on the search query
  //     const filtered = UserProductsAuction.filter(item => 
  //       item.productname?.toLowerCase().includes(value.toLowerCase())
  //     );
  //     setFilteredProducts(filtered);
  //   }
  // }

  // const handleSearchName = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);
  
  //   const filtered = UserProductsAuction.filter((item) =>
  //     item?.productname.toLowerCase().includes(query)
  //   );
  
  //   setFilteredProducts(filtered);
  // };
  
  // const handleSearchName = (e) => {
  //   const query = e.target.value.toLowerCase();
  //   setSearchQuery(query);
  
  //   // Check if UserProductsAuction is defined and not null
  //   if (UserProductsAuction && Array.isArray(UserProductsAuction)) {
  //     const filtered = UserProductsAuction.filter((item) =>
  //       item?.productname?.toLowerCase().includes(query)
  //     );
  
  //     setFilteredProducts(filtered);
  //   }
  // };

  // useEffect(() => {
  //   setFilteredProducts(UserProductsAuction);
  // }, [UserProductsAuction]);
  
  useEffect(() => {
    if(searchproductname){
      console.log("searchhhhhhhhhhh", searchproductname)
      console.log("searchhhhhhhhhhh", UserProductsAuction)
      const filtered = UserProductsAuction.filter(item => 
        item.ProductName?.toLowerCase().includes(searchproductname.toLowerCase())
      );
      setFilteredProducts(filtered)
 console.log("filtered",filtered)
    }else{
setFilteredProducts(UserProductsAuction);
    }
    // console.log(" searchproductname ", searchproductname)

    // setFilteredProducts(UserProductsAuction);
    // if (searchproductname.trim() === "") {
    //   // If the search query is empty, show all products
    //   setFilteredProducts(UserProductsAuction);
    // } else {

    
     

   
    // }


    // setFilteredProducts(UserProductsAuction);
  }, [searchproductname, UserProductsAuction]);
  
  return (

    <>

{/* search product */}
      <div className='SearchEngine'>

        <div className='customerSupport'>
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
            // onChange={(e)=>{debounce(()=>handleSearchName(e), 1000); }}
            value={searchproductname}
            name="searchproductname"
          />
          <IconButton type="button" aria-label="search">
            <SearchIcon />
          </IconButton>


        </Paper>

      </div>

      <div className='myAuctionHeader'>
        <h1>My Auction Listing</h1>

      </div>

      <Button variant="contained" className='modalBtn' endIcon={<AddToHomeScreenIcon />} onClick={() => { handleOpen(); setopenEditModal(false) }}> Enter Product Details</Button>


      {openEditModal ? <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sell An Item
          </Typography>

          <div className='inputs'>

            <TextField fullWidth label="Product Name" variant="filled" className="successText" focused name="productname"
              value={Editproductdata.productname}
              onChange={handleEditChange} />
            <input className='inputText' type="file" onChange={(event) => {
              const file = event.target.files[0];
              setUploadImage(file);

              imageChanges(file);


            }

            }></input>
            <TextField fullWidth label="Description" variant="filled" focused name="productdescription"
              value={Editproductdata.productdescription}
              onChange={handleEditChange} />
            <TextField fullWidth type="number" label="Starting Bid Price" variant="filled" focused
              name="startingbidprice"
              value={Editproductdata.startingbidprice}
              onChange={handleEditChange}
            />

            <Select
              label="Product Category"
              defaultValue="Camera"

              helperText="Please choose a category"
              fullWidth
              name="productCategory"
              value={Editproductdata.productCategory}
              onChange={handleEditDropdownChange}

            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}

            </Select>


          </div>

          <Button variant="contained" className='uploadProductBtn' endIcon={<SendIcon />} onClick={() => { UpdateProductDetails(Editproductdata) }}> Edit Product Details </Button>




        </Box>
      </Modal> : <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sell An Item
          </Typography>

          <div className='inputs'>

            <TextField fullWidth label="Product Name" variant="filled" className="successText" focused name="productname"
              value={productdata.productname}
              onChange={handleChange} />
            <input className='inputText' type="file" onChange={(event) => {
              const file = event.target.files[0];
              setUploadImage(file);

              imageChanges(file);


            }

            }></input>
            <TextField fullWidth label="Description" variant="filled" focused name="productdescription"
              value={productdata.productdescription}
              onChange={handleChange} />
            <TextField fullWidth type="number" label="Starting Bid Price" variant="filled" focused
              name="startingbidprice"
              value={productdata.startingbidprice}
              onChange={handleChange}
            />

            <Select
              label="Product Category"
              defaultValue="Camera"

              helperText="Please choose a category"
              fullWidth
              name="productCategory"
              value={category}
              onChange={handleDropdownChange}

            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}

            </Select>


          </div>

          <Button variant="contained" className='uploadProductBtn' endIcon={<SendIcon />} onClick={UploadProduct}> Upload Product To Auction </Button>




        </Box>
      </Modal>}



      <div className='cardsDiv'>
        {
          filteredProducts.map((item, index) => {
            const timestamp = item.DateUploaded; // Example timestamp
            const date = new Date(timestamp);
            const dateString = date.toLocaleTimeString();
            // console.log("date stringggg", dateString);

            return <div>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  component="img"
                  alt="Product Image"
                  height="140"
                  image={item.Url}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.ProductName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.ProductDescription}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <span>  <h3>Product Category</h3>{item.ProductCategory} </span>
                  </Typography>

                  <div className='bidprice_dateupload'>

                    <p className='dateupload'>Started on {dateString}</p>
                    <p className='bidprice'>Starting Bid Price: PKR {item.StartingBidPrice} /-</p>

                  </div>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="success" className='editproduct' onClick={() => { editProductDetails(item.ProductName, item.ProductDescription, item.ProductCategory, item.StartingBidPrice, item.PushKey, index) }} >Edit</Button>
                  <Button variant="contained" color="error" className='delproduct' onClick={() => DeleteProductItem(item.PushKey, index)}>Delete</Button>


                </CardActions>
              </Card>
            </div>
          })
        }
      </div>

    </>



  )
}







