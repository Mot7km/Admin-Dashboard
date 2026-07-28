import { useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import {
  Utensils,
  Plus,
  Search,
  Tag,
  Eye,
  EyeOff,
  Sliders,
  Image as ImageIcon,
  QrCode,
  Star,
  Download,
  Share2,
  Trash2,
  Edit,
  X,
  Layers,
} from 'lucide-react';

const MenuPage = () => {
  const { t, locale } = useTranslation();
  const [activeTab, setActiveTab] = useState<'items' | 'sliders' | 'qr' | 'reviews'>('items');

  // Modals state
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddSliderItemModal, setShowAddSliderItemModal] = useState(false);

  // Form State Demo
  const [newCatName, setNewCatName] = useState('');
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');

  // Sample Categories State
  const [categories, setCategories] = useState([
    { id: 'cat-1', name: locale === 'ar' ? 'البرجر والساندوتشات' : 'Burgers & Wraps', count: 18 },
    { id: 'cat-2', name: locale === 'ar' ? 'المشروبات الباردة والقهوة' : 'Cold Beverages & Coffee', count: 24 },
    { id: 'cat-3', name: locale === 'ar' ? 'البيتزا النابولية' : 'Neapolitan Pizza', count: 12 },
    { id: 'cat-4', name: locale === 'ar' ? 'الحلويات والبان كيك' : 'Desserts & Sweets', count: 15 },
  ]);

  // Sample Products State
  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      name: locale === 'ar' ? 'برجر الترافل المدخن' : 'Smoked Truffle Burger',
      category: locale === 'ar' ? 'البرجر والساندوتشات' : 'Burgers & Wraps',
      price: '$14.50',
      status: 'Active',
      badge: 'Bestseller',
      views: '4,820',
    },
    {
      id: 'prod-2',
      name: locale === 'ar' ? 'سبانيش لاتيه بارد' : 'Spanish Iced Latte',
      category: locale === 'ar' ? 'المشروبات الباردة والقهوة' : 'Cold Beverages & Coffee',
      price: '$6.50',
      status: 'Sold Out',
      badge: 'Popular',
      views: '3,950',
    },
    {
      id: 'prod-3',
      name: locale === 'ar' ? 'بيتزا مارجريتا نابولي' : 'Neapolitan Margherita',
      category: locale === 'ar' ? 'البيتزا النابولية' : 'Neapolitan Pizza',
      price: '$18.00',
      status: 'Active',
      badge: 'New',
      views: '3,120',
    },
  ]);

  // Sample Sliders & Banner Items State
  const [sliders, setSliders] = useState([
    {
      id: 'slide-1',
      title: locale === 'ar' ? 'عرض نهاية الأسبوع: خصم ٢٠٪ على البرجر' : 'Weekend Deal: 20% Off All Truffle Burgers',
      subtitle: locale === 'ar' ? 'اطلب الآن مع بطاطس مجانية' : 'Valid until Sunday midnight',
      target: 'Smoked Truffle Burger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      status: 'Active',
    },
    {
      id: 'slide-2',
      title: locale === 'ar' ? 'تشكيلة القهوة المقطرة الباردة الجديدة' : 'New Summer Cold Brew Selection',
      subtitle: locale === 'ar' ? 'من حبوب الأราบيكا الفاخرة' : '100% Premium Arabica Beans',
      target: 'Spanish Iced Latte',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
      status: 'Active',
    },
  ]);

  // Handlers
  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([
      ...categories,
      { id: `cat-${Date.now()}`, name: newCatName, count: 0 },
    ]);
    setNewCatName('');
    setShowAddCategoryModal(false);
  };

  const handleAddProduct = () => {
    if (!newProdName.trim() || !newProdPrice.trim()) return;
    setProducts([
      ...products,
      {
        id: `prod-${Date.now()}`,
        name: newProdName,
        category: categories[0]?.name || 'General',
        price: newProdPrice.startsWith('$') ? newProdPrice : `$${newProdPrice}`,
        status: 'Active',
        badge: 'New',
        views: '0',
      },
    ]);
    setNewProdName('');
    setNewProdPrice('');
    setShowAddProductModal(false);
  };

  const handleAddSliderItem = () => {
    if (!newSlideTitle.trim()) return;
    setSliders([
      ...sliders,
      {
        id: `slide-${Date.now()}`,
        title: newSlideTitle,
        subtitle: newSlideSubtitle || 'Special Promotional Offer',
        target: 'Featured Item',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
        status: 'Active',
      },
    ]);
    setNewSlideTitle('');
    setNewSlideSubtitle('');
    setShowAddSliderItemModal(false);
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
            {t('menu.title')}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('menu.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Sub-Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => setActiveTab('items')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'items'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Utensils className="h-4 w-4" />
          <span>{t('menu.tabs.categoriesAndProducts')}</span>
        </button>

        <button
          onClick={() => setActiveTab('sliders')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'sliders'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Sliders className="h-4 w-4" />
          <span>{t('menu.tabs.slidersAndBanners')}</span>
        </button>

        <button
          onClick={() => setActiveTab('qr')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'qr'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <QrCode className="h-4 w-4" />
          <span>{t('menu.tabs.qrControl')}</span>
        </button>

        <button
          onClick={() => setActiveTab('reviews')}
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
            activeTab === 'reviews'
              ? 'bg-[var(--primary)] text-white shadow-md'
              : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
          }`}
        >
          <Star className="h-4 w-4" />
          <span>{t('menu.tabs.reviews')}</span>
        </button>
      </div>

      {/* TAB 1: Categories & Products */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          {/* Categories Bar & Add Category */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[var(--primary)]" />
                <h2 className="text-base font-bold text-[var(--text-primary)]">{t('menu.categories.title')}</h2>
              </div>
              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-bold text-[var(--primary)] hover:bg-[var(--elevated)] transition"
              >
                <Plus className="h-4 w-4" />
                <span>{t('menu.categories.add')}</span>
              </button>
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-1 hide-scrollbar">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-2 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-3.5 py-2 text-xs font-semibold text-[var(--text-primary)]"
                >
                  <span>{cat.name}</span>
                  <span className="rounded-md bg-[var(--elevated)] px-1.5 py-0.5 text-[10px] text-[var(--text-muted)]">
                    {cat.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Products Header & Add Product */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-base font-bold text-[var(--text-primary)]">{t('menu.products.title')}</h2>
              <button
                onClick={() => setShowAddProductModal(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[var(--primary-dark)] transition"
              >
                <Plus className="h-4 w-4" />
                <span>{t('menu.products.add')}</span>
              </button>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Search dishes, drinks, ingredients..."
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] py-2 pl-9 pr-4 text-xs font-medium text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
                  <tr>
                    <th className="p-3">{t('menu.products.name')}</th>
                    <th className="p-3">{t('menu.products.category')}</th>
                    <th className="p-3">{t('menu.products.price')}</th>
                    <th className="p-3">{t('menu.products.badge')}</th>
                    <th className="p-3">{t('menu.products.status')}</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {products.map((item) => (
                    <tr key={item.id} className="hover:bg-[var(--elevated)]/40 transition">
                      <td className="p-3 font-bold text-[var(--text-primary)]">{item.name}</td>
                      <td className="p-3 text-[var(--text-secondary)]">{item.category}</td>
                      <td className="p-3 font-semibold text-[var(--primary)]">{item.price}</td>
                      <td className="p-3">
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/10 px-2 py-0.5 text-[11px] font-semibold text-amber-500">
                          <Tag className="h-3 w-3" />
                          {item.badge}
                        </span>
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-semibold ${
                            item.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-500 ring-1 ring-emerald-500/20'
                              : 'bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--text-primary)]">
                          {item.status === 'Active' ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Sliders & Promotional Banners */}
      {activeTab === 'sliders' && (
        <div className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-lg">
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)]">{t('menu.sliders.title')}</h2>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                Manage promotional banners, offers, and featured sliders displayed at the top of customer QR menu.
              </p>
            </div>
            <button
              onClick={() => setShowAddSliderItemModal(true)}
              className="flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[var(--primary-dark)] transition"
            >
              <Plus className="h-4 w-4" />
              <span>{t('menu.sliders.addItem')}</span>
            </button>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sliders.map((slide) => (
              <div key={slide.id} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--card)] shadow-lg group">
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                    <span className="rounded-md bg-[var(--primary)] px-2 py-0.5 text-[10px] font-bold text-white w-max mb-1">
                      {slide.status}
                    </span>
                    <h3 className="font-bold text-white text-sm leading-snug">{slide.title}</h3>
                    <p className="text-xs text-slate-300">{slide.subtitle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3.5 text-xs">
                  <span className="text-[var(--text-muted)]">Target: <strong className="text-[var(--text-primary)]">{slide.target}</strong></span>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--primary)]">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-rose-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: QR Code & Branding */}
      {activeTab === 'qr' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-8 text-center shadow-lg space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-inner ring-1 ring-black/5">
              <div className="h-48 w-48 flex items-center justify-center bg-slate-900 rounded-xl p-4 text-white">
                <QrCode className="h-36 w-36 text-white" />
              </div>
            </div>
            <div>
              <h3 className="font-bold text-base text-[var(--text-primary)]">Mot7km Smart QR Menu</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">/m/mot7km-restaurant/main-branch</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[var(--primary-dark)] transition">
                <Download className="h-4 w-4" /> Download SVG / PNG
              </button>
              <button className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition">
                <Share2 className="h-4 w-4" /> Share Link
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-5">
            <h2 className="text-base font-bold text-[var(--text-primary)]">Restaurant Branding Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Primary Theme Color</label>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#1683C7] ring-2 ring-white cursor-pointer" />
                  <div className="h-8 w-8 rounded-full bg-[#0F766E] cursor-pointer" />
                  <div className="h-8 w-8 rounded-full bg-[#E11D48] cursor-pointer" />
                  <div className="h-8 w-8 rounded-full bg-[#D97706] cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">Restaurant Logo</label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3">
                  <ImageIcon className="h-5 w-5 text-[var(--text-muted)]" />
                  <span className="text-xs text-[var(--text-muted)]">Mot7km_Logo.png</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: Reviews & Ratings */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
              <span className="text-xs text-[var(--text-muted)]">Average Product Rating</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[var(--text-primary)]">4.9</span>
                <span className="text-amber-500 font-semibold text-sm">★★★★★</span>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
              <span className="text-xs text-[var(--text-muted)]">Total Feedback Submitted</span>
              <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">328</div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
              <span className="text-xs text-[var(--text-muted)]">Pending Moderation</span>
              <div className="mt-2 text-3xl font-bold text-emerald-500">0</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 1: Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('menu.categories.add')}</h3>
              <button onClick={() => setShowAddCategoryModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>
              <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.categories.name')}</label>
              <input
                type="text"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Appetizers, Seafood, Hot Drinks..."
                className="mt-1.5 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAddCategoryModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                Cancel
              </button>
              <button onClick={handleAddCategory} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('menu.products.add')}</h3>
              <button onClick={() => setShowAddProductModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.products.name')}</label>
                <input
                  type="text"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  placeholder="e.g. Club Sandwich, Double Espresso..."
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.products.price')}</label>
                <input
                  type="text"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  placeholder="e.g. 12.50"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAddProductModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                Cancel
              </button>
              <button onClick={handleAddProduct} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                Save Dish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Add Slider / Banner Item Modal */}
      {showAddSliderItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('menu.sliders.addItem')}</h3>
              <button onClick={() => setShowAddSliderItemModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.sliders.slideTitle')}</label>
                <input
                  type="text"
                  value={newSlideTitle}
                  onChange={(e) => setNewSlideTitle(e.target.value)}
                  placeholder="e.g. Summer Offer: Free Drink with Burger"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.sliders.slideSubtitle')}</label>
                <input
                  type="text"
                  value={newSlideSubtitle}
                  onChange={(e) => setNewSlideSubtitle(e.target.value)}
                  placeholder="e.g. Available daily from 2 PM to 6 PM"
                  className="mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2.5 text-xs font-medium text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setShowAddSliderItemModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                Cancel
              </button>
              <button onClick={handleAddSliderItem} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                Save Banner Slide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuPage;
