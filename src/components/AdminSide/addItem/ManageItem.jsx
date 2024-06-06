import React, { useState } from 'react';

// คอมโพเนนต์สำหรับแสดงรายการสินค้า
const ProductList = ({ products }) => (
  <div className="mt-8">
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">ชื่อสินค้า</th>
          <th className="px-4 py-2">สถานะ</th>
          <th className="px-4 py-2">ประเภท</th>
          <th className="px-4 py-2">วันที่สร้าง</th>
          <th className="px-4 py-2">จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-t">
            <td className="px-4 py-2">{product.name}</td>
            <td className="px-4 py-2">
              <span
                className={`px-2 py-1 font-semibold rounded-md ${
                  product.status === 'active'
                    ? 'bg-green-200 text-green-800'
                    : 'bg-red-200 text-red-800'
                }`}
              >
                {product.status}
              </span>
            </td>
            <td className="px-4 py-2">{product.type}</td>
            <td className="px-4 py-2">{product.createdAt}</td>
            <td className="px-4 py-2 text-blue-500 hover:underline cursor-pointer">
              จัดการ
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// คอมโพเนนต์สำหรับฟอร์มเพิ่มสินค้า
const ProductModal = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('active');
  const [type, setType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, status, type });
    setName('');
    setStatus('active');
    setType('');
    onClose();
  };

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">เพิ่มสินค้า</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                ชื่อสินค้า
              </label>
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
              <label htmlFor="status" className="block text-gray-700 font-bold mb-2">
                สถานะ
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
                ประเภท
              </label>
              <input
                type="text"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
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
        </div>
      </div>
    </div>
  );
};

// คอมโพเนนต์หลักของหน้าจัดการสินค้า
const ManageItem = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddProduct = (product) => {
    setProducts([
      ...products,
      { id: Date.now(), ...product, createdAt: new Date().toLocaleString() },
    ]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการสินค้า</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        เพิ่มสินค้า
      </button>
      <ProductList products={products} />
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default ManageItem;
