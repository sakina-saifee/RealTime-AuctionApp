

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';



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
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { toast } from 'react-toastify';
import { ref as dbref, onValue, push, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AddProduct } from '../../store/slices/ProductSlice';


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
    {
      value: 'Headphones',
      label: 'Headphones',
    },
  ];
  const [url, seturl] = useState(null);
  const [UploadImage, setUploadImage] = useState(null);
  const [ImageList, setImageList] = useState([]);
  const [UserProductsAuction, setUserProductsAuction] = useState([]);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [productdata, setproductdata] = useState({
    productname: "",
    productdescription: "",
    startingbidprice: 0,
    productCategory: "",
  });
  const navigate = useNavigate();



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

    // const geturl = ref(storage, `images/${UploadImage?.name}`)




  }

  useEffect(() => {
    if (UploadImage) {
      imageChanges();
    }
  }, [UploadImage]);

  const UploadProduct = () => {

    console.log("Product Data", productdata)

    if (UploadImage == null) {
      return
    }


    const user = auth.currentUser;
    console.log("Product idd user", user.uid)
    push(dbref(db, 'productUploadedForAuction/' + user?.uid), {
      ProductName: productdata?.productname,
      ProductDescription: productdata?.productdescription,
      StartingBidPrice: productdata?.startingbidprice,
      ProductCategory: productdata?.productCategory,
      Url: url,
      DateUploaded: Date.now(),
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


  // const imageListRef = ref(storage, "images/");
  // useEffect(() => {
  //   listAll(imageListRef).then((res) => {
  //     res.items.forEach((item) => {
  //       getDownloadURL(item).then((url => {
  //         setImageList((prev) => [...prev, url])

  //       }))
  //     })
  //   })
  // }, []);



  // const [user, setUser] = useState("");


  useEffect(() => {
    auth.onAuthStateChanged((userlogged) => {
      if (userlogged) {


        const userRef = dbref(db, 'productUploadedForAuction/' + `${userlogged?.uid}/`)
        onValue(userRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const Proddata = Object.values(data);
            console.log("Proddata", Proddata);
            setUserProductsAuction(Proddata);
          }

        });
      } else {
        setUserProductsAuction(null);
      }
    });
  }, []);


  useEffect(() => {


    dispatch(AddProduct({
      UserProductsAuction
    }))

  }, [UserProductsAuction])




  useEffect(() => {

    console.log("user products", UserProductsAuction);

  }, [UserProductsAuction])

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
            <input className='inputText' type="file" onChange={(event) => {
              const file =event.target.files[0];
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
      </Modal>

      {/* {ImageList.map((url) => {
        return <img src={url} />
      })} */}

<div className='cardsDiv'>
{
        UserProductsAuction.map((item, index) => {
          const timestamp = item.DateUploaded; // Example timestamp
          const date = new Date(timestamp);
          const dateString = date.toLocaleTimeString();
          console.log("date stringggg", dateString);

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
              <Button variant="contained" color="success" className='editproduct' >Edit</Button>
              <Button variant="contained" color="error" className='delproduct' >Delete</Button>
               
          
              </CardActions>
            </Card>
          </div>
        })
      }
</div>
      
    </>



  )
}







