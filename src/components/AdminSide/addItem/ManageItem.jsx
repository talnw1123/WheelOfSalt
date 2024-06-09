import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageItem.css';

// Item Modal Component
const InformationModal = ({ isOpen, onClose, onSave, initialInformation }) => {
  const [informationList, setInformationList] = useState(initialInformation || ['']);

  useEffect(() => {
    setInformationList(initialInformation || ['']);
  }, [initialInformation]);

  const handleChange = (index, event) => {
    const newInformationList = [...informationList];
    newInformationList[index] = event.target.value;
    setInformationList(newInformationList);
  };

  const handleAddField = () => {
    setInformationList([...informationList, '']);
  };

  const handleDeleteField = (index) => {
    const newInformationList = informationList.filter((_, i) => i !== index);
    setInformationList(newInformationList);
  };

  const handleSave = () => {
    onSave(informationList);
    onClose();
  };

  return (
    <div className={`popup-container fixed z-30 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">ข้อมูล</h2>
          {informationList.map((info, index) => (
            <div key={index} className="mb-4 flex items-center">
              <input
                type="text"
                value={info}
                onChange={(e) => handleChange(index, e)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <button
                type="button"
                onClick={() => handleDeleteField(index)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                ลบ
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddField}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
          >
            เพิ่มช่องข้อมูล
          </button>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Item Modal Component
const ItemModal = ({ isOpen, onClose, onAddItem, item }) => {
  const [name, setName] = useState(item ? item.name : '');
  const [minDegree, setMinDegree] = useState(item ? item.minDegree : 0);
  const [maxDegree, setMaxDegree] = useState(item ? item.maxDegree : 0);
  const [information, setInformation] = useState(item ? item.information : []);
  const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setMinDegree(item.minDegree);
      setMaxDegree(item.maxDegree);
      setInformation(item.information);
    } else {
      setName('');
      setMinDegree(0);
      setMaxDegree(0);
      setInformation([]);
    }
  }, [item, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, minDegree, maxDegree, information });
    onClose();
  };

  return (
    <div className={`popup-container fixed z-20 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">{item ? 'แก้ไขไอเท็ม' : 'เพิ่มไอเท็ม'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">ชื่อไอเท็ม</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="minDegree" className="block text-gray-700 font-bold mb-2">Min Degree</label>
              <input
                type="number"
                id="minDegree"
                value={minDegree}
                onChange={(e) => setMinDegree(parseInt(e.target.value, 10))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maxDegree" className="block text-gray-700 font-bold mb-2">Max Degree</label>
              <input
                type="number"
                id="maxDegree"
                value={maxDegree}
                onChange={(e) => setMaxDegree(parseInt(e.target.value, 10))}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">ข้อมูล</label>
              <button
                type="button"
                onClick={() => setIsInformationModalOpen(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                จัดการข้อมูล
              </button>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {item ? 'บันทึก' : 'เพิ่ม'}
              </button>
            </div>
          </form>

          <InformationModal
            isOpen={isInformationModalOpen}
            onClose={() => setIsInformationModalOpen(false)}
            onSave={(info) => setInformation(info)}
            initialInformation={information}
          />
        </div>
      </div>
    </div>
  );
};

// Product Modal Component
const ProductModal = ({ isOpen, onClose, onSubmit, product }) => {
  const [name, setName] = useState(product ? product.productName : '');
  const [status, setStatus] = useState(product ? product.status : 'active');
  const [type, setType] = useState(product ? product.type : 'gameAccount');
  const [order, setOrder] = useState(product ? product.order : 0);
  const [price, setPrice] = useState(product ? product.price : 0);
  const [productDetails, setProductDetails] = useState(product ? product.productDetails : '');
  const [file, setFile] = useState(null);
  const [items, setItems] = useState(product ? product.items : []);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    if (product) {
      setName(product.productName);
      setStatus(product.status);
      setType(product.type);
      setOrder(product.order);
      setPrice(product.price);
      setProductDetails(product.productDetails);
      setItems(product.items);
    } else {
      setName('');
      setStatus('active');
      setType('gameAccount');
      setOrder(0);
      setPrice(0);
      setProductDetails('');
      setFile(null);
      setItems([]);
    }
  }, [product, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('productName', name);
    formData.append('status', status);
    formData.append('type', type);
    formData.append('order', order);
    formData.append('price', price);
    formData.append('productDetails', productDetails);
    if (file) {
      formData.append('image', file);
    }
    formData.append('items', JSON.stringify(items));

    try {
      if (product) {
        await axios.post(`http://localhost:4400/api/updatedProduct/${product._id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://localhost:4400/api/createProduct', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      onSubmit();
      onClose(); // ปิดฟอร์มเมื่อการเรียก API สำเร็จ
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleAddItem = (newItem) => {
    if (editingItem !== null) {
      const newItems = items.map((item, index) => (index === editingItem ? newItem : item));
      setItems(newItems);
      setEditingItem(null);
    } else {
      setItems([...items, newItem]);
    }
  };

  const handleEditItem = (index) => {
    setEditingItem(index);
    setIsItemModalOpen(true);
  };

  const handleDeleteItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  return (
    <div className={`popup-container fixed z-30 inset-0 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl">
          <h2 className="text-lg font-bold mb-4">{product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้า'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">ชื่อสินค้า</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block text-gray-700 font-bold mb-2">สถานะ</label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">ประเภท</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              >
                <option value="gameAccount">Game Account</option>
                <option value="inGameItem">inGameItem</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="order" className="block text-gray-700 font-bold mb-2">ลำดับ</label>
              <input
                type="number"
                id="order"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block text-gray-700 font-bold mb-2">ราคา</label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="productDetails" className="block text-gray-700 font-bold mb-2">รายละเอียดสินค้า</label>
              <textarea
                id="productDetails"
                value={productDetails}
                onChange={(e) => setProductDetails(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="image" className="block text-gray-700 font-bold mb-2">รูปภาพ</label>
              <input
                type="file"
                id="image"
                onChange={(e) => setFile(e.target.files[0])}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <h3 className="block text-gray-700 font-bold mb-2">ไอเท็ม</h3>
              <button
                type="button"
                onClick={() => setIsItemModalOpen(true)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                เพิ่มไอเท็ม
              </button>
              <ul className="mt-4">
                {items.map((item, index) => (
                  <li key={index} className="flex items-center justify-between mb-2">
                    <span>{item.name}</span>
                    <div>
                      <button
                        type="button"
                        onClick={() => handleEditItem(index)}
                        className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                      >
                        แก้ไข
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        ลบ
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                บันทึก
              </button>
            </div>
          </form>
          <ItemModal
            isOpen={isItemModalOpen}
            onClose={() => setIsItemModalOpen(false)}
            onAddItem={handleAddItem}
            item={editingItem !== null ? items[editingItem] : null}
          />
        </div>
      </div>
    </div>
  );
};

// Main Component
const ManageItem = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4400/api/getAllProducts');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:4400/api/deleteProduct/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการสินค้า</h1>
      <button
        onClick={handleAddProduct}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        เพิ่มสินค้า
      </button>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ชื่อสินค้า</th>
            <th className="py-2 px-4 border-b">สถานะ</th>
            <th className="py-2 px-4 border-b">ประเภท</th>
            <th className="py-2 px-4 border-b">ลำดับ</th>
            <th className="py-2 px-4 border-b">ราคา</th>
            <th className="py-2 px-4 border-b">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="py-2 px-4 border-b">{product.productName}</td>
              <td className="py-2 px-4 border-b">{product.status}</td>
              <td className="py-2 px-4 border-b">{product.type}</td>
              <td className="py-2 px-4 border-b">{product.order}</td>
              <td className="py-2 px-4 border-b">{product.price}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEditProduct(product)}
                  className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2"
                >
                  แก้ไข
                </button>
                <button
                  onClick={() => handleDeleteProduct(product._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  ลบ
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={fetchProducts}
        product={selectedProduct}
      />
    </div>
  );
};

export default ManageItem;
