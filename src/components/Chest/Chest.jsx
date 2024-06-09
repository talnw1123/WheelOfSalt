import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chest.css';

const Chest = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4400/api/getAllProducts');
        const activeProducts = response.data
          .filter(product => product.status === 'active')
          .sort((a, b) => a.order - b.order);
        setItems(activeProducts);
      } catch (error) {
        console.error('There was an error fetching the products!', error);
      }
    };

    fetchProducts();
  }, []);

  const handleItemClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        Roblox Cases
      </header>
      <div className="item-container">
        {items.map((item) => (
          <div key={item._id} className="item" onClick={() => handleItemClick(item._id)}>
            <div className="item-name">{item.productName}</div>
            <img
              src={`http://localhost:4400${item.imageUrl}`}
              className="item-image"
              alt={item.productName}
            />
            <div className="item-type">{item.type}</div>
            <div className="item-price">
              <div className="price-trapezoid">{item.price} บาท</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chest;
