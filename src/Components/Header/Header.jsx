import React, { useContext } from 'react';
import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext, FirebaseContext } from '../../Store/firebaseContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext); 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  const handleSell = (e)=>{
   e.preventDefault()

   navigate('/create');
  }

  

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>
        <div className="loginPage">
          <span>{user ? user.displayName : 'LOGIN'}</span>
          <hr />
        </div>

        {user && (
          <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </span>
        )}
        <div onClick={handleSell} className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span >SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
