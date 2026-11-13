
import React, { useState } from "react";
import "./App.css";

const phone = "923281632240";

const products = [
  {
    id: 1,
    name: "Premium Black T-Shirt",
    price: 1800,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
    description: "A stylish premium cotton T-shirt with a comfortable fit, perfect for everyday fashion."
  },
  {
    id: 2,
    name: "Classic Sneakers",
    price: 4500,
    category: "Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
    description: "Modern and comfortable sneakers designed for everyday use and stylish looks."
  },
  {
    id: 3,
    name: "Luxury Watch",
    price: 6500,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=700&q=85",
    description: "An elegant watch that adds a premium touch to your everyday style."
  },
  {
    id: 4,
    name: "Premium Hoodie",
    price: 3200,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
    description: "A comfortable and fashionable hoodie for a relaxed modern look."
  },
  {
    id: 5,
    name: "Leather Backpack",
    price: 3800,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=85",
    description: "A practical backpack with a fashionable design for everyday essentials."
  },
  {
    id: 6,
    name: "Fashion Sunglasses",
    price: 1500,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
    description: "Complete your look with these fashionable sunglasses."
  },
  {
    id: 7,
    name: "Luxury Handbag",
    price: 5200,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
    description: "A beautiful handbag designed to complement your personal style."
  },
  {
    id: 8,
    name: "White Fashion Shirt",
    price: 2200,
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=85",
    description: "A clean and classic shirt suitable for casual and smart outfits."
  }
];

function App() {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQuantity, setDetailQuantity] = useState(1);

  const formatPrice = (price) =>
    "Rs. " + price.toLocaleString("en-PK");

  const openProduct = (product) => {
    setSelectedProduct(product);
    setDetailQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToProducts = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (product, quantity = 1) => {
    setCart((old) => {
      const found = old.find((item) => item.id === product.id);

      if (found) {
        return old.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...old, { ...product, quantity }];
    });
  };

  const removeItem = (id) => {
    setCart((old) => old.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, amount) => {
    setCart((old) =>
      old
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const count = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || item.category === category)
  );

  const orderProduct = (product, quantity = 1) => {
    const message =
      `Hello Zarran Store!\nProduct: ${product.name}\nQuantity: ${quantity}\nTotal: ${formatPrice(product.price * quantity)}\nPlease confirm my order.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const checkout = () => {
    const details = cart.map(
      (item) =>
        `${item.name} x ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    ).join("\n");

    const message =
      `Hello Zarran Store!\nMy order:\n${details}\n\nTotal: ${formatPrice(total)}\nPlease confirm my order.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="app">

      {/* TOP BAR */}
      <div className="topbar">
        <p>Welcome to Zarran Store | Premium Shopping</p>
        <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">
          WhatsApp: 03281632240
        </a>
      </div>

      {/* NAVBAR */}
      <header className="navbar">
        <a href="#home" className="logo" onClick={backToProducts}>
          ZARRAN<span>.</span>
        </a>

        <nav>
          <a href="#home" onClick={backToProducts}>Home</a>
          <a href="#products" onClick={backToProducts}>Shop</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button className="cart-button" onClick={() => setShowCart(true)}>
          🛒 Cart ({count})
        </button>
      </header>

      {/* HOME AND PRODUCT DETAILS */}
      {selectedProduct ? (

        /* PRODUCT DETAILS PAGE */

        <section className="product-detail-page">

          <button className="back-button" onClick={backToProducts}>
            ← Back to Products
          </button>

          <div className="detail-container">

            <div className="detail-image">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
            </div>

            <div className="detail-info">
              <span className="gold-label">
                {selectedProduct.category}
              </span>

              <h1>{selectedProduct.name}</h1>

              <div className="detail-rating">
                ⭐⭐⭐⭐⭐ <span>Premium Collection</span>
              </div>

              <h2>{formatPrice(selectedProduct.price)}</h2>

              <p className="detail-description">
                {selectedProduct.description}
              </p>

              <div className="detail-features">
                <p>✓ Premium product collection</p>
                <p>✓ Stylish modern design</p>
                <p>✓ Easy WhatsApp ordering</p>
                <p>✓ Customer support available</p>
              </div>

              <div className="detail-quantity">
                <span>Quantity:</span>

                <button onClick={() =>
                  setDetailQuantity((q) => Math.max(1, q - 1))
                }>
                  -
                </button>

                <strong>{detailQuantity}</strong>

                <button onClick={() =>
                  setDetailQuantity((q) => q + 1)
                }>
                  +
                </button>
              </div>

              <h3 className="detail-total">
                Total: {formatPrice(selectedProduct.price * detailQuantity)}
              </h3>

              <button
                className="detail-add-button"
                onClick={() => {
                  addToCart(selectedProduct, detailQuantity);
                  setShowCart(true);
                }}
              >
                Add to Cart 🛒
              </button>

              <button
                className="detail-whatsapp-button"
                onClick={() => orderProduct(selectedProduct, detailQuantity)}
              >
                Order Now on WhatsApp
              </button>
            </div>
          </div>
        </section>

      ) : (

        /* NORMAL HOME PAGE */

        <>
          <section className="hero" id="home">
            <div className="hero-content">
              <span className="gold-label">THE ZARRAN COLLECTION</span>

              <h1>
                Elevate Your
                <span> Everyday Style.</span>
              </h1>

              <p>
                Discover premium fashion, beautiful accessories
                and stylish products at Zarran Store.
              </p>

              <a href="#products" className="shop-button">
                EXPLORE COLLECTION →
              </a>
            </div>
          </section>

          <section className="features">
            <div><span>🚚</span><h3>Easy Ordering</h3><p>Order on WhatsApp</p></div>
            <div><span>✨</span><h3>Premium Style</h3><p>Stylish collection</p></div>
            <div><span>💬</span><h3>Direct Support</h3><p>Talk to our team</p></div>
            <div><span>📍</span><h3>Our Location</h3><p>Shad Bagh, Lahore</p></div>
          </section>

          <section className="products-section" id="products">
            <div className="section-heading">
              <span className="gold-label">OUR COLLECTION</span>
              <h2>Shop Our Products</h2>
              <p>Click any product to explore its details.</p>
            </div>

            <input
              className="search-input"
              placeholder="Search your favourite products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="categories">
              {["All", "Clothing", "Shoes", "Accessories", "Bags"].map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                  onClick={() => openProduct(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") openProduct(product);
                  }}
                >
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="product-info">
                    <span className="product-category">
                      {product.category}
                    </span>

                    <h3>{product.name}</h3>
                    <h4>{formatPrice(product.price)}</h4>

                    <button
                      className="add-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart +
                    </button>

                    <button
                      className="whatsapp-order"
                      onClick={(e) => {
                        e.stopPropagation();
                        orderProduct(product);
                      }}
                    >
                      Order on WhatsApp
                    </button>

                    <button
                      className="view-details-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openProduct(product);
                      }}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <p className="no-products">No products found.</p>
            )}
          </section>
        </>
      )}

      {/* ABOUT */}
      <section className="about-section" id="about">
        <span className="gold-label">OUR STORY</span>
        <h2>Welcome to Zarran Store</h2>
        <p>
          We bring you a stylish collection of fashion,
          accessories and lifestyle products. Our aim is to
          make shopping easy and enjoyable.
        </p>
      </section>

      {/* CONTACT */}
      <section className="contact-section" id="contact">
        <span className="gold-label">GET IN TOUCH</span>
        <h2>Contact Zarran Store</h2>

        <div className="contact-grid">
          <a className="contact-card" href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">
            <span>💬</span>
            <h3>WhatsApp Us</h3>
            <p>03281632240</p>
            <strong>Send a Message →</strong>
          </a>

          <a className="contact-card" href="https://www.google.com/maps/search/?api=1&query=Shad+Bagh+Lahore+Pakistan" target="_blank" rel="noreferrer">
            <span>📍</span>
            <h3>Our Location</h3>
            <p>Shad Bagh, Lahore, Pakistan</p>
            <strong>Find Us →</strong>
          </a>

          <a className="contact-card" href={`tel:+${phone}`}>
            <span>📞</span>
            <h3>Call Us</h3>
            <p>03281632240</p>
            <strong>Call Now →</strong>
          </a>
        </div>
      </section>

      {/* CART */}
      {showCart && (
        <div className="cart-overlay" onClick={() => setShowCart(false)}>
          <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button onClick={() => setShowCart(false)}>✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="empty-cart">Your shopping cart is empty.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div>
                      <h4>{item.name}</h4>
                      <p>{formatPrice(item.price)}</p>
                    </div>

                    <div className="quantity">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>

                    <button className="remove-button" onClick={() => removeItem(item.id)}>
                      Remove
                    </button>
                  </div>
                ))}

                <div className="cart-total">
                  <h3>Total</h3>
                  <h3>{formatPrice(total)}</h3>
                </div>

                <button className="checkout-button" onClick={checkout}>
                  Order on WhatsApp →
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <h2>ZARRAN<span>.</span></h2>
        <p>Style • Quality • Confidence</p>
        <p>Shad Bagh, Lahore, Pakistan</p>
        <a href={`https://wa.me/${phone}`} target="_blank" rel="noreferrer">
          WhatsApp: 03281632240
        </a>
        <p className="copyright">© 2026 Zarran Store. All Rights Reserved.</p>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        className="floating-whatsapp"
        href={`https://wa.me/${phone}?text=${encodeURIComponent("Hello Zarran Store! I want to know more about your products.")}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
      >
        ☎ <span>WhatsApp</span>
      </a>

    </div>
  );
}

export default App;
