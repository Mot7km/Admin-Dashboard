import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '../context/LanguageContext';
import { useToast } from '../components/common/Toast';
import EmptyState from '../components/common/EmptyState';
import ConfirmDialog from '../components/common/ConfirmDialog';
import {
  Utensils,
  Plus,
  Search,
  Tag,
  Eye,
  EyeOff,
  Sliders,
  QrCode,
  Star,
  Download,
  Share2,
  Trash2,
  Edit,
  X,
  Layers,
  LayoutGrid,
  List,
  Zap,
  Smartphone,
  Check,
  Settings2,
} from 'lucide-react';

const MenuPage = () => {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryTab = searchParams.get('tab');
  const validTabs = ['items', 'sliders', 'qr', 'reviews', 'simulator'];
  const initialTab = (queryTab && validTabs.includes(queryTab) ? queryTab : 'items') as 'items' | 'sliders' | 'qr' | 'reviews' | 'simulator';

  const [activeTab, setActiveTab] = useState<'items' | 'sliders' | 'qr' | 'reviews' | 'simulator'>(initialTab);

  useEffect(() => {
    if (queryTab && validTabs.includes(queryTab) && queryTab !== activeTab) {
      setActiveTab(queryTab as any);
    }
  }, [queryTab]);

  const handleTabChange = (tab: 'items' | 'sliders' | 'qr' | 'reviews' | 'simulator') => {
    setActiveTab(tab);
    setSearchParams({ tab }, { replace: true });
  };
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [isPeakHourMode, setIsPeakHourMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddSliderItemModal, setShowAddSliderItemModal] = useState(false);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [selectedDishForVariant, setSelectedDishForVariant] = useState<any>(null);

  // Confirm delete state
  const [deleteItem, setDeleteItem] = useState<{ id: string; type: 'product' | 'slider'; name: string } | null>(null);

  // Editable Variant Form State
  const [newVariantInput, setNewVariantInput] = useState('');
  const [newExtraInput, setNewExtraInput] = useState('');

  // Simulator Language Toggle State
  const [simulatorLang, setSimulatorLang] = useState<'ar' | 'en'>('ar');

  // Form State Demo
  const [newCatName, setNewCatName] = useState('');
  const [newProdName, setNewProdName] = useState('');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');

  // Sample Categories State with Out-of-Stock Status
  const [categories, setCategories] = useState([
    { id: 'cat-1', nameKey: 'menu.categoriesList.burgers', count: 18, isSoldOut: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&auto=format&fit=crop&q=80' },
    { id: 'cat-2', nameKey: 'menu.categoriesList.beverages', count: 24, isSoldOut: false, image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&auto=format&fit=crop&q=80' },
    { id: 'cat-3', nameKey: 'menu.categoriesList.pizza', count: 12, isSoldOut: false, image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&auto=format&fit=crop&q=80' },
    { id: 'cat-4', nameKey: 'menu.categoriesList.desserts', count: 15, isSoldOut: false, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&auto=format&fit=crop&q=80' },
  ]);

  // Sample Products State
  const [products, setProducts] = useState([
    {
      id: 'prod-1',
      nameKey: 'dashboard.products.truffleBurger',
      categoryKey: 'menu.categoriesList.burgers',
      price: '$14.50',
      status: 'Active',
      badge: 'Bestseller',
      views: '4,820',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=80',
      variants: ['Single ($14.50)', 'Double ($18.00)'],
      extras: ['Extra Cheese (+$1.50)', 'Truffle Dip (+$2.00)'],
    },
    {
      id: 'prod-2',
      nameKey: 'dashboard.products.icedLatte',
      categoryKey: 'menu.categoriesList.beverages',
      price: '$6.50',
      status: 'Sold Out',
      badge: 'Popular',
      views: '3,950',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&auto=format&fit=crop&q=80',
      variants: ['Medium ($6.50)', 'Large ($7.50)'],
      extras: ['Oat Milk (+$1.00)', 'Vanilla Syrup (+$0.50)'],
    },
    {
      id: 'prod-3',
      nameKey: 'dashboard.products.margheritaPizza',
      categoryKey: 'menu.categoriesList.pizza',
      price: '$18.00',
      status: 'Active',
      badge: 'New',
      views: '3,120',
      image: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&auto=format&fit=crop&q=80',
      variants: ['Medium 12"', 'Large 16"'],
      extras: ['Extra Mozzarella (+$2.50)'],
    },
  ]);

  // Sample Sliders & Banner Items State
  const [sliders, setSliders] = useState([
    {
      id: 'slide-1',
      titleKey: 'menu.slidersList.s1Title',
      subtitleKey: 'menu.slidersList.s1Subtitle',
      targetKey: 'dashboard.products.truffleBurger',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
      status: 'Active',
    },
    {
      id: 'slide-2',
      titleKey: 'menu.slidersList.s2Title',
      subtitleKey: 'menu.slidersList.s2Subtitle',
      targetKey: 'dashboard.products.icedLatte',
      image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop&q=80',
      status: 'Active',
    },
  ]);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const name = p.nameKey.includes('.') ? t(p.nameKey) : p.nameKey;
    const cat = p.categoryKey.includes('.') ? t(p.categoryKey) : p.categoryKey;
    return name.toLowerCase().includes(searchQuery.toLowerCase()) || cat.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Handlers
  const handleToggleCategorySoldOut = (catId: string) => {
    setCategories(categories.map((c) => (c.id === catId ? { ...c, isSoldOut: !c.isSoldOut } : c)));
    showToast(t('common.success'), 'info');
  };

  const handleToggleProductStatus = (prodId: string) => {
    setProducts(
      products.map((p) => (p.id === prodId ? { ...p, status: p.status === 'Active' ? 'Sold Out' : 'Active' } : p))
    );
    showToast(t('common.success'), 'info');
  };

  const handleOpenVariantBuilder = (dish: any) => {
    setSelectedDishForVariant(JSON.parse(JSON.stringify(dish)));
    setShowVariantModal(true);
  };

  const handleAddVariantToDish = () => {
    if (!newVariantInput.trim() || !selectedDishForVariant) return;
    const updated = {
      ...selectedDishForVariant,
      variants: [...selectedDishForVariant.variants, newVariantInput.trim()],
    };
    setSelectedDishForVariant(updated);
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    setNewVariantInput('');
    showToast(t('common.success'), 'success');
  };

  const handleAddExtraToDish = () => {
    if (!newExtraInput.trim() || !selectedDishForVariant) return;
    const updated = {
      ...selectedDishForVariant,
      extras: [...selectedDishForVariant.extras, newExtraInput.trim()],
    };
    setSelectedDishForVariant(updated);
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
    setNewExtraInput('');
    showToast(t('common.success'), 'success');
  };

  const handleAddCategory = () => {
    if (!newCatName.trim()) return;
    setCategories([
      ...categories,
      { id: `cat-${Date.now()}`, nameKey: newCatName, count: 0, isSoldOut: false, image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&auto=format&fit=crop&q=80' },
    ]);
    setNewCatName('');
    setShowAddCategoryModal(false);
    showToast(t('common.success'), 'success');
  };

  const handleAddProduct = () => {
    if (!newProdName.trim() || !newProdPrice.trim()) return;
    setProducts([
      ...products,
      {
        id: `prod-${Date.now()}`,
        nameKey: newProdName,
        categoryKey: 'menu.categoriesList.burgers',
        price: newProdPrice.startsWith('$') ? newProdPrice : `$${newProdPrice}`,
        status: 'Active',
        badge: 'New',
        views: '0',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&auto=format&fit=crop&q=80',
        variants: ['Standard'],
        extras: [],
      },
    ]);
    setNewProdName('');
    setNewProdPrice('');
    setShowAddProductModal(false);
    showToast(t('common.success'), 'success');
  };

  const handleAddSliderItem = () => {
    if (!newSlideTitle.trim()) return;
    setSliders([
      ...sliders,
      {
        id: `slide-${Date.now()}`,
        titleKey: newSlideTitle,
        subtitleKey: newSlideSubtitle || 'Special Promotional Offer',
        targetKey: 'dashboard.products.truffleBurger',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&auto=format&fit=crop&q=80',
        status: 'Active',
      },
    ]);
    setNewSlideTitle('');
    setNewSlideSubtitle('');
    setShowAddSliderItemModal(false);
    showToast(t('common.success'), 'success');
  };

  const handleConfirmDelete = () => {
    if (!deleteItem) return;
    if (deleteItem.type === 'product') {
      setProducts(products.filter((p) => p.id !== deleteItem.id));
    } else {
      setSliders(sliders.filter((s) => s.id !== deleteItem.id));
    }
    showToast(`${deleteItem.name} ${t('common.delete').toLowerCase()}d`, 'info');
    setDeleteItem(null);
  };

  return (
    <div className="space-y-6 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl lg:text-3xl">
            {t('menu.title')}
          </h1>
          <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">
            {t('menu.subtitle')}
          </p>
        </div>

        {/* Peak Hour Mode & Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setIsPeakHourMode(!isPeakHourMode);
              showToast(`${t('menu.peakHourMode')}: ${!isPeakHourMode ? 'ON' : 'OFF'}`, 'info');
            }}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-sm ${
              isPeakHourMode
                ? 'bg-amber-500 text-white ring-2 ring-amber-500/30'
                : 'border border-[var(--color-border)] bg-[var(--card)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>{t('menu.peakHourMode')}</span>
          </button>
        </div>
      </div>

      {/* Main Sub-Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2 gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto hide-scrollbar mobile-scroll-snap flex-1 min-w-0">
          <button
            onClick={() => handleTabChange('items')}
            className={`flex items-center gap-1.5 sm:gap-2 shrink-0 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold transition ${
              activeTab === 'items'
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
            }`}
          >
            <Utensils className="h-4 w-4" />
            <span>{t('menu.tabs.categoriesAndProducts')}</span>
          </button>

          <button
            onClick={() => handleTabChange('sliders')}
            className={`flex items-center gap-1.5 sm:gap-2 shrink-0 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold transition ${
              activeTab === 'sliders'
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
            }`}
          >
            <Sliders className="h-4 w-4" />
            <span>{t('menu.tabs.slidersAndBanners')}</span>
          </button>

          <button
            onClick={() => handleTabChange('qr')}
            className={`flex items-center gap-1.5 sm:gap-2 shrink-0 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold transition ${
              activeTab === 'qr'
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
            }`}
          >
            <QrCode className="h-4 w-4" />
            <span>{t('menu.tabs.qrControl')}</span>
          </button>

          <button
            onClick={() => handleTabChange('simulator')}
            className={`flex items-center gap-1.5 sm:gap-2 shrink-0 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold transition ${
              activeTab === 'simulator'
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            <span>{t('menu.tabs.simulator')}</span>
          </button>

          <button
            onClick={() => handleTabChange('reviews')}
            className={`flex items-center gap-1.5 sm:gap-2 shrink-0 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-bold transition ${
              activeTab === 'reviews'
                ? 'bg-[var(--primary)] text-white shadow-md'
                : 'bg-[var(--card)] text-[var(--text-secondary)] hover:bg-[var(--elevated)]'
            }`}
          >
            <Star className="h-4 w-4" />
            <span>{t('menu.tabs.reviews')}</span>
          </button>
        </div>

        {/* View Mode Switcher (Grid / Table) */}
        {activeTab === 'items' && (
          <div className="flex items-center gap-1 rounded-xl border border-[var(--color-border)] bg-[var(--card)] p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'grid'
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title={t('menu.viewGrid')}
              aria-label={t('menu.viewGrid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                viewMode === 'table'
                  ? 'bg-[var(--primary)] text-white'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
              title={t('menu.viewTable')}
              aria-label={t('menu.viewTable')}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* TAB 1: Categories & Products */}
      {activeTab === 'items' && (
        <div className="space-y-6">
          {/* Categories Bar & Add Category & Bulk Out-of-Stock */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-4 sm:p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Layers className="h-5 w-5 text-[var(--primary)]" />
                <h2 className="text-sm sm:text-base font-bold text-[var(--text-primary)]">{t('menu.categories.title')}</h2>
              </div>
              <button
                onClick={() => setShowAddCategoryModal(true)}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[var(--primary)] hover:bg-[var(--elevated)] transition"
              >
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">{t('menu.categories.add')}</span>
                <span className="sm:hidden">+</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <div
                  key={cat.id}
                  className={`group relative flex flex-col items-center gap-2.5 rounded-2xl border p-3 sm:p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md cursor-pointer ${
                    cat.isSoldOut
                      ? 'border-rose-500/30 bg-rose-500/5'
                      : 'border-[var(--color-border)] bg-[var(--surface)] hover:border-[var(--primary)]/40'
                  }`}
                >
                  {/* Rounded Category Image */}
                  <div className={`relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 rounded-full overflow-hidden ring-2 transition-all duration-300 ${
                    cat.isSoldOut
                      ? 'ring-rose-500/30 grayscale'
                      : 'ring-[var(--primary)]/20 group-hover:ring-[var(--primary)]/50 group-hover:scale-105'
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.nameKey.includes('.') ? t(cat.nameKey) : cat.nameKey}
                      className="h-full w-full object-cover"
                    />
                    {cat.isSoldOut && (
                      <div className="absolute inset-0 flex items-center justify-center bg-rose-500/60 backdrop-blur-sm">
                        <EyeOff className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Category Name & Count */}
                  <div className="text-center min-w-0 w-full">
                    <p className={`text-xs sm:text-sm font-bold truncate ${
                      cat.isSoldOut ? 'text-rose-500' : 'text-[var(--text-primary)]'
                    }`}>
                      {cat.nameKey.includes('.') ? t(cat.nameKey) : cat.nameKey}
                    </p>
                    <p className="text-[10px] sm:text-[11px] font-medium text-[var(--text-muted)] mt-0.5">
                      {cat.count} {t('common.items') || 'items'}
                    </p>
                  </div>

                  {/* Sold Out Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleCategorySoldOut(cat.id);
                    }}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-lg transition ${
                      cat.isSoldOut
                        ? 'bg-rose-500 text-white hover:bg-rose-600'
                        : 'bg-[var(--elevated)] text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10'
                    }`}
                    title="Toggle Bulk Category Out-of-Stock"
                  >
                    {cat.isSoldOut ? t('menu.categories.bulkSoldOut') : t('menu.categories.bulkActive')}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Products Header & Add Product */}
          <div className="space-y-4">
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('common.searchPlaceholder')}
                className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--card)] py-2.5 pl-9 pr-4 text-xs font-medium text-[var(--text-primary)] focus:border-[var(--primary)] focus:outline-none shadow-sm"
              />
            </div>

            {/* Empty State Check */}
            {filteredProducts.length === 0 ? (
              <EmptyState
                icon={Utensils}
                titleKey="common.noResults"
                actionLabelKey="menu.products.add"
                onAction={() => setShowAddProductModal(true)}
              />
            ) : viewMode === 'grid' ? (
              /* Grid View Mode */
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((item) => (
                  <div key={item.id} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--card)] shadow-lg group transition hover:border-[var(--primary)]/40 flex flex-col justify-between">
                    <div>
                      <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                        <img src={item.image} alt={item.nameKey} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        <div className="absolute top-3 right-3 flex items-center gap-1.5">
                          <span className="rounded-md bg-amber-500/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white shadow">
                            {item.badge}
                          </span>
                        </div>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-sm text-[var(--text-primary)]">
                            {item.nameKey.includes('.') ? t(item.nameKey) : item.nameKey}
                          </h3>
                          <span className="font-extrabold text-sm text-[var(--primary)]">{item.price}</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)]">
                          {item.categoryKey.includes('.') ? t(item.categoryKey) : item.categoryKey} • {item.views} {t('common.views')}
                        </p>

                        {/* Variants & Extras Preview */}
                        <div className="pt-1 flex flex-wrap gap-1 text-[10px]">
                          {item.variants.map((v, i) => (
                            <span key={i} className="rounded-md bg-[var(--surface)] border border-[var(--color-border)] px-1.5 py-0.5 font-medium text-[var(--text-secondary)]">
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-between border-t border-[var(--color-border)] text-xs mt-2">
                      <button
                        onClick={() => handleOpenVariantBuilder(item)}
                        className="flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] hover:underline pt-2"
                      >
                        <Settings2 className="h-3.5 w-3.5" />
                        <span>{t('menu.products.variantsAndExtras')}</span>
                      </button>

                      <div className="flex items-center gap-1 pt-2">
                        <button
                          onClick={() => handleToggleProductStatus(item.id)}
                          className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--text-primary)]"
                          title="Toggle Status"
                          aria-label="Toggle Status"
                        >
                          {item.status === 'Active' ? <Eye className="h-4 w-4 text-emerald-500" /> : <EyeOff className="h-4 w-4 text-rose-500" />}
                        </button>
                        <button
                          onClick={() => setDeleteItem({ id: item.id, type: 'product', name: item.nameKey.includes('.') ? t(item.nameKey) : item.nameKey })}
                          className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-rose-500"
                          title={t('common.delete')}
                          aria-label={t('common.delete')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Table View Mode */
              <div className="overflow-x-auto rounded-2xl border border-[var(--color-border)] bg-[var(--card)] shadow-lg">
                <table className="w-full text-left text-xs min-w-[600px]">
                  <thead className="border-b border-[var(--color-border)] bg-[var(--surface)] font-semibold text-[var(--text-muted)]">
                    <tr>
                      <th className="p-3">{t('menu.products.name')}</th>
                      <th className="p-3">{t('menu.products.category')}</th>
                      <th className="p-3">{t('menu.products.price')}</th>
                      <th className="p-3">{t('menu.products.badge')}</th>
                      <th className="p-3">{t('menu.products.status')}</th>
                      <th className="p-3 text-right">{t('common.actions')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border)]">
                    {filteredProducts.map((item) => (
                      <tr key={item.id} className="hover:bg-[var(--elevated)]/40 transition">
                        <td className="p-3 font-bold text-[var(--text-primary)]">
                          {item.nameKey.includes('.') ? t(item.nameKey) : item.nameKey}
                        </td>
                        <td className="p-3 text-[var(--text-secondary)]">
                          {item.categoryKey.includes('.') ? t(item.categoryKey) : item.categoryKey}
                        </td>
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
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => handleToggleProductStatus(item.id)}
                              className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--text-primary)]"
                              aria-label="Toggle Status"
                            >
                              {item.status === 'Active' ? <Eye className="h-4 w-4 text-emerald-500" /> : <EyeOff className="h-4 w-4 text-rose-500" />}
                            </button>
                            <button
                              onClick={() => setDeleteItem({ id: item.id, type: 'product', name: item.nameKey.includes('.') ? t(item.nameKey) : item.nameKey })}
                              className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-rose-500"
                              aria-label={t('common.delete')}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 5: Bilingual Smartphone Menu Simulator */}
      {activeTab === 'simulator' && (
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[var(--text-muted)]">{t('menu.simulator.langLabel')}</span>
            <button
              onClick={() => setSimulatorLang('ar')}
              className={`px-3 py-1 text-xs font-bold rounded-lg ${simulatorLang === 'ar' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--card)] text-[var(--text-secondary)]'}`}
            >
              {t('menu.simulator.arabic')}
            </button>
            <button
              onClick={() => setSimulatorLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-lg ${simulatorLang === 'en' ? 'bg-[var(--primary)] text-white' : 'bg-[var(--card)] text-[var(--text-secondary)]'}`}
            >
              {t('menu.simulator.english')}
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="w-80 h-[560px] rounded-[40px] border-8 border-slate-900 bg-[var(--background)] shadow-2xl overflow-hidden flex flex-col relative font-sans">
            {/* Notch Header */}
            <div className="bg-slate-900 h-6 w-full flex items-center justify-center">
              <div className="h-3 w-28 bg-slate-800 rounded-full"></div>
            </div>

            {/* Mobile Header Banner */}
            <div className="p-4 bg-[var(--card)] border-b border-[var(--color-border)] flex items-center gap-3">
              <img src="/assets/logo/Mot7km_Logo.png" alt="Logo" className="h-8 w-8 object-contain" />
              <div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">
                  {t('menu.simulator.branchName')}
                </h4>
                <p className="text-[10px] text-[var(--text-muted)]">{t('menu.simulator.subText')}</p>
              </div>
            </div>

            {/* Mobile Body Content */}
            <div className="flex-1 p-3 overflow-y-auto space-y-3 hide-scrollbar">
              <div className="rounded-xl bg-gradient-to-r from-[var(--primary)] to-cyan-600 p-3 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider">{t('menu.simulator.promoBadge')}</span>
                <h5 className="font-extrabold text-xs">{t('menu.simulator.promoTitle')}</h5>
              </div>

              <div className="space-y-2">
                <h6 className="text-[11px] font-bold text-[var(--text-primary)]">
                  {t('menu.simulator.popularHeader')}
                </h6>

                {products.map((p) => (
                  <div key={p.id} className="flex items-center gap-2.5 rounded-xl border border-[var(--color-border)] bg-[var(--card)] p-2 shadow-sm">
                    <img src={p.image} alt="Dish" className="h-12 w-12 rounded-lg object-cover" />
                    <div className="flex-1 text-[11px]">
                      <h6 className="font-bold text-[var(--text-primary)]">
                        {p.nameKey.includes('.') ? t(p.nameKey) : p.nameKey}
                      </h6>
                      <span className="font-bold text-[var(--primary)]">{p.price}</span>
                    </div>
                  </div>
                ))}
              </div>
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
                {t('menu.sliders.sub')}
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

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sliders.map((slide) => (
              <div key={slide.id} className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--card)] shadow-lg group">
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={slide.image}
                    alt="Banner"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 flex flex-col justify-end">
                    <span className="rounded-md bg-[var(--primary)] px-2 py-0.5 text-[10px] font-bold text-white w-max mb-1">
                      {slide.status}
                    </span>
                    <h3 className="font-bold text-white text-sm leading-snug">
                      {slide.titleKey.includes('.') ? t(slide.titleKey) : slide.titleKey}
                    </h3>
                    <p className="text-xs text-slate-300">
                      {slide.subtitleKey.includes('.') ? t(slide.subtitleKey) : slide.subtitleKey}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3.5 text-xs">
                  <span className="text-[var(--text-muted)]">{t('menu.sliders.targetLabel')} <strong className="text-[var(--text-primary)]">{slide.targetKey.includes('.') ? t(slide.targetKey) : slide.targetKey}</strong></span>
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-[var(--primary)]" aria-label={t('common.edit')}>
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setDeleteItem({ id: slide.id, type: 'slider', name: slide.titleKey.includes('.') ? t(slide.titleKey) : slide.titleKey })}
                      className="rounded-lg p-1.5 text-[var(--text-muted)] hover:bg-[var(--elevated)] hover:text-rose-500"
                      aria-label={t('common.delete')}
                    >
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
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('menu.qr.title')}</h3>
              <p className="text-xs text-[var(--text-muted)] mt-1">{t('menu.qr.url')}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => showToast(t('menu.qr.downloadBtn'), 'info')}
                className="flex items-center gap-2 rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-[var(--primary-dark)] transition"
              >
                <Download className="h-4 w-4" /> {t('menu.qr.downloadBtn')}
              </button>
              <button
                onClick={() => showToast(t('menu.qr.shareBtn'), 'info')}
                className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
              >
                <Share2 className="h-4 w-4" /> {t('menu.qr.shareBtn')}
              </button>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-lg space-y-5">
            <h2 className="text-base font-bold text-[var(--text-primary)]">{t('menu.qr.brandingTitle')}</h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.qr.themeColor')}</label>
                <div className="mt-2 flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-[#1683C7] ring-2 ring-white cursor-pointer" />
                  <div className="h-8 w-8 rounded-full bg-[#0F766E] cursor-pointer" />
                  <div className="h-8 w-8 rounded-full bg-[#E11D48] cursor-pointer" />
                  <div className="h-8 w-8 rounded-full bg-[#D97706] cursor-pointer" />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[var(--text-secondary)]">{t('menu.qr.logoLabel')}</label>
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-3">
                  <img src="/assets/logo/Mot7km_Logo.png" alt="Mot7km Brand Logo" className="h-8 w-8 object-contain rounded-lg bg-[var(--primary)]/10 p-1 ring-1 ring-[var(--primary)]/20" />
                  <span className="text-xs font-bold text-[var(--text-primary)]">Mot7km_Logo.png</span>
                  <span className="ml-auto text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">Primary Logo</span>
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
              <span className="text-xs text-[var(--text-muted)]">{t('menu.reviews.avgRating')}</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[var(--text-primary)]">4.9</span>
                <span className="text-amber-500 font-semibold text-sm">★★★★★</span>
              </div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
              <span className="text-xs text-[var(--text-muted)]">{t('menu.reviews.totalFeedback')}</span>
              <div className="mt-2 text-3xl font-bold text-[var(--text-primary)]">328</div>
            </div>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-5 shadow-sm">
              <span className="text-xs text-[var(--text-muted)]">{t('menu.reviews.pendingModeration')}</span>
              <div className="mt-2 text-3xl font-bold text-emerald-500">0</div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Dish Variants & Add-ons Builder Modal (NOW EDITABLE) */}
      {showVariantModal && selectedDishForVariant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl border border-[var(--color-border)] bg-[var(--card)] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--color-border)]">
              <h3 className="font-bold text-base text-[var(--text-primary)]">{t('menu.variantsBuilder')}</h3>
              <button onClick={() => setShowVariantModal(false)} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 text-xs">
              <h4 className="font-bold text-[var(--primary)] text-sm">{selectedDishForVariant.nameKey.includes('.') ? t(selectedDishForVariant.nameKey) : selectedDishForVariant.nameKey}</h4>
              
              <div>
                <label className="font-semibold text-[var(--text-secondary)]">{t('menu.products.sizes')}</label>
                <div className="mt-1 space-y-1.5">
                  {selectedDishForVariant.variants.map((v: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2">
                      <span>{v}</span>
                      <Check className="h-4 w-4 text-emerald-500" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newVariantInput}
                    onChange={(e) => setNewVariantInput(e.target.value)}
                    placeholder="e.g. Large ($16.00)"
                    className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2 text-xs font-medium focus:outline-none"
                  />
                  <button onClick={handleAddVariantToDish} className="rounded-xl bg-[var(--primary)] px-3 py-1.5 text-xs font-bold text-white shadow">
                    + Add
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-[var(--text-secondary)]">{t('menu.products.extras')}</label>
                <div className="mt-1 space-y-1.5">
                  {selectedDishForVariant.extras.map((e: string, idx: number) => (
                    <div key={idx} className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2">
                      <span>{e}</span>
                      <Check className="h-4 w-4 text-emerald-500" />
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={newExtraInput}
                    onChange={(e) => setNewExtraInput(e.target.value)}
                    placeholder="e.g. Extra Sauce (+$1.00)"
                    className="flex-1 rounded-xl border border-[var(--color-border)] bg-[var(--surface)] p-2 text-xs font-medium focus:outline-none"
                  />
                  <button onClick={handleAddExtraToDish} className="rounded-xl bg-[var(--primary)] px-3 py-1.5 text-xs font-bold text-white shadow">
                    + Add
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
              <button onClick={() => setShowVariantModal(false)} className="rounded-xl border border-[var(--color-border)] px-4 py-2 text-xs font-semibold text-[var(--text-secondary)]">
                {t('common.close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS 1, 2, 3 */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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
                {t('common.cancel')}
              </button>
              <button onClick={handleAddCategory} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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
                {t('common.cancel')}
              </button>
              <button onClick={handleAddProduct} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddSliderItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
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
                {t('common.cancel')}
              </button>
              <button onClick={handleAddSliderItem} className="rounded-xl bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-white shadow">
                {t('common.save')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteItem}
        title={t('common.delete')}
        message={`Are you sure you want to delete "${deleteItem?.name}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteItem(null)}
      />
    </div>
  );
};

export default MenuPage;
