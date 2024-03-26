import React, { useState, useEffect} from 'react';
import Search from '../../components/Search/Search'
import { auth, db } from '../../firebaseConfig/firebase';
import { ref as dbref, onValue, push, remove, set, update } from 'firebase/database';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {TextField } from '@material-ui/core';
import {  MenuItem, Select } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { toast } from 'react-toastify';

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

const BrowseAuction = () => {

    const [AllProductsAuction, setAllProductsAuction]=useState([])
    const [OpenBidModal, SetOpenBidModal]=useState(false)

    const handleOpen = () => SetOpenBidModal(true);
    const handleClose = () => SetOpenBidModal(false);

    const [Biddedproductdata, setBiddedproductdata] = useState({
      productname: "",
      productdescription: "",
      startingbidprice: 0,
      productcategory: "",
      pushkey:"",
      useruid:"",
    });

// display all products
    useEffect(() => {
    
    
    
            const userRef = dbref(db, 'productUploadedForAuction/')
            onValue(userRef, (snapshot) => {
              const data = snapshot.val();
              // console.log("all dataaa", data);
              if (data) {
             
                const allValues = Object.values(data).flatMap(Object.values);
                // console.log("Proddata", allValues);
                setAllProductsAuction(allValues)
          
              }
    
            });
          
      }, []);


      // bid prodcuct

      const handleChange = (e) => {
        const { name, value } = e.target;
        setBiddedproductdata((prevdata) => ({
    
          ...prevdata,
          [name]: value,
    
    
        }));
    
      };
      useEffect(()=>{
        console.log("Biddedproductdata", Biddedproductdata.startingbidprice);

        
      },[])

      const BidNow=(ProductName, ProductDescription, ProductCategory, ActualStartingBidPrice, PushKey,  UserUid)=>{
console.log("Biddedproductdataooo", Biddedproductdata.startingbidprice, ActualStartingBidPrice)
// if(Biddedproductdata.startingbidprice<ActualStartingBidPrice){
//   toast.error("Bid price should be higher");
// }

      }
      const CancelBid=()=>{
        
      }

  return (
    <div>
      <Search/>

      <Modal
        open={OpenBidModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Sell An Item
          </Typography>

          <div className='inputs'>

            {/* <TextField fullWidth label="Product Name" variant="filled" className="successText" focused name="productname"
              />
        
            <TextField fullWidth label="Description" variant="filled" focused name="productdescription"
            /> */}
            <TextField fullWidth type="number" label="Starting Bid Price" variant="filled" focused
              name="startingbidprice"
              value={Biddedproductdata.startingbidprice}
              onChange={handleChange}
             
            />

            {/* <Select
              label="Product Category"
              defaultValue="Camera"

              helperText="Please choose a category"
              fullWidth
              name="productCategory"
              

            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}

            </Select> */}


          </div>

          <Button variant="contained" className='uploadProductBtn' endIcon={<SendIcon />} onClick={() => {  }}> Place Bid</Button>




        </Box>
      </Modal>

      <div className='cardsDiv'>
        {
          AllProductsAuction?.map((item, index) => {
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
                  <Button variant="contained" color="success" className='bidProduct' onClick={() => { BidNow(item.ProductName, item.ProductDescription, item.ProductCategory, item.StartingBidPrice, item.PushKey,  item.UserUid); handleOpen() }} >Bid Now</Button>
                  <Button variant="contained" color="error" className='cancelBid' onClick={() => CancelBid(item.PushKey, index)}>Cancel Bid</Button>


                </CardActions>
              </Card>
            </div>
          })
        }
      </div>


    </div>
  )
}

export default BrowseAuction
