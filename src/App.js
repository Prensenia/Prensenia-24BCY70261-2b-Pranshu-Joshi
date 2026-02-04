import React, { useState } from 'react';
import './App.css';

const products = [
  { name: 'Premium Gaming Headset', price: '$189.99', category: 'electronics', rating: '4.8', reviews: 324 },
  { name: 'Dragon-Themed Tech T-Shirt', price: '$34.99', category: 'clothing', rating: '4.6', reviews: 156 },
  { name: 'Smart Home Hub', price: '$129.99', category: 'electronics', rating: '4.7', reviews: 289 },
  { name: 'Performance Athletic Joggers', price: '$74.99', category: 'clothing', rating: '4.5', reviews: 198 },
  { name: 'Wireless Charging Pad', price: '$49.99', category: 'electronics', rating: '4.9', reviews: 412 },
  { name: 'Premium Hoodie', price: '$89.99', category: 'clothing', rating: '4.7', reviews: 267 },
  { name: 'Mechanical Keyboard', price: '$159.99', category: 'electronics', rating: '4.8', reviews: 334 },
  { name: 'Canvas Sneakers', price: '$94.99', category: 'clothing', rating: '4.6', reviews: 215 },
];

function App() {
  const [filteredCategory, setFilteredCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('name');

  const handleFilterChange = (event) => {
    setFilteredCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  let filteredProducts = filteredCategory === 'All Products' 
    ? products 
    : products.filter(product => product.category === filteredCategory);

  // Sorting logic
  if (sortBy === 'price-low') {
    filteredProducts = [...filteredProducts].sort((a, b) => 
      parseFloat(a.price.slice(1)) - parseFloat(b.price.slice(1))
    );
  } else if (sortBy === 'price-high') {
    filteredProducts = [...filteredProducts].sort((a, b) => 
      parseFloat(b.price.slice(1)) - parseFloat(a.price.slice(1))
    );
  } else if (sortBy === 'rating') {
    filteredProducts = [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🐉 Pranshu's Product Marketplace</h1>
        <p className="tagline">Discover Premium Products With Smart Filtering & Sorting</p>
      </header>
      
      <div className="controls-container">
        <div className="filter-bar">
          <label htmlFor="product-filter">Filter by Category: </label>
          <select 
            id="product-filter" 
            value={filteredCategory} 
            onChange={handleFilterChange}
          >
            <option value="All Products">All Categories</option>
            <option value="electronics">⚡ Electronics & Gadgets</option>
            <option value="clothing">👕 Fashion & Apparel</option>
          </select>
        </div>

        <div className="sort-bar">
          <label htmlFor="product-sort">Sort by: </label>
          <select 
            id="product-sort" 
            value={sortBy} 
            onChange={handleSortChange}
          >
            <option value="name">Product Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <div className="product-count">
        Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
      </div>

      <div className="product-cards">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-header">
                <h3>{product.name}</h3>
                <span className="rating">⭐ {product.rating}</span>
              </div>
              <p className="price">{product.price}</p>
              <p className="reviews">({product.reviews} reviews)</p>
              <span className={`category ${product.category}`}>{product.category}</span>
            </div>
          ))
        ) : (
          <div className="no-products">No products found</div>
        )}
      </div>
    </div>
  );
}

export default App;
