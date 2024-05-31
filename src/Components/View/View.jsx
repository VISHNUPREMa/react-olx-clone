import React, { useEffect, useState, useContext } from 'react';
import './View.css';
import { PostContext } from '../../Store/postContext';
import { FirebaseContext } from '../../Store/firebaseContext';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

function View() {
  const [userDetails, setUserDetails] = useState(null);
  const { postDetails } = useContext(PostContext);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (postDetails && postDetails.userId) {
        try {
          console.log("postDetails : ",postDetails);
          const db = getFirestore(firebase);
          const userDocRef = doc(db, 'users', postDetails.userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserDetails(userDoc.data());
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };

    fetchUserDetails();
  }, [postDetails, firebase]);

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails?.imageUrl}
          alt="Product"
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails?.price || 'N/A'} </p>
          <span>{postDetails?.name || 'N/A'}</span>
          <p>{postDetails?.category || 'N/A'}</p>
          <span>{new Date(postDetails?.createdAt).toDateString() || 'N/A'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails?.userName || 'N/A'}</p>
          <p>{userDetails?.email || 'N/A'}</p>
          <p>{userDetails?.phone || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

export default View;
