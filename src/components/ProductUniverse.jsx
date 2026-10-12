import React, { useState, useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { productCategories } from '../data/products';
import { ArrowRight, Hexagon, Search, X, Droplet, FlaskConical, Atom, Network, Beaker, Sparkles } from 'lucide-react';
import ProductModal from './ProductModal';
import './ProductUniverse.css';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons = {
  'surfactants': Droplet,
  'esters': FlaskConical,
  'ethoxylation': Atom,
  'fatty-amines': Network,
  'sulphonation': Beaker,
  'specialty': Sparkles
};

export default function ProductUniverse() {
  const [activeCategory, setActiveCategory] = useState(productCategories[0]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  // Flatten all products for global search
  const allProducts = useMemo(() => {
    return productCategories.flatMap(cat => 
      cat.products.map(p => ({
        ...p,
        categoryId: cat.id,
        categoryName: cat.name
      }))
    );
  }, []);

  const isSearching = searchQuery.length > 0;

  // Global live filtering vs Active Category
  const filteredProducts = useMemo(() => {
    if (!isSearching) {
      return activeCategory.products.map(p => ({
        ...p,
        categoryId: activeCategory.id,
        categoryName: activeCategory.name,
      }));
    }
    
    const lowerQuery = searchQuery.toLowerCase();
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(lowerQuery) || 
      p.categoryName.toLowerCase().includes(lowerQuery)
    );
  }, [activeCategory, searchQuery, allProducts, isSearching]);

  const displayedProducts = filteredProducts.slice(0, visibleCount);

  // Reset visible count when active category or search changes
  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, searchQuery]);

  // Handle smooth 20px slide fade for cards on category/search update
  useEffect(() => {
    if (gridRef.current && gridRef.current.children.length > 0) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }, [activeCategory, searchQuery, visibleCount]);

  return (
    <section className="section universe-section" ref={sectionRef}>
      <div className="container universe-container">
        
        {/* Centered Header */}
        <div className="universe-header">
          <div className="universe-label">PRODUCT LIBRARY</div>
          <h2 className="section-title text-gradient">Product Catalog</h2>
          <p className="page-subtitle universe-subtitle">
            Explore our extensive catalog of high-performance molecular compounds, meticulously engineered for industry-leading applications.
          </p>
        </div>

        {/* Premium Search Bar */}
        <div className="universe-search-container">
          <div className="search-bar-wrapper">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="universe-search-input"
              placeholder="Search by product name, category or application..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="search-clear-btn" onClick={() => setSearchQuery('')}>
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Categories Navigation Grid */}
        <div className={`universe-nav-grid ${isSearching ? 'is-searching' : ''}`}>
          {productCategories.map((cat) => {
            const CatIcon = categoryIcons[cat.id] || Hexagon;
            const isActive = !isSearching && activeCategory.id === cat.id;
            
            return (
              <button
                key={cat.id}
                className={`category-grid-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery('');
                }}
              >
                <div className="category-grid-content">
                  <div className="category-icon-container">
                    <CatIcon size={25} className="category-grid-icon" strokeWidth={1.5} />
                  </div>
                  <span className="category-name">{cat.name}</span>
                </div>
                <div className="category-arrow-container">
                  <ArrowRight size={18} strokeWidth={2} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Search UX Info */}
        {isSearching && (
          <div className="search-results-info">
            Showing {filteredProducts.length} result{filteredProducts.length !== 1 && 's'} for "{searchQuery}"
          </div>
        )}

        {/* Clean Grid Display */}
        {filteredProducts.length > 0 ? (
          <div className="products-grid" ref={gridRef}>
            {displayedProducts.map((product, idx) => {
              const ProductIcon = categoryIcons[product.categoryId] || Hexagon;
              
              return (
                <div 
                  key={`${product.categoryId}-${idx}-${product.name}`} 
                  className="product-card interactive"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="product-card-spotlight"></div>
                  <div className="product-icon-wrapper">
                    <ProductIcon size={24} strokeWidth={1.5} />
                  </div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <p className="product-desc">
                      High-purity technical grade
                    </p>
                    {isSearching && (
                      <div className="product-category-tag">
                        {product.categoryName}
                      </div>
                    )}
                  </div>
                  <div className="product-arrow">
                    <ArrowRight size={24} strokeWidth={1.5} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <Search className="empty-state-icon" size={48} strokeWidth={1} />
            <h3>No matching products found</h3>
            <p>Try adjusting your search or browse a different category.</p>
            <button className="reset-search-btn" onClick={() => setSearchQuery('')}>
              Clear Search
            </button>
          </div>
        )}

        {/* Load More Button */}
        {filteredProducts.length > displayedProducts.length && (
          <div className="load-more-container">
            <button 
              className="load-more-btn interactive"
              onClick={() => setVisibleCount(prev => prev + 8)}
            >
              Load More Products
            </button>
          </div>
        )}
      </div>

      <ProductModal 
        product={selectedProduct} 
        category={selectedProduct?.categoryName || activeCategory.name} 
        onClose={() => setSelectedProduct(null)} 
      />
    </section>
  );
}
