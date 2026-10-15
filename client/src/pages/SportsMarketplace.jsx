import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  ShoppingCart,
  ShieldCheck,
  Award,
  CheckCircle2,
  Truck,
  Package,
  Layers,
  Store,
  Tag,
  Sparkles,
  Plus,
  Minus,
  Trash2,
  Search,
  Filter,
  Lock,
  RotateCcw,
  Clock,
  MapPin,
  Check,
  X,
  MessageCircle,
  TrendingUp,
  CreditCard,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'
import Screen from '../components/Screen'

export default function SportsMarketplace() {
  const navigate = useNavigate()

  // Main active tab
  // 'store' (Factory Outlet & Brands) | 'jersey' (Custom Jersey Maker) | 'used' (Pre-Owned OLX) | 'bulk' (Academy Squads) | 'tracking' (Order Status) | 'seller' (Seller & Trust Hub)
  const [activeTab, setActiveTab] = useState('store')
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMsg, setToastMsg] = useState('')
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Toast feedback
  const triggerToast = (msg) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  // --- CATALOG DATA ---
  const [products] = useState([
    {
      id: 'pro-bat-1',
      name: 'SS Master Pro Grade 1 English Willow',
      category: 'bats',
      price: 4999,
      mrp: 8999,
      discount: '44% OFF',
      brand: 'SS Sunridges',
      seller: 'Meerut Factory Outlet',
      rating: 4.8,
      verified: true,
      imageEmoji: '🏏',
      tag: 'Factory Outlet',
      stock: 148,
    },
    {
      id: 'team-jersey-1',
      name: 'SH Heroes Pro Team Jersey (Sublimation)',
      category: 'jerseys',
      price: 899,
      mrp: 1499,
      discount: '40% OFF',
      brand: 'SH Apparel Direct',
      seller: 'Tirupur Textile Hub',
      rating: 4.9,
      verified: true,
      imageEmoji: '👕',
      tag: 'Customizable',
      stock: 286,
    },
    {
      id: 'match-ball-1',
      name: 'Kookaburra Turf Match Ball (4-Piece)',
      category: 'balls',
      price: 1299,
      mrp: 1999,
      discount: '35% OFF',
      brand: 'Kookaburra Direct',
      seller: 'Jalandhar Sports Direct',
      rating: 4.7,
      verified: true,
      imageEmoji: '🔴',
      tag: 'BCCI Approved',
      stock: 540,
    },
    {
      id: 'helmet-1',
      name: 'Masuri Titanium Pro Safety Helmet',
      category: 'protective',
      price: 2499,
      mrp: 3999,
      discount: '37% OFF',
      brand: 'Masuri Pro',
      seller: 'Certified Safety Gear',
      rating: 4.9,
      verified: true,
      imageEmoji: '🪖',
      tag: 'Safety Certified',
      stock: 64,
    },
    {
      id: 'gloves-1',
      name: 'SG Club Leather Batting Gloves',
      category: 'protective',
      price: 1199,
      mrp: 1799,
      discount: '33% OFF',
      brand: 'SG Cricket',
      seller: 'Local Sports Hub (1.4 km)',
      rating: 4.8,
      verified: true,
      imageEmoji: '🧤',
      tag: 'Local Store • 2h Pickup',
      stock: 72,
    },
    {
      id: 'pads-1',
      name: 'SS Superlite Moulded Batting Pads',
      category: 'protective',
      price: 1899,
      mrp: 2999,
      discount: '36% OFF',
      brand: 'SS Master',
      seller: 'Meerut Factory Outlet',
      rating: 4.8,
      verified: true,
      imageEmoji: '🛡️',
      tag: 'Factory Outlet',
      stock: 92,
    },
  ])

  // --- USED / PRE-OWNED (OLX STYLE) DATA ---
  const [usedProducts] = useState([
    {
      id: 'used-bat-1',
      name: 'Kookaburra Kahuna Bat (Match Knocked)',
      price: 2199,
      originalMrp: 6500,
      condition: 'Like New • Knocked in Nets',
      seller: 'Arjun R. (Coastal Kings Club)',
      verifiedSeller: true,
      location: 'Chennai Central',
      imageEmoji: '🏏',
      usage: '1 Season Used',
    },
    {
      id: 'used-kitbag-1',
      name: 'SS Premium Wheelie Kit Bag (Full Size)',
      price: 1450,
      originalMrp: 3400,
      condition: 'Gently Used • All Zippers Good',
      seller: 'Karan S. (City Academy)',
      verifiedSeller: true,
      location: 'Adyar, Chennai',
      imageEmoji: '🎒',
      usage: '6 Months Used',
    },
    {
      id: 'used-pads-1',
      name: 'SG Test Edition Leg Guards (Right Hand)',
      price: 999,
      originalMrp: 2600,
      condition: 'Match Ready • Clean Straps',
      seller: 'Vikram P. (Scoring XI)',
      verifiedSeller: true,
      location: 'Anna Nagar',
      imageEmoji: '🛡️',
      usage: 'Match Tested',
    },
  ])

  // --- CUSTOM JERSEY DESIGNER STATE ---
  const [playerName, setPlayerName] = useState('ROHIT')
  const [jerseyNumber, setJerseyNumber] = useState('15')
  const [teamName, setTeamName] = useState('SH HEROES')
  const [jerseyColor, setJerseyColor] = useState('blue')
  const [jerseySize, setJerseySize] = useState('L')

  const colorPalettes = [
    { id: 'blue', name: 'Royal Blue', primary: '#1d6dff', secondary: '#3de0ff', bg: '#0b1f54' },
    { id: 'red', name: 'Crimson Red', primary: '#e10613', secondary: '#ff6b77', bg: '#450a0f' },
    { id: 'gold', name: 'Championship Gold', primary: '#f59e0b', secondary: '#fde047', bg: '#452b05' },
    { id: 'green', name: 'Emerald Green', primary: '#10b981', secondary: '#6ee7b7', bg: '#064e3b' },
    { id: 'black', name: 'Stealth Black', primary: '#1e293b', secondary: '#94a3b8', bg: '#0f172a' },
  ]
  const currentColor = colorPalettes.find((c) => c.id === jerseyColor) || colorPalettes[0]

  // --- BULK SQUAD STATE ---
  const [squadSize, setSquadSize] = useState(18)
  const bulkUnitPrice = 900
  const bulkDiscount = 20

  // --- CART STATE ---
  const [cart, setCart] = useState([
    {
      id: 'pro-bat-1',
      name: 'SS Master Pro Grade 1 English Willow',
      price: 4999,
      qty: 1,
      imageEmoji: '🏏',
    },
    {
      id: 'custom-jersey-sample',
      name: 'Custom Team Jersey (ROHIT #15)',
      price: 899,
      qty: 1,
      imageEmoji: '👕',
    },
  ])

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const cartGst = Math.round(cartSubtotal * 0.12)
  const cartDelivery = cartSubtotal > 1500 ? 0 : 99
  const cartGrandTotal = cartSubtotal + cartGst + cartDelivery

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, imageEmoji: product.imageEmoji }]
    })
    triggerToast(`Added ${product.name.split(' ')[0]} to cart!`)
  }

  const updateCartQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.qty + delta
            return newQty > 0 ? { ...item, qty: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  // --- INVENTORY MANAGEMENT STATE ---
  const [inventory, setInventory] = useState([
    { id: 'inv-1', name: 'Cricket Bat - Grade 1 Pro', stock: 148, unit: 'Units' },
    { id: 'inv-2', name: 'Team Jersey - Moisture Wick', stock: 286, unit: 'Pcs' },
    { id: 'inv-3', name: 'Leather Match Ball - 4-Piece', stock: 540, unit: 'Boxes' },
    { id: 'inv-4', name: 'Batting Gloves (Sheep Leather)', stock: 72, unit: 'Pairs' },
    { id: 'inv-5', name: 'Titanium Guard Helmets', stock: 64, unit: 'Units' },
  ])

  const modifyStock = (id, delta) => {
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stock: Math.max(0, item.stock + delta) } : item))
    )
    triggerToast('Stock updated successfully')
  }

  // --- ORDER TRACKING STATE ---
  const [activeOrderStage, setActiveOrderStage] = useState(2) // 0: Ordered, 1: Packed, 2: Shipped, 3: Delivered
  const orderStages = [
    { title: 'Ordered', desc: '14 July, 10:30 AM' },
    { title: 'Packed', desc: 'Factory Quality Passed' },
    { title: 'Shipped', desc: 'In Transit • BlueDart' },
    { title: 'Delivered', desc: 'Expected 18 July' },
  ]

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory
    const matchesQuery = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesQuery
  })

  return (
    <Screen
      back
      title="Sports Marketplace"
      right={
        <button
          className="market-cart-top-btn"
          onClick={() => setIsCartOpen(!isCartOpen)}
          aria-label="Shopping Cart"
        >
          <ShoppingCart size={20} />
          {cartCount > 0 && <span className="market-cart-top-badge">{cartCount}</span>}
        </button>
      }
    >
      <div className="native-marketplace-app">
        {/* Toast Alert */}
        {toastMsg && (
          <div className="market-floating-toast">
            <Sparkles size={14} color="#ffc83d" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="market-search-box">
          <Search size={16} color="#9aa8c7" />
          <input
            type="text"
            placeholder="Search bats, jerseys, gear, brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="market-clear-search" onClick={() => setSearchQuery('')}>
              <X size={14} />
            </button>
          )}
        </div>

        {/* Main Segmented Tabs */}
        <div className="market-nav-tabs-scroll">
          <button
            className={`market-nav-tab ${activeTab === 'store' ? 'active' : ''}`}
            onClick={() => setActiveTab('store')}
          >
            <Store size={15} />
            <span>Factory Store</span>
          </button>
          <button
            className={`market-nav-tab ${activeTab === 'jersey' ? 'active' : ''}`}
            onClick={() => setActiveTab('jersey')}
          >
            <Sparkles size={15} />
            <span>Custom Jersey</span>
          </button>
          <button
            className={`market-nav-tab ${activeTab === 'used' ? 'active' : ''}`}
            onClick={() => setActiveTab('used')}
          >
            <RotateCcw size={15} />
            <span>Pre-Owned (OLX)</span>
          </button>
          <button
            className={`market-nav-tab ${activeTab === 'bulk' ? 'active' : ''}`}
            onClick={() => setActiveTab('bulk')}
          >
            <Layers size={15} />
            <span>Bulk Squad</span>
          </button>
          <button
            className={`market-nav-tab ${activeTab === 'tracking' ? 'active' : ''}`}
            onClick={() => setActiveTab('tracking')}
          >
            <Truck size={15} />
            <span>Track Order</span>
          </button>
          <button
            className={`market-nav-tab ${activeTab === 'seller' ? 'active' : ''}`}
            onClick={() => setActiveTab('seller')}
          >
            <ShieldCheck size={15} />
            <span>Seller Hub</span>
          </button>
        </div>

        {/* ----------------- TAB 1: FACTORY STORE & BRANDS ----------------- */}
        {activeTab === 'store' && (
          <div className="market-tab-content">
            {/* Verified Manufacturer Banner */}
            <div className="market-verified-banner">
              <div className="banner-badge-icon">
                <ShieldCheck size={28} color="#3de0ff" />
              </div>
              <div className="banner-text">
                <div className="banner-title">DIRECT FACTORY SOURCING</div>
                <div className="banner-desc">
                  Verified Sports Manufacturers & Official Brand Outlets • Zero Retail Markup
                </div>
                <div className="banner-stats">
                  <span>★ 4.8 / 5 Rating</span>
                  <span>• 1,248+ Orders Completed</span>
                  <span>• 100% Genuine Certified</span>
                </div>
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="market-chips-row">
              {[
                { id: 'all', label: 'All Items' },
                { id: 'bats', label: 'English Willow Bats' },
                { id: 'jerseys', label: 'Team Jerseys' },
                { id: 'balls', label: 'Match Balls' },
                { id: 'protective', label: 'Protective Armor' },
              ].map((chip) => (
                <button
                  key={chip.id}
                  className={`market-chip-pill ${activeCategory === chip.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(chip.id)}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Product Cards Grid */}
            <div className="market-products-grid">
              {filteredProducts.map((p) => (
                <div key={p.id} className="market-product-card">
                  <div className="product-top-row">
                    <span className="product-tag-pill">{p.tag}</span>
                    <span className="product-discount-pill">{p.discount}</span>
                  </div>

                  <div className="product-emoji-icon">{p.imageEmoji}</div>

                  <div className="product-brand-name">{p.brand}</div>
                  <h4 className="product-title">{p.name}</h4>

                  <div className="product-seller-meta">
                    <MapPin size={11} color="#9aa8c7" />
                    <span>{p.seller}</span>
                  </div>

                  <div className="product-bottom-bar">
                    <div className="product-pricing">
                      <span className="product-current-price">₹{p.price.toLocaleString('en-IN')}</span>
                      <span className="product-mrp-price">₹{p.mrp.toLocaleString('en-IN')}</span>
                    </div>

                    <button
                      className="product-buy-btn"
                      onClick={() => addToCart(p)}
                      title="Add to Cart"
                    >
                      <Plus size={14} />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 2: CUSTOM JERSEY STUDIO ----------------- */}
        {activeTab === 'jersey' && (
          <div className="market-tab-content">
            <div className="jersey-studio-container">
              {/* Live Jersey Vector Graphic */}
              <div
                className="jersey-live-stage"
                style={{
                  background: `radial-gradient(circle at center, ${currentColor.bg} 0%, #07122e 80%)`,
                }}
              >
                <div className="jersey-live-graphic">
                  <svg width="180" height="160" viewBox="0 0 140 130" fill="none">
                    {/* Jersey Silhouette */}
                    <path
                      d="M40 20 L20 45 L35 55 L45 42 L45 115 L95 115 L95 42 L105 55 L120 45 L100 20 L80 32 Q70 38 60 32 Z"
                      fill={currentColor.primary}
                      stroke={currentColor.secondary}
                      strokeWidth="3"
                    />
                    {/* Collar Trim */}
                    <path d="M60 20 Q70 28 80 20" stroke="#ffffff" strokeWidth="2.5" fill="none" />
                    {/* Sleeve Stripes */}
                    <line x1="24" y1="48" x2="33" y2="42" stroke={currentColor.secondary} strokeWidth="2.5" />
                    <line x1="116" y1="48" x2="107" y2="42" stroke={currentColor.secondary} strokeWidth="2.5" />
                    {/* Team Name */}
                    <text
                      x="70"
                      y="58"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontWeight="900"
                      letterSpacing="1"
                      textAnchor="middle"
                    >
                      {teamName || 'SH HEROES'}
                    </text>
                    {/* Jersey Number */}
                    <text
                      x="70"
                      y="88"
                      fill="#ffffff"
                      fontSize="28"
                      fontWeight="900"
                      fontFamily="Outfit, sans-serif"
                      textAnchor="middle"
                    >
                      {jerseyNumber || '15'}
                    </text>
                    {/* Player Name */}
                    <text
                      x="70"
                      y="104"
                      fill={currentColor.secondary}
                      fontSize="7.5"
                      fontWeight="800"
                      letterSpacing="1.5"
                      textAnchor="middle"
                    >
                      {playerName || 'PLAYER'}
                    </text>
                  </svg>
                </div>

                <div className="jersey-preview-status">
                  <CheckCircle2 size={12} color="#10b981" />
                  <span>DIRECT SUBLIMATION PRINT • MOISTURE-WICK POLY</span>
                </div>
              </div>

              {/* Color Theme Selector */}
              <div className="jersey-control-section">
                <label className="control-label">SELECT JERSEY COLOR THEME</label>
                <div className="jersey-palette-grid">
                  {colorPalettes.map((c) => (
                    <button
                      key={c.id}
                      className={`palette-btn ${jerseyColor === c.id ? 'active' : ''}`}
                      style={{ background: c.primary }}
                      onClick={() => {
                        setJerseyColor(c.id)
                        triggerToast(`Applied ${c.name} Theme`)
                      }}
                    >
                      {jerseyColor === c.id && <Check size={14} color="#fff" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Details Form */}
              <div className="jersey-inputs-grid">
                <div className="input-group">
                  <label>Player Name on Back</label>
                  <input
                    type="text"
                    maxLength={12}
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value.toUpperCase())}
                    placeholder="ROHIT"
                  />
                </div>
                <div className="input-group">
                  <label>Jersey Number</label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={jerseyNumber}
                    onChange={(e) => setJerseyNumber(e.target.value)}
                    placeholder="15"
                  />
                </div>
              </div>

              <div className="input-group" style={{ marginTop: 10 }}>
                <label>Team / Academy Crest Name</label>
                <input
                  type="text"
                  maxLength={18}
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value.toUpperCase())}
                  placeholder="SH HEROES"
                />
              </div>

              {/* Size Selector */}
              <div className="jersey-control-section" style={{ marginTop: 12 }}>
                <label className="control-label">CHOOSE SIZE</label>
                <div className="size-selector-row">
                  {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${jerseySize === size ? 'active' : ''}`}
                      onClick={() => setJerseySize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pricing & Order Actions */}
              <div className="jersey-action-card">
                <div className="jersey-price-box">
                  <span className="jersey-main-price">₹899</span>
                  <span className="jersey-mrp-price">₹1,499</span>
                  <span className="jersey-discount-tag">40% OFF FACTORY DIRECT</span>
                </div>

                <div className="jersey-action-buttons">
                  <button
                    className="market-red-cta-btn"
                    onClick={() => {
                      addToCart({
                        id: `custom-jersey-${Date.now()}`,
                        name: `Custom Jersey (${playerName} #${jerseyNumber} - Size ${jerseySize})`,
                        price: 899,
                        imageEmoji: '👕',
                      })
                      setIsCartOpen(true)
                    }}
                  >
                    <ShoppingCart size={16} />
                    <span>ADD CUSTOM JERSEY TO CART</span>
                  </button>

                  <button
                    className="market-outline-btn"
                    onClick={() => {
                      navigate('/app/avatar')
                      triggerToast('Opening 3D Player Avatar...')
                    }}
                  >
                    <Sparkles size={15} />
                    <span>SYNC WITH 3D AVATAR</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 3: PRE-OWNED (OLX STYLE) ----------------- */}
        {activeTab === 'used' && (
          <div className="market-tab-content">
            <div className="used-info-banner">
              <RotateCcw size={20} color="#3de0ff" />
              <div>
                <div style={{ fontWeight: 800, fontSize: 13, color: '#fff' }}>
                  PLAYER-TO-PLAYER VERIFIED USED CRICKET GEAR
                </div>
                <div style={{ fontSize: 11, color: '#9aa8c7', marginTop: 2 }}>
                  Pre-knocked bats, academy kit bags & protective gear authenticated by club captains
                </div>
              </div>
            </div>

            <div className="used-products-list">
              {usedProducts.map((item) => (
                <div key={item.id} className="used-item-card">
                  <div className="used-item-top">
                    <span className="used-condition-badge">{item.condition}</span>
                    <span className="used-time-tag">{item.usage}</span>
                  </div>

                  <div className="used-item-main">
                    <div className="used-emoji">{item.imageEmoji}</div>
                    <div className="used-details">
                      <h4 className="used-title">{item.name}</h4>
                      <div className="used-seller-row">
                        <CheckCircle2 size={12} color="#10b981" />
                        <span>{item.seller}</span>
                        <span className="seller-dot">•</span>
                        <span>{item.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="used-item-bottom">
                    <div className="used-pricing">
                      <span className="used-price">₹{item.price.toLocaleString('en-IN')}</span>
                      <span className="used-mrp">₹{item.originalMrp.toLocaleString('en-IN')}</span>
                      <span className="used-save-pill">Save 60%+</span>
                    </div>

                    <div className="used-action-btns">
                      <button
                        className="used-chat-btn"
                        onClick={() => triggerToast(`Opening chat with ${item.seller.split(' ')[0]}...`)}
                      >
                        <MessageCircle size={14} />
                        <span>Chat</span>
                      </button>
                      <button
                        className="used-buy-btn"
                        onClick={() => addToCart(item)}
                      >
                        BUY NOW
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- TAB 4: BULK SQUAD & ACADEMY ORDERS ----------------- */}
        {activeTab === 'bulk' && (
          <div className="market-tab-content">
            <div className="bulk-order-container">
              <div className="bulk-header-card">
                <Layers size={24} color="#ff3b50" />
                <div>
                  <h3 style={{ margin: 0, fontSize: 16, color: '#fff' }}>ACADEMY & SQUAD BUNDLE PORTAL</h3>
                  <p style={{ margin: '3px 0 0', fontSize: 11, color: '#9aa8c7' }}>
                    Wholesale team kit manufacturing with custom player names, numbers, and sponsor crests
                  </p>
                </div>
              </div>

              {/* Squad Size Selector */}
              <div className="bulk-selector-box">
                <span className="bulk-label">SELECT SQUAD PLAYER COUNT:</span>
                <div className="bulk-stepper-control">
                  <button
                    className="bulk-step-btn"
                    onClick={() => setSquadSize((prev) => Math.max(11, prev - 1))}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="bulk-count-display">{squadSize} Players</span>
                  <button className="bulk-step-btn" onClick={() => setSquadSize((prev) => prev + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="bulk-summary-table">
                <div className="summary-row">
                  <span>Unit Price per Jersey:</span>
                  <span style={{ color: '#fff', fontWeight: 700 }}>₹{bulkUnitPrice}</span>
                </div>
                <div className="summary-row">
                  <span>Gross Total ({squadSize} Kits):</span>
                  <span style={{ textDecoration: 'line-through', color: '#9aa8c7' }}>
                    ₹{(squadSize * 1250).toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="summary-row highlight">
                  <span>20% Academy Volume Discount:</span>
                  <span style={{ color: '#10b981', fontWeight: 800 }}>- ₹{(squadSize * 350).toLocaleString('en-IN')}</span>
                </div>
                <div className="summary-row">
                  <span>Custom Names & Numbers:</span>
                  <span style={{ color: '#3de0ff', fontWeight: 700 }}>FREE (Included)</span>
                </div>
                <div className="summary-divider" />
                <div className="summary-row total">
                  <span>Total Squad Investment:</span>
                  <span className="summary-total-price">
                    ₹{(squadSize * bulkUnitPrice).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                className="market-red-cta-btn"
                style={{ marginTop: 14 }}
                onClick={() => {
                  addToCart({
                    id: `bulk-squad-${squadSize}`,
                    name: `Full Squad Bundle (${squadSize} Kits Custom Sublimation)`,
                    price: bulkUnitPrice * squadSize,
                    qty: 1,
                    imageEmoji: '📦',
                  })
                  setIsCartOpen(true)
                  triggerToast(`Added ${squadSize} Squad Kits to Cart!`)
                }}
              >
                <ShoppingCart size={16} />
                <span>CONFIRM SQUAD BUNDLE ORDER</span>
              </button>
            </div>
          </div>
        )}

        {/* ----------------- TAB 5: ORDER TRACKING ----------------- */}
        {activeTab === 'tracking' && (
          <div className="market-tab-content">
            <div className="order-tracking-card">
              <div className="order-tracking-header">
                <div>
                  <span className="order-id-badge">ACTIVE SHIPMENT #SH-2048</span>
                  <h3 style={{ margin: '6px 0 2px', fontSize: 15, color: '#fff' }}>
                    Team Squad Jerseys (18 Kits)
                  </h3>
                  <div style={{ fontSize: 11, color: '#9aa8c7' }}>Ordered on 14 July • Factory Direct</div>
                </div>
                <span className="order-status-pill in-transit">IN TRANSIT</span>
              </div>

              {/* 4-Stage Stepper */}
              <div className="order-progress-stepper">
                {orderStages.map((stage, idx) => (
                  <div
                    key={stage.title}
                    className={`stepper-point ${idx <= activeOrderStage ? 'done' : ''} ${
                      idx === activeOrderStage ? 'current' : ''
                    }`}
                    onClick={() => {
                      setActiveOrderStage(idx)
                      triggerToast(`Simulating status: ${stage.title}`)
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="stepper-dot">
                      {idx < activeOrderStage ? <Check size={10} color="#fff" /> : idx + 1}
                    </div>
                    <div className="stepper-title">{stage.title}</div>
                    <div className="stepper-desc">{stage.desc}</div>
                  </div>
                ))}
              </div>

              {/* Logistics Details */}
              <div className="logistics-details-box">
                <div className="logistics-item">
                  <Truck size={14} color="#3de0ff" />
                  <div>
                    <div className="logistics-label">COURIER PARTNER</div>
                    <div className="logistics-val">BlueDart Express (Air Cargo)</div>
                  </div>
                </div>

                <div className="logistics-item">
                  <Tag size={14} color="#ffc83d" />
                  <div>
                    <div className="logistics-label">AWB TRACKING NUMBER</div>
                    <div className="logistics-val">BD-99214-SOUTH</div>
                  </div>
                </div>

                <div className="logistics-item">
                  <Clock size={14} color="#10b981" />
                  <div>
                    <div className="logistics-label">ESTIMATED DELIVERY</div>
                    <div className="logistics-val">Tomorrow, before 6:00 PM</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 6: SELLER HUB & TRUST ----------------- */}
        {activeTab === 'seller' && (
          <div className="market-tab-content">
            {/* Identity & Trust Badge Card */}
            <div className="seller-trust-card">
              <div className="trust-top-row">
                <ShieldCheck size={28} color="#10b981" />
                <div>
                  <div style={{ fontWeight: 800, fontSize: 13, color: '#fff' }}>
                    AUTHENTICATED SELLER PORTAL
                  </div>
                  <div style={{ fontSize: 11, color: '#9aa8c7' }}>
                    Government KYC & Quality Verification ID
                  </div>
                </div>
              </div>

              <div className="seller-masked-id-box">
                <span className="masked-label">VERIFIED MERCHANT ID</span>
                <span className="masked-value">XXXX-XXXX-9012</span>
              </div>

              <div className="trust-checklist">
                <div className="trust-check-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>100% Genuine Equipment & Direct Factory Warranty</span>
                </div>
                <div className="trust-check-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>BCCI / ICC Grade Standards Compliance Approved</span>
                </div>
                <div className="trust-check-item">
                  <CheckCircle2 size={13} color="#10b981" />
                  <span>Direct Bank Escrow Payouts (Within 24h of Delivery)</span>
                </div>
              </div>
            </div>

            {/* Inventory Stock Manager */}
            <div className="seller-inventory-card">
              <div className="inventory-header">
                <div>
                  <h4 style={{ margin: 0, fontSize: 14, color: '#fff' }}>LIVE INVENTORY TELEMETRY</h4>
                  <p style={{ margin: '2px 0 0', fontSize: 11, color: '#9aa8c7' }}>
                    Real-time stock controls across factory and warehouse hubs
                  </p>
                </div>
              </div>

              <div className="inventory-list">
                {inventory.map((item) => (
                  <div key={item.id} className="inventory-row">
                    <span className="inv-name">{item.name}</span>
                    <div className="inv-controls">
                      <button
                        className="inv-btn minus"
                        onClick={() => modifyStock(item.id, -1)}
                        title="Reduce Stock"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="inv-count-pill">{item.stock} {item.unit}</span>
                      <button
                        className="inv-btn plus"
                        onClick={() => modifyStock(item.id, 1)}
                        title="Add Stock"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Revenue & Commission Analytics */}
            <div className="seller-revenue-card">
              <div className="revenue-header">
                <span style={{ fontSize: 11, color: '#9aa8c7', fontWeight: 700 }}>
                  THIS MONTH'S COMMERCE REVENUE
                </span>
                <span className="revenue-total">₹8,42,600</span>
              </div>

              <div className="commission-ratio-bar">
                <div className="bar-part vendor" style={{ width: '93%' }} title="Vendor Payout 93%" />
                <div className="bar-part platform" style={{ width: '5%' }} title="Platform 5%" />
                <div className="bar-part gateway" style={{ width: '2%' }} title="Gateway 2%" />
              </div>

              <div className="commission-legend-row">
                <span className="leg-item"><span className="dot green" /> 93% Seller Payout</span>
                <span className="leg-item"><span className="dot blue" /> 5% Platform</span>
                <span className="leg-item"><span className="dot red" /> 2% Payment Gateway</span>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- CART BOTTOM SHEET / DRAWER ----------------- */}
        {isCartOpen && (
          <div className="market-cart-modal-overlay" onClick={() => setIsCartOpen(false)}>
            <div className="market-cart-sheet" onClick={(e) => e.stopPropagation()}>
              <div className="cart-sheet-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <ShoppingCart size={18} color="#ff3b50" />
                  <h3 style={{ margin: 0, fontSize: 16, color: '#fff' }}>Shopping Cart ({cartCount})</h3>
                </div>
                <button className="cart-close-btn" onClick={() => setIsCartOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="cart-empty-state">
                  <ShoppingBag size={42} color="#9aa8c7" />
                  <p>Your cart is empty</p>
                  <button className="market-red-cta-btn" onClick={() => setIsCartOpen(false)}>
                    START SHOPPING
                  </button>
                </div>
              ) : (
                <>
                  <div className="cart-items-scroll">
                    {cart.map((item) => (
                      <div key={item.id} className="cart-item-row">
                        <span className="cart-item-emoji">{item.imageEmoji || '📦'}</span>
                        <div className="cart-item-info">
                          <div className="cart-item-name">{item.name}</div>
                          <div className="cart-item-price">
                            ₹{item.price.toLocaleString('en-IN')} × {item.qty} ={' '}
                            <strong>₹{(item.price * item.qty).toLocaleString('en-IN')}</strong>
                          </div>
                        </div>

                        <div className="cart-item-stepper">
                          <button
                            className="cart-step-btn"
                            onClick={() => updateCartQty(item.id, -1)}
                          >
                            <Minus size={12} />
                          </button>
                          <span className="cart-qty-val">{item.qty}</span>
                          <button
                            className="cart-step-btn"
                            onClick={() => updateCartQty(item.id, 1)}
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Bill Details */}
                  <div className="cart-bill-details">
                    <div className="bill-row">
                      <span>Subtotal:</span>
                      <span>₹{cartSubtotal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="bill-row">
                      <span>GST (12%):</span>
                      <span>₹{cartGst.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="bill-row">
                      <span>Delivery:</span>
                      <span>{cartDelivery === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `₹${cartDelivery}`}</span>
                    </div>
                    <div className="bill-divider" />
                    <div className="bill-row grand-total">
                      <span>Grand Total:</span>
                      <span className="bill-grand-price">₹{cartGrandTotal.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  <button
                    className="market-red-cta-btn"
                    onClick={() => {
                      setIsCartOpen(false)
                      setActiveTab('tracking')
                      triggerToast('Order #SH-2048 Placed Successfully!')
                    }}
                  >
                    <span>1-CLICK SECURE CHECKOUT</span>
                    <CreditCard size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </Screen>
  )
}
