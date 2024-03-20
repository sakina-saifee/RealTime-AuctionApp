

// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';


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
import { ref, uploadBytes, listAll, getDownloadURL, connectStorageEmulator } from "firebase/storage";
import { toast } from 'react-toastify';
import { set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';


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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  ];
  const [url, seturl] = useState(null);
  const [UploadImage, setUploadImage] = useState(null);
  const [ImageList, setImageList] = useState([]);

  const [category, setCategory] = useState("");
  const [productdata, setproductdata] = useState({
    productname: "",
    productdescription: "",
    startingbidprice: 0,
    productCategory:"",
  });
  const navigate=useNavigate();

  const imageListRef = ref(storage, "images/");

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

    console.log(productdata);
  };



  const UploadProduct = () => {

    console.log("Product Data", productdata)
    console.log("Product categoty", category)

    // if (UploadImage == null) {
    //   return
    // }

    const ImageRef = ref(storage, `images/${UploadImage.name}`)
    uploadBytes(ImageRef, UploadImage).then((snapshot) => {
      toast.success('Uploaded a blob or file!');
    });

    const user=auth.currentUser;
set(ref(db, 'productUploaded/'+ user?.uid), {
  ProductName: productdata?.productname,
    ProductDescription: productdata?.productdescription,
    StartingBidPrice: productdata?.startingbidprice,
    ProductCategory: productdata?.productCategory,
})
.then(() => {
   toast.success("Product Added For Auction Successfully!");
   setproductdata({
       email:"",
  password:"",
  mobile:"",
  username:"",
  }
      );
    

     setTimeout(()=>{
          navigate('/sellitem'); 
     },4000);
}).catch((error)=>{
  toast.error("Error", error);
})



  }

  useEffect(() => {
    listAll(imageListRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url => {
          setImageList((prev) => [...prev, url])

        }))
      })
    })
  }, []);


 
  return (

    <>

      <div className='SearchEngine'>

        <div className='customerSupport'>
          <SupportAgentIcon className='customerSupportIcon' />
          <h3>Customer Support</h3>
        </div>



        <Paper
          component="form"



        >

          <InputBase

            placeholder="Search Product By Name"
            className='ProductsearchBar'
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton type="button" aria-label="search">
            <SearchIcon />
          </IconButton>


        </Paper>

      </div>

      <div className='myAuctionHeader'>
        <h1>My Auction Listing</h1>

      </div>

      <Button variant="contained" className='modalBtn' endIcon={<AddToHomeScreenIcon />} onClick={handleOpen}> Enter Product Details</Button>


      <Modal
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
            <input className='inputText' type="file" onChange={(event) => setUploadImage(event.target.files[0])}></input>
            <TextField fullWidth label="Description" variant="filled"  focused name="productdescription"
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

          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>

            {/* <TextField

              select
              label="Product Category"
              defaultValue="Camera"
              SelectProps={{
                native: true,
              }}
              helperText="Please choose a category"
              fullWidth
              name="productCategory"
              value={productdata.productCategory}
              onChange={handleChange}
            >
              {currencies.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}

            </TextField> */}
          </div>

          <Button variant="contained" className='uploadProductBtn' endIcon={<SendIcon />} onClick={UploadProduct}> Upload Product To Auction </Button>




        </Box>
      </Modal>

      {/* {ImageList.map((url) => {
        return <img src={url} />
      })} */}

      {/* {
        productdata.map((item, index)=>{
          return <div>
            <h1>{item.}</h1>
          </div>
        })
      } */}
    </>

    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     component="img"
    //     alt="green iguana"
    //     height="140"
    //     image="/static/images/cards/contemplative-reptile.jpg"
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div">
    //       Lizard
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary">
    //       Lizards are a widespread group of squamate reptiles, with over 6,000
    //       species, ranging across all continents except Antarctica
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Share</Button>
    //     <Button size="small">Learn More</Button>
    //   </CardActions>
    // </Card>

  )
}







