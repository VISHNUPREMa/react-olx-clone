import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { AuthContext, FirebaseContext } from '../../Store/firebaseContext';
import { setDoc, doc, getFirestore } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      console.log('Please select an image');
      return;
    }

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `/image/${image.name}`);
      const snapshot = await uploadBytes(storageRef, image);
      const url = await getDownloadURL(snapshot.ref);

      const db = getFirestore(firebase);
      await setDoc(doc(db, "products", `${name}_${new Date().getTime()}`), {
        name,
        category,
        price,
        imageUrl: url,
        userId: user.uid,
        createdAt: new Date().toISOString()
      });

      console.log('Document successfully written!');
    } catch (error) {
      console.error('Error writing document: ', error);
    }


    navigate("/")
  };

  return (
    <Fragment>
      <Header />
      <div className="centerDiv">
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="category">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <br />
          <label htmlFor="price">Price</label>
          <br />
          <input
            className="input"
            type="number"
            id="price"
            name="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ""} />
          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button type="submit" className="uploadBtn">Upload and Submit</button>
        </form>
      </div>
    </Fragment>
  );
};

export default Create;
