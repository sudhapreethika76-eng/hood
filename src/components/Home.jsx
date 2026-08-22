import React, { useState } from 'react';
import h1Img from '../assets/images/h1.png';
import prodSneakersImg from '../assets/images/prod_sneakers.jpg';
import greenSneakerImg from '../assets/images/green_sneaker.jpg';
import redSneakerImg from '../assets/images/red_sneaker.jpg';

// Section 2 Products (Essentials)
import artboard105 from '../assets/images/Artboard105.jpg'; // Royal Blue Front
import artboard100 from '../assets/images/Artboard100.jpg'; // Royal Blue Back
import artboard3_29 from '../assets/images/Artboard3_29.jpg'; // Black Flame Front
import artboard2_2 from '../assets/images/Artboard2_2.jpg'; // Black Flame Back
import artboard52_7 from '../assets/images/Artboard52_7.jpg'; // Olive Skate Front
import artboard53_5 from '../assets/images/Artboard53_5.png'; // Olive Skate Back

// Section 3 & 4 Products
import artboard18_66 from '../assets/images/Artboard18_66.jpg'; // Yellow Fleece Front
import artboard27_39 from '../assets/images/Artboard27_39.jpg'; // Yellow Fleece Back
import artboard12_69 from '../assets/images/Artboard12_69.jpg'; // Green Knit Front
import artboard10_70 from '../assets/images/Artboard10_70.jpg'; // Green Knit Back
import artboard33_2 from '../assets/images/Artboard33_2.jpg'; // Black Ride Front
import artboard_61_3 from '../assets/images/Artboard_61_3.jpg'; // Black Ride Back
import artboard42_13_1 from '../assets/images/Artboard42_13-1.jpg'; // Light Blue Front
import artboard44_13 from '../assets/images/Artboard44_13.jpg'; // Light Blue Back
import artboard59_5 from '../assets/images/Artboard59_5.jpg'; // Purple Front
import artboard60_5 from '../assets/images/Artboard60_5.jpg'; // Purple Back
import artboard96_1 from '../assets/images/Artboard96_1.jpg'; // Bright Blue Front
import artboard94_1 from '../assets/images/Artboard94_1.jpg'; // Bright Blue Back
import artboard8_68 from '../assets/images/Artboard8_68.jpg'; // Close-up detail

import '../assets/style/style.css';


function Home() {
  const [activeCategory, setActiveCategory] = useState('HOODIE');
  const [sliderIndex, setSliderIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedShowcaseId, setSelectedShowcaseId] = useState(10);
  const [showcaseViewMode, setShowcaseViewMode] = useState('HOODIE'); // 'HOODIE', 'MATCHING', 'FULL_SET'
  const [selectedCampaignColor, setSelectedCampaignColor] = useState('green'); // 'green' or 'red'

  const categories = ['HOODIE', 'CAPS & BAGS', 'OUTWEARS', 'SHOES', 'POPULAR'];

  const campaignData = {
    green: {
      hoodieImage: artboard52_7, // Olive green hoodie model front
      sneakerImage: greenSneakerImg,
      name: "Retro Green Sneakers",
      price: 89.99,
      description: "THE GREEN CLASSIC SNEAKER CO-ORD. FEATURING A PREMIUM OLIVE SUEDE AND MESH BODY, TAILORED TO PAIR WITH THE WINTER RUN OVERSIZED JOGGERS.",
      id: 201
    },
    red: {
      hoodieImage: artboard59_5, // Deep burgundy/purple hoodie model front
      sneakerImage: redSneakerImg,
      name: "Retro Burgundy Sneakers",
      price: 89.99,
      description: "THE BURGUNDY CLASSIC SNEAKER CO-ORD. FEATURING WINE-RED VELOUR OVERLAYS AND VINTAGE SPORT BRANDING, MATCHED TO THE FLAME SUIT COLLECTION.",
      id: 202
    }
  };

  const showcaseProducts = [
    {
      id: 10,
      name: "Cream Fleece Pullover",
      price: 20.99,
      image: artboard18_66,
      backImage: artboard27_39,
      description: "Premium heavyweight fleece pullover designed with a buttoned collar and relaxed silhouette.",
      matchingItem: {
        id: 101,
        name: "Cream Comfort Joggers",
        price: 25.99,
        image: artboard27_39,
        description: "Heavy-brushed cotton cargo sweatpants with utility pockets, designed to form a matching cream fleece set."
      }
    },
    {
      id: 11,
      name: "Bright Blue Weed Hoodie",
      price: 18.99,
      image: artboard96_1,
      backImage: artboard94_1,
      description: "Streetwear hoodie featuring a vibrant pink 'FLYING HIGH' back graphic and relaxed dropped shoulders.",
      matchingItem: {
        id: 102,
        name: "Orange Streetwear Joggers",
        price: 22.99,
        image: artboard94_1,
        description: "Contrast orange street utility joggers that perfectly complement the bright blue weed hoodie."
      }
    },
    {
      id: 12,
      name: "Green V-Pattern Sweater",
      price: 14.99,
      image: artboard12_69,
      backImage: artboard10_70,
      description: "Classic knit sweater in rich forest green with a striking white V pattern on front and back.",
      matchingItem: {
        id: 103,
        name: "Classic Black Denim Jeans",
        price: 28.99,
        image: artboard10_70,
        description: "Relaxed fit black washed denim jeans completing the clean green-on-black look."
      }
    }
  ];


  const essentialsProducts = [
    {
      id: 1,
      name: "Royal Blue Hoodie",
      label: "PREMIUM STREETWEAR",
      price: 39.99,
      frontImg: artboard105,
      backImg: artboard100,
    },
    {
      id: 2,
      name: "Black Flame Hoodie",
      label: "LIMITED DROP",
      price: 34.99,
      frontImg: artboard3_29,
      backImg: artboard2_2,
    },
    {
      id: 3,
      name: "Olive Skate Crew Hoodie",
      label: "SKATE CREW EDITION",
      price: 32.99,
      frontImg: artboard52_7,
      backImg: artboard53_5,
    }
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : item;
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const nextSlide = () => {
    setSliderIndex((prev) => (prev === 0 ? 1 : 0));
  };

  const prevSlide = () => {
    setSliderIndex((prev) => (prev === 1 ? 0 : 1));
  };

  const cartTotalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const selectedProduct = showcaseProducts.find((p) => p.id === selectedShowcaseId);

  return (
    <div className="home-container">
      {/* Classic Navbar */}
      <nav className="navbar-classic">
        <a href="/" className="nav-logo">
          PRESENT<span>.</span>
        </a>
        <ul className="nav-links">
          <li className="nav-link-item"><a href="#shop">Shop</a></li>
          <li className="nav-link-item"><a href="#shop">New Arrivals</a></li>
          <li className="nav-link-item"><a href="#shop">Collections</a></li>
          <li className="nav-link-item"><a href="#footer">About</a></li>
        </ul>
        <div className="nav-actions">
          <button className="nav-icon" aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <button className="nav-icon" aria-label="Account">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <button className="nav-icon cart-nav-icon" aria-label="Cart" onClick={() => setIsCartOpen(true)}>
            <div className="cart-badge-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cartTotalItems > 0 && (
                <span className="cart-badge">{cartTotalItems}</span>
              )}
            </div>
          </button>
        </div>
      </nav>

      {/* Hero Section (Section 1) */}
      <header className="hero-section" style={{ backgroundImage: `url(${h1Img})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tagline">Autumn / Winter '26 Drop</span>
          <h1 className="hero-title">Optimized Streetwear</h1>
          <p className="hero-desc">
            STAY PRESENT. Explore our latest drops, designed with clean silhouettes, premium heavy-weight fabrics, and an optimized fit for daily consciousness.
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => document.getElementById('shop').scrollIntoView({ behavior: 'smooth' })}>
              Shop Collection
            </button>
            <button className="btn-outline">Watch Film</button>
          </div>
        </div>
      </header>

      {/* Grid Cards Section (Section 2) */}
      <section className="shop-grid-section" id="shop">
        <div className="section-header">
          <span className="section-subtitle">Selected Pieces</span>
          <h2 className="section-title">The Essentials</h2>
        </div>

        <div className="grid-container">
          {essentialsProducts.map((product) => (
            <div key={product.id} className="grid-card product-grid-card">
              <div className="card-img-wrapper">
                <img src={product.frontImg} alt={product.name} className="card-img default-img" />
                <img src={product.backImg} alt={`${product.name} back`} className="card-img hover-img" />
              </div>
              <div className="card-header-content">
                <span className="card-label">{product.label}</span>
                <h3 className="card-title-hoodie">{product.name}</h3>
                <span className="card-price">${product.price.toFixed(2)}</span>
              </div>
              <div className="card-footer-content">
                <button className="add-to-cart-btn" onClick={() => addToCart(product)} aria-label="Add to Cart">
                  <span>ADD TO CART</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Showcase Section (Section 3) */}
      <section className="showcase-section">
        {/* Category Filter Bar */}
        <div className="filter-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {activeCategory === 'HOODIE' ? (
          <div className="showcase-grid-wrapper outfit-builder-layout">
            {/* Left Column: Stacked product selections */}
            <div className="product-list-col">
              {showcaseProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`product-list-card ${selectedShowcaseId === product.id ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedShowcaseId(product.id);
                    setShowcaseViewMode('HOODIE');
                  }}
                >
                  <div className="product-list-img-wrapper">
                    <img src={product.image} alt={product.name} className="product-list-img" />
                  </div>
                  <div className="product-list-card-details">
                    <span className="showcase-card-label">OUTFIT SET</span>
                    <h4>{product.name}</h4>
                    <span className="price-tag">${product.price.toFixed(2)}</span>
                  </div>
                  <button className="select-action-indicator" aria-label="Select Product">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            {/* Right Column: Interactive Fit Builder Canvas */}
            <div className="outfit-builder-container">
              {/* Tabs for switching views */}
              <div className="builder-tabs">
                <button 
                  className={`builder-tab ${showcaseViewMode === 'HOODIE' ? 'active' : ''}`}
                  onClick={() => setShowcaseViewMode('HOODIE')}
                >
                  THE HOODIE
                </button>
                <button 
                  className={`builder-tab ${showcaseViewMode === 'MATCHING' ? 'active' : ''}`}
                  onClick={() => setShowcaseViewMode('MATCHING')}
                >
                  MATCHING BOTTOM
                </button>
                <button 
                  className={`builder-tab ${showcaseViewMode === 'FULL_SET' ? 'active' : ''}`}
                  onClick={() => setShowcaseViewMode('FULL_SET')}
                >
                  THE FULL FIT
                </button>
              </div>

              {/* Interactive Showcase Screen */}
              <div className="builder-canvas">
                {showcaseViewMode === 'HOODIE' && (
                  <div className="builder-view-wrapper fade-in">
                    <img src={selectedProduct.image} alt={selectedProduct.name} className="builder-main-img" />
                    <div className="builder-img-badge">FRONT VIEW</div>
                  </div>
                )}
                {showcaseViewMode === 'MATCHING' && (
                  <div className="builder-view-wrapper fade-in">
                    <img src={selectedProduct.matchingItem.image} alt={selectedProduct.matchingItem.name} className="builder-main-img" />
                    <div className="builder-img-badge">MATCHING PIECE</div>
                  </div>
                )}
                {showcaseViewMode === 'FULL_SET' && (
                  <div className="builder-view-wrapper split-layout fade-in">
                    <div className="split-view">
                      <img src={selectedProduct.image} alt={selectedProduct.name} className="builder-split-img" />
                      <div className="split-label">TOP</div>
                    </div>
                    <div className="split-view">
                      <img src={selectedProduct.backImage} alt={selectedProduct.name} className="builder-split-img" />
                      <div className="split-label">BOTTOM</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Info, Price & Actions */}
              <div className="builder-details">
                <span className="builder-collection-tag">MATCH & SAVE SET</span>
                
                {showcaseViewMode === 'HOODIE' && (
                  <div className="builder-info-block fade-in">
                    <h3 className="builder-title">{selectedProduct.name}</h3>
                    <p className="builder-desc">{selectedProduct.description}</p>
                    <div className="builder-price-row">
                      <span className="builder-price">${selectedProduct.price.toFixed(2)}</span>
                      <button className="btn-primary-builder" onClick={() => addToCart(selectedProduct)}>
                        ADD HOODIE TO CART
                      </button>
                    </div>
                  </div>
                )}

                {showcaseViewMode === 'MATCHING' && (
                  <div className="builder-info-block fade-in">
                    <h3 className="builder-title">{selectedProduct.matchingItem.name}</h3>
                    <p className="builder-desc">{selectedProduct.matchingItem.description}</p>
                    <div className="builder-price-row">
                      <span className="builder-price">${selectedProduct.matchingItem.price.toFixed(2)}</span>
                      <button className="btn-primary-builder" onClick={() => addToCart({
                        id: selectedProduct.matchingItem.id,
                        name: selectedProduct.matchingItem.name,
                        price: selectedProduct.matchingItem.price,
                        frontImg: selectedProduct.matchingItem.image
                      })}>
                        ADD BOTTOM TO CART
                      </button>
                    </div>
                  </div>
                )}

                {showcaseViewMode === 'FULL_SET' && (
                  <div className="builder-info-block fade-in">
                    <h3 className="builder-title">{selectedProduct.name} + {selectedProduct.matchingItem.name}</h3>
                    <p className="builder-desc">Coordinated streetwear look. Order both the top hoodie and matching bottoms together to save 15% on the pair.</p>
                    <div className="builder-price-row">
                      <div className="builder-bundle-price">
                        <span className="original-bundle-price">${(selectedProduct.price + selectedProduct.matchingItem.price).toFixed(2)}</span>
                        <span className="discounted-bundle-price">${((selectedProduct.price + selectedProduct.matchingItem.price) * 0.85).toFixed(2)}</span>
                        <span className="bundle-badge">SAVE 15%</span>
                      </div>
                      <button className="btn-primary-builder bundle" onClick={() => {
                        addToCart(selectedProduct);
                        addToCart({
                          id: selectedProduct.matchingItem.id,
                          name: selectedProduct.matchingItem.name,
                          price: selectedProduct.matchingItem.price,
                          frontImg: selectedProduct.matchingItem.image
                        });
                      }}>
                        ADD COMPLETE FIT
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="empty-category-showcase">
            <h3 className="empty-title">{activeCategory} COLLECTION</h3>
            <p className="empty-desc">New drops coming soon. Stay tuned for updates.</p>
          </div>
        )}
      </section>

      {/* Campaign Section (Section 4) */}
      <section className="campaign-section">
        {/* Top Feature Grid */}
        <div className="campaign-top-row">
          <div className="campaign-feature-item">
            <span className="feature-num">01</span>
            <div className="feature-content-wrapper">
              <h3 className="feature-title">SWEATSHIRT</h3>
              <p className="feature-desc">
                SWEATSHIRT THEY'RE PARTICULARLY FAVOURED FOR STYLES, COLORS, AND DESIGNS, THEIR RELAXED AND ESPECIALLY DURING COLDER SEASONS.
              </p>
            </div>
          </div>

          <div className="campaign-feature-item">
            <span className="feature-num">02</span>
            <div className="feature-content-wrapper">
              <h3 className="feature-title">ATHLETIC</h3>
              <p className="feature-desc">
                AN "ATHLETIC HOODIE" TO A SPECIFIC TYPE OF HOODIE DESIGNED WITH FEATURES TAILORED FOR ATHLETIC ACTIVITIES AND SPORTS.
              </p>
            </div>
          </div>
        </div>

        {/* Giant Campaign Title */}
        <div className="campaign-headline-wrapper">
          <h2 className="campaign-giant-title">FULL WINTERS</h2>
        </div>

        {/* Bottom Split Grid */}
        <div className="campaign-bottom-grid">
          {/* Left Column: Coordinated Hoodie Card */}
          <div className="campaign-hoodie-card">
            <div className="campaign-card-img-wrapper">
              <img 
                src={campaignData[selectedCampaignColor].hoodieImage} 
                alt="Coordinated Campaign Hoodie" 
                className="campaign-card-img fade-in"
                key={selectedCampaignColor} 
              />
            </div>
            <span className="campaign-hover-badge">CO-ORD OUTFIT</span>
          </div>

          {/* Right Column: Interactive Coordinated Sneakers Card */}
          <div className="campaign-sneaker-card">
            <div className="campaign-card-img-wrapper-sneakers">
              <img 
                src={campaignData[selectedCampaignColor].sneakerImage} 
                alt={campaignData[selectedCampaignColor].name} 
                className="campaign-card-img-sneakers fade-in"
                key={selectedCampaignColor}
              />
            </div>
            
            {/* Creative Color Selector Switches */}
            <div className="sneaker-color-switches">
              <button 
                className={`color-switch-btn green ${selectedCampaignColor === 'green' ? 'active' : ''}`}
                onMouseEnter={() => setSelectedCampaignColor('green')}
                onClick={() => setSelectedCampaignColor('green')}
                aria-label="Select Green Sneaker"
              >
                <span className="color-indicator green-circle"></span>
                <span className="switch-text">OLIVE GREEN</span>
              </button>
              <button 
                className={`color-switch-btn red ${selectedCampaignColor === 'red' ? 'active' : ''}`}
                onMouseEnter={() => setSelectedCampaignColor('red')}
                onClick={() => setSelectedCampaignColor('red')}
                aria-label="Select Red/Burgundy Sneaker"
              >
                <span className="color-indicator red-circle"></span>
                <span className="switch-text">BURGUNDY RED</span>
              </button>
            </div>

            <div className="campaign-sneaker-info">
              <h4 className="campaign-sneaker-title">{campaignData[selectedCampaignColor].name}</h4>
              <p className="sneaker-desc">
                {campaignData[selectedCampaignColor].description}
              </p>
              <button 
                className="campaign-pill-btn" 
                onClick={() => addToCart({
                  id: campaignData[selectedCampaignColor].id,
                  name: campaignData[selectedCampaignColor].name,
                  price: campaignData[selectedCampaignColor].price,
                  frontImg: campaignData[selectedCampaignColor].sneakerImage
                })}
              >
                ADD TO CART — ${campaignData[selectedCampaignColor].price}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Newsletter & Brand Footer Cards */}
      <section className="footer-cards-section" id="footer">
        <div className="footer-cards-container">


          {/* Left Card: Newsletter */}
          <div className="footer-card newsletter-card">

            <div className="footer-card-content">
              <h2 className="newsletter-giant-title">
                SUBSCRIBE TO OUR<br />
                NEWSLETTER
              </h2>
              <div className="newsletter-input-wrapper">
                <input type="email" placeholder="ENTER YOUR MAIL" className="newsletter-card-input" required />
                <button className="newsletter-card-submit" aria-label="Submit Mail">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            <div className="footer-card-img-container">
              <img src={artboard53_5} alt="Pulp Fiction Green Hoodie" className="footer-card-img" />
            </div>
          </div>

          {/* Right Card: Brand Footer */}
          <div className="footer-card brand-footer-card">
            {/* Top Row */}
            <div className="brand-footer-top">
              <span className="brand-footer-copyright-top">© HOODIE. ALL RIGHTS RESERVED</span>
              <span className="footer-designer">DESIGN BY SAHIL DOBARIYA</span>
            </div>

            {/* Giant Background Word */}
            <div className="footer-giant-bg-text">
              <span>HOODIE</span>
            </div>

            {/* Overlay Navigation Links */}
            <div className="footer-pills-bar">
              <a href="#shop" className="footer-pill-link">MEN</a>
              <a href="#shop" className="footer-pill-link">WOMEN</a>
              <a href="#shop" className="footer-pill-link">CHILDREN</a>
              <a href="#shop" className="footer-pill-link active">POPULAR</a>
            </div>

            {/* Bottom Row */}
            <div className="brand-footer-bottom">
              <div className="brand-footer-inquiries">
                <p>PROVIDE AN EMAIL ADDRESS WHERE CUSTOMERS CAN SEND THEIR INQUIRIES.</p>
              </div>
              
              <div className="brand-footer-center-img-wrapper">
                <div className="brand-footer-img-inner">
                  <img src={artboard60_5} alt="Influence Grey Hoodie" className="footer-brand-img" />
                </div>
              </div>

              <a href="#shop" className="footer-new-collection-link-bottom">
                NEW COLLECTION <span>↗</span>
              </a>
            </div>
          </div>


        </div>
      </section>

      {/* Cart Overlay and Sidebar */}
      <div className={`cart-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}></div>
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>SHOPPING CART</h2>
          <button className="close-cart-btn" onClick={() => setIsCartOpen(false)} aria-label="Close Cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <p>Your cart is empty</p>
            <button className="btn-primary" onClick={() => setIsCartOpen(false)}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-img-wrapper">
                    <img src={item.frontImg} alt={item.name} />
                  </div>
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <span className="cart-item-price">${item.price.toFixed(2)}</span>
                    <div className="cart-item-quantity">
                      <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity">+</button>
                    </div>
                  </div>
                  <button className="remove-item-btn" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-subtotal">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <p className="cart-tax-shipping">Shipping & taxes calculated at checkout</p>
              <button className="checkout-btn" onClick={() => alert('Proceeding to checkout!')}>
                PROCEED TO CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
