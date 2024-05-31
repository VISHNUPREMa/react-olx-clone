import React, { useState, useEffect, useContext } from 'react';
import { collection, onSnapshot , getFirestore } from "firebase/firestore";
import Heart from '../../assets/Heart';
import './Posts.css';
import { FirebaseContext } from '../../Store/firebaseContext';
import { PostContext } from '../../Store/postContext';
import { useNavigate } from 'react-router-dom';



function Posts() {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);
  const {setPostDetails} = useContext(PostContext);

  const navigate = useNavigate()

  useEffect(() => {
    const db = getFirestore(firebase);
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const allProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("allProducts : ",allProducts);
      setProducts(allProducts);
    });

    return () => unsub(); 
  }, [firebase]);


 




  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div  className="cards">
          {products.map((product) => (
            <div onClick={()=>{
              
              setPostDetails(product)
              navigate("/view")

            }} className="card" key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <h3 className="name">{product.name}</h3>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="card" key={product.id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;

