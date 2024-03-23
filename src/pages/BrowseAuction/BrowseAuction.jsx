import React, { useState, useEffect} from 'react';
import Search from '../../components/Search/Search'
import { auth, db } from '../../firebaseConfig/firebase';
import { ref as dbref, onValue, push, remove, set, update } from 'firebase/database';

const BrowseAuction = () => {

    // const [AllProductsAuction, setAllProductsAuction]=useState(null)

    // useEffect(() => {
    //     const userRef = dbref(db, 'productUploadedForAuction/');
    //     onValue(userRef, (snapshot) => {
    //       const data = snapshot?.val();
    //       console.log("all data", data);
    //       if (data) {
    //         const dataValues = Object.values(data);
    //         // Assuming you want to merge the 0th and 1th index
    //         const mergedData = [...dataValues[0], ...dataValues[1]];
    //         console.log("Merged data", mergedData);
    //         setAllProductsAuction(mergedData);
    //       }
    //     })
        
    // },[]);

    useEffect(() => {
    
    
    
            const userRef = dbref(db, 'productUploadedForAuction/')
            onValue(userRef, (snapshot) => {
              const data = snapshot.val();
              console.log("all dataaa", data);
              if (data) {
                const Proddata = Object?.values(data).flat();
                
                console.log("all dataaa neww", Proddata);
                console.log("Proddata", Proddata);
          
              }
    
            });
          
      }, []);
  return (
    <div>
      <Search/>


    </div>
  )
}

export default BrowseAuction
