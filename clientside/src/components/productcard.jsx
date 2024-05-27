import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ProductView from './productview';
function ProductCard({ product }) {
  const { id, name, image, price, productDescription } = product;
  const [showProductView, setShowProductView] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (id) => {
    if (id === selectedProductId && showProductView) {
      setShowProductView(false);
      setSelectedProductId(null);
    } else {
      // ถ้าคลิกที่สินค้าใหม่ ให้แสดง ProductView
      setShowProductView(true);
      setSelectedProductId(id);
    }
  };

  return (
    <>
    <a onClick={() => handleProductClick(id)} className="group"> 
    
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full" src={`/uploads/${image}`} alt={name} />
  <div className="px-6 py-4">
    <div className="font-bold text-xl mb-2">{name}</div>
    <p className="text-gray-700 text-base">
    {productDescription}
    </p>
  </div>
  <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{price} บาท</span>
  </div>
</div>
</a>
{showProductView && (
        <ProductView 
          productId={selectedProductId} 
          onClose={() => setShowProductView(false)} 
        />
      )}

    </>
  );
}

export default ProductCard;
