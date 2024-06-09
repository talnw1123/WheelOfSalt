import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css';
import { useRecoilValue } from 'recoil';
import userState from '../ีUserRecoil';
import WheelPopUp from '../WheelPopUp/WheelPopUp';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isWheelPopupOpen, setIsWheelPopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [userMoney, setUserMoney] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:4400/api/getOneProduct/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const fetchUserMoney = async () => {
    try {
      const response = await axios.get(`http://localhost:4400/api/getUserMoney/${user.email}`);
      setUserMoney(response.data.money);
    } catch (error) {
      console.error('Error fetching user money:', error);
    }
  };

  const handleBuyNowClick = async () => {
    setErrorMessage('');
    await fetchUserMoney();
    setIsConfirmPopupOpen(true);
  };

  const handleConfirmPurchase = async () => {
    if (userMoney < product.price) {
      setErrorMessage('ยอดเงินไม่เพียงพอ');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4400/api/deductUserMoney', {
        email: user.email,
        amount: product.price
      });
      if (response.data.success) {
        setIsConfirmPopupOpen(false);
        setIsWheelPopupOpen(true);
      } else {
        setErrorMessage('เกิดข้อผิดพลาดในการทำธุรกรรม');
      }
    } catch (error) {
      console.error('Error deducting money:', error);
      setErrorMessage('เกิดข้อผิดพลาดในการทำธุรกรรม');
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  const isButtonDisabled = product.items.some(item => !item.information);

  return (
    <div className="product-detail">
      <img src={`http://localhost:4400${product.imageUrl}`} alt={product.productName} />
      <h1>{product.productName}</h1>
      <p>Type: {product.type}</p>
      <p>Price: {product.price} บาท</p>
      <p>Details: {product.productDetails}</p>
      <button disabled={isButtonDisabled} onClick={handleBuyNowClick}>
        Buy Now
      </button>

      {isConfirmPopupOpen && (
        <div className="confirm-popup">
          <p>คุณต้องการจะซื้อใช่ไหม?</p>
          <p>ยอดเงินของคุณ: {userMoney} บาท</p>
          <button onClick={handleConfirmPurchase}>ยืนยัน</button>
          <button onClick={() => setIsConfirmPopupOpen(false)}>ยกเลิก</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      )}

      {isWheelPopupOpen && (
        <WheelPopUp productId={id} onClose={() => setIsWheelPopupOpen(false)} />
      )}
    </div>
  );
};

export default ProductDetail;
