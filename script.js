// Contadores do header (carrinho e favoritos)
const cartCount = document.getElementById('cart-count');
const wishlistCount = document.getElementById('wishlist-count');
const cartStorageKey = 'liss-cart';
const whatsappNumber = '5511989485290';
let cartItems = [];

try {
  cartItems = JSON.parse(localStorage.getItem(cartStorageKey) || '[]');
  if (!Array.isArray(cartItems)) cartItems = [];
  cartItems = cartItems
    .filter((item) => item && typeof item.title === 'string' && item.title && item.price)
    .map((item) => ({ ...item, quantity: Math.max(1, Number(item.quantity) || 1) }));
} catch {
  cartItems = [];
}

const updateCartCount = () => {
  const quantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  if (cartCount) cartCount.textContent = quantity;
  try {
    localStorage.setItem(cartStorageKey, JSON.stringify(cartItems));
  } catch {
    // O carrinho continua disponível durante esta sessão se o armazenamento estiver bloqueado.
  }
};
updateCartCount();

const carousel = document.querySelector('[data-carousel]');

if (carousel) {
  const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
  const dots = Array.from(carousel.querySelectorAll('.dot'));
  const previousButton = carousel.querySelector('.prev-arrow');
  const nextButton = carousel.querySelector('.next-arrow');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = 0;
  let rotationTimer;

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === activeIndex;
      slide.classList.toggle('active', isActive);
      slide.setAttribute('aria-hidden', String(!isActive));
      dots[slideIndex].classList.toggle('active', isActive);
      dots[slideIndex].setAttribute('aria-current', String(isActive));
    });
  }

  function stopRotation() {
    window.clearInterval(rotationTimer);
  }

  function startRotation() {
    stopRotation();
    if (!reducedMotion.matches) {
      rotationTimer = window.setInterval(() => showSlide(activeIndex + 1), 6000);
    }
  }

  previousButton.addEventListener('click', () => {
    showSlide(activeIndex - 1);
    startRotation();
  });

  nextButton.addEventListener('click', () => {
    showSlide(activeIndex + 1);
    startRotation();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      startRotation();
    });
  });

  carousel.addEventListener('mouseenter', stopRotation);
  carousel.addEventListener('mouseleave', startRotation);
  carousel.addEventListener('focusin', stopRotation);
  carousel.addEventListener('focusout', (event) => {
    if (!carousel.contains(event.relatedTarget)) {
      startRotation();
    }
  });

  reducedMotion.addEventListener('change', startRotation);
  startRotation();
}

document.addEventListener('DOMContentLoaded', () => {
  const swatchColors = {
    Branco: '#ffffff',
    Branca: '#ffffff',
    Preto: '#111827',
    Preta: '#111827',
    Azul: '#2563eb',
    Rosa: '#f472b6',
    Verde: '#22c55e',
    Vermelho: '#ef4444',
    Vermelha: '#ef4444',
    Cinza: '#94a3b8',
    Amarelo: '#facc15',
    Amarela: '#facc15',
    Laranja: '#f97316',
    Lilas: '#c084fc',
    Marrom: '#7c4b2a',
    Transparente: '#dbeafe',
    Bege: '#f5d7b5',
    Roxo: '#8b5cf6',
    Dourado: '#d4af37',
    Dourada: '#d4af37',
    Prata: '#cbd5e1',
    'Azul escuro': '#1e3a8a',
    Roxa: '#8b5cf6',
    'Rosé': '#b76e79'
  };

  const normalizeProductKey = (value = '') => {
    return String(value)
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\s+/g, '-');
  };

  const formatCurrency = (amount) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount);

  const productColorProfiles = {
    'caneca-alca-branca': ['Branca'],
    'caneca-alca-colorida': ['Amarela', 'Azul', 'Cinza', 'Laranja', 'Lilas', 'Marrom', 'Preta', 'Rosa', 'Verde', 'Vermelha'],
    'caneca-alca-de-coracao': ['Amarela', 'Azul', 'Azul escuro', 'Cinza', 'Laranja', 'Lilas', 'Marrom', 'Preta', 'Rosa', 'Verde', 'Vermelha'],
    'caneca-com-colher': ['Amarela', 'Azul', 'Laranja', 'Marrom', 'Preta', 'Rosa', 'Verde', 'Vermelha'],
    'caneca-glitter': ['Rosa', 'Azul', 'Prata', 'Vermelha'],
    'caneca-espelhada': ['Dourada', 'Prata', 'Rosé'],
    'caneca-chopp': ['Preta', 'Azul', 'Verde', 'Branca', 'Roxa', 'Vermelha']
  };

  const productColorImageMap = {
    'caneca-alca-colorida': {
      amarela: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-amarela.png'],
      azul: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-azul.png'],
      cinza: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-cinza.png'],
      laranja: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-laranja.png'],
      lilas: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-lilas.png'],
      marrom: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-marrom.png'],
      preta: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-preta.png'],
      rosa: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-rosa.png'],
      verde: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-verde.png'],
      vermelha: ['assets/images/caneca-alca-colorida-cores/caneca-alca-colorida-vermelha.png']
    },
    'caneca-alca-de-coracao': {
      amarela: ['assets/images/caneca-alca-coração-cores/caneca-coracao-amarela.png'],
      'azul-escuro': ['assets/images/caneca-alca-coração-cores/caneca-coracao-azul escuro.png'],
      azul: ['assets/images/caneca-alca-coração-cores/caneca-coracao-azul.png'],
      cinza: ['assets/images/caneca-alca-coração-cores/caneca-coracao-cinza.png'],
      laranja: ['assets/images/caneca-alca-coração-cores/caneca-coracao-laranja.jpg'],
      lilas: ['assets/images/caneca-alca-coração-cores/caneca-coracao-lilas.png'],
      marrom: ['assets/images/caneca-alca-coração-cores/caneca-coracao-marrom.png'],
      preta: ['assets/images/caneca-alca-coração-cores/caneca-coracao-preta.png'],
      rosa: ['assets/images/caneca-alca-coração-cores/caneca-coracao-rosa.png'],
      verde: ['assets/images/caneca-alca-coração-cores/caneca-coracao-verde.png'],
      vermelha: ['assets/images/caneca-alca-coração-cores/caneca-coracao-vermelha.png']
    },
    'caneca-com-colher': {
      amarela: ['assets/images/caneca-comcolher-cores/caneca-comcolher-amarela.png'],
      azul: ['assets/images/caneca-comcolher-cores/caneca-comcolher-azul.png'],
      laranja: ['assets/images/caneca-comcolher-cores/caneca-comcolher-laranja.png'],
      marrom: ['assets/images/caneca-comcolher-cores/caneca-comcolher-marrom.png'],
      preta: ['assets/images/caneca-comcolher-cores/caneca-comcolher-preta.png'],
      rosa: ['assets/images/caneca-comcolher-cores/caneca-comcolher-rosa.png'],
      verde: ['assets/images/caneca-comcolher-cores/caneca-comcolher-verde.png'],
      vermelha: ['assets/images/caneca-comcolher-cores/caneca-comcolher-vermelha.png']
    },
    'caneca-glitter': {
      azul: ['assets/images/caneca-glitter-cores/caneca-glitter-azul.png'],
      prata: ['assets/images/caneca-glitter-cores/caneca-glitter-prata.png'],
      rosa: ['assets/images/caneca-glitter-cores/caneca-glitter-rosa.png'],
      vermelha: ['assets/images/caneca-glitter-cores/caneca-glitter-vermelha.png']
    },
    'caneca-espelhada': {
      dourada: ['assets/images/caneca-espelhada-cores/caneca-espelhada-dourada.png'],
      prata: ['assets/images/caneca-espelhada-cores/caneca-espelhada-prata.png'],
      rose: ['assets/images/caneca-espelhada-cores/caneca-espelhada-rose.png']
    },
    'caneca-chopp': {
      azul: ['assets/images/caneca-chop-cores/caneca-chop-azul.png'],
      branca: ['assets/images/caneca-chop-cores/caneca-chop-branca.png'],
      preta: ['assets/images/caneca-chop-cores/caneca-chop-preta.png'],
      roxa: ['assets/images/caneca-chop-cores/caneca-chop-roxa.png'],
      verde: ['assets/images/caneca-chop-cores/caneca-chop-verde.png'],
      vermelha: ['assets/images/caneca-chop-cores/caneca-chop-vermelha.png']
    }
  };

  const normalizeColorKey = (value = '') => {
    return String(value)
      .trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  const resolveProductImagePath = (card, color = '') => {
    const fallback = resolveAssetPath(card?.getAttribute('data-img') || card?.querySelector('img')?.getAttribute('src'));
    if (!color) return fallback;

    const normalizedTitleKey = normalizeProductKey(card?.dataset.title || '');
    const normalizedColor = normalizeColorKey(color);
    return productColorImageMap[normalizedTitleKey]?.[normalizedColor]?.[0] || fallback;
  };

  const applyColorToProductImage = (img, color, card = null) => {
    if (!img) return;

    if (!color) {
      img.style.filter = '';
      return;
    }

    const mappedPath = card ? resolveProductImagePath(card, color) : '';
    if (mappedPath) {
      img.src = mappedPath;
      img.style.filter = '';
      img.style.transition = 'opacity 0.2s ease';
      return;
    }

    img.style.filter = '';
  };

  const fallbackProductImage = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480"><rect width="640" height="480" fill="#f1f5f9"/><path d="M235 145h145v165a55 55 0 0 1-55 55h-35a55 55 0 0 1-55-55V145Zm145 35h35a45 45 0 0 1 0 90h-35" fill="none" stroke="#94a3b8" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/><text x="320" y="420" text-anchor="middle" fill="#64748b" font-family="sans-serif" font-size="24">Imagem indisponivel</text></svg>')}`;

  const resolveAssetPath = (value = '') => {
    const fallback = fallbackProductImage;
    if (!value) return fallback;

    const trimmed = value.trim();
    if (trimmed.startsWith('assets/') || trimmed.startsWith('/')) return trimmed;
    if (trimmed.includes('imagem-aqui')) return fallback;
    const fileName = trimmed.split('/').pop();
    return `assets/images/products/${fileName}`;
  };

  const getProductColorOptions = (card) => {
    const titleKey = normalizeProductKey(card?.dataset?.title || '');
    const explicit = (card.dataset.colors || '').trim();
    if (explicit) {
      return explicit.split(',').map((color) => color.trim()).filter(Boolean);
    }

    if (productColorProfiles[titleKey]) {
      return productColorProfiles[titleKey];
    }

    return [];
  };

  const getProductVariantOptions = (card) => {
    try {
      const options = JSON.parse(card?.dataset?.variantOptions || '[]');
      if (!Array.isArray(options)) return [];
      return options.filter((option) => {
        return option && typeof option.value === 'string' && typeof option.label === 'string' && Number.isFinite(Number(option.price));
      });
    } catch {
      return [];
    }
  };

  const getSelectedVariantOption = (card) => {
    const options = getProductVariantOptions(card);
    return options.find((option) => option.value === card.dataset.selectedVariant) || options[0] || null;
  };

  const updateProductVariant = (card, variantValue) => {
    const option = getProductVariantOptions(card).find((item) => item.value === variantValue);
    if (!option) return;

    card.dataset.selectedVariant = option.value;
    card.dataset.price = formatCurrency(Number(option.price));
    const variantImage = resolveAssetPath(option.image || card.dataset.img);
    card.dataset.selectedVariantImage = variantImage;
    const cardPrice = card.querySelector('.product-price-row .price');
    if (cardPrice) cardPrice.textContent = card.dataset.price;
    const cardImage = card.querySelector('.product-img-box img');
    if (cardImage) {
      cardImage.src = variantImage;
      cardImage.alt = `${card.dataset.title} ${option.label}`;
    }

    const productModal = document.getElementById('productModal');
    if (productModal?.classList.contains('active') && productModal.dataset.productKey === normalizeProductKey(card.dataset.title)) {
      productModal.dataset.variant = option.label;
      productModal.dataset.variantLabel = card.dataset.variantLabel || 'Opção';
      productModal.dataset.image = variantImage;
      productModal.dataset.price = card.dataset.price;
      document.getElementById('modalVariantSelect').value = option.value;
      document.getElementById('modalImg').src = variantImage;
      document.getElementById('modalImg').alt = `${card.dataset.title} ${option.label}`;
      document.getElementById('modalPrice').textContent = `Preço: ${card.dataset.price}`;
    }
  };

  const renderVariantOptions = (select, options, selectedValue) => {
    select.replaceChildren();
    options.forEach((option) => {
      const item = document.createElement('option');
      item.value = option.value;
      item.textContent = `${option.label} - ${formatCurrency(Number(option.price))}`;
      select.appendChild(item);
    });
    select.value = selectedValue;
  };

  const addVariantPickerToCard = (card) => {
    const options = getProductVariantOptions(card);
    if (!options.length) return;

    const info = card.querySelector('.product-info');
    const priceRow = info.querySelector('.product-price-row');
    const label = document.createElement('label');
    label.className = 'product-variant-picker';
    label.append(card.dataset.variantLabel || 'Opção');

    const select = document.createElement('select');
    select.className = 'product-variant-select';
    select.setAttribute('aria-label', `Selecionar ${card.dataset.variantLabel || 'opção'} de ${card.dataset.title}`);
    renderVariantOptions(select, options, card.dataset.selectedVariant || options[0].value);
    select.addEventListener('change', () => updateProductVariant(card, select.value));
    label.appendChild(select);

    if (priceRow) info.insertBefore(label, priceRow);
    else info.appendChild(label);
    updateProductVariant(card, select.value);
  };

  const addBannerQuoteCalculator = (card) => {
    const calculator = card.querySelector('[data-banner-quote]');
    if (!calculator) return;

    const widthInput = calculator.querySelector('[data-banner-width]');
    const heightInput = calculator.querySelector('[data-banner-height]');
    const result = calculator.querySelector('[data-banner-quote-result]');
    const pricePerSquareMeter = Number(card.dataset.bannerMeterPrice);
    const minimumPrice = Number(card.dataset.bannerMinPrice);
    if (!widthInput || !heightInput || !result || !Number.isFinite(pricePerSquareMeter) || !Number.isFinite(minimumPrice)) return;

    const updateQuote = () => {
      const width = Number(widthInput.value);
      const height = Number(heightInput.value);
      if (!Number.isFinite(width) || width <= 0 || !Number.isFinite(height) || height <= 0) {
        result.textContent = 'Informe a largura e a altura para calcular.';
        return;
      }

      const area = (width / 100) * (height / 100);
      const price = Math.max(area * pricePerSquareMeter, minimumPrice);
      result.textContent = `Orçamento estimado: ${formatCurrency(price)} (${area.toFixed(2)} m²)`;
    };

    widthInput.addEventListener('input', updateQuote);
    heightInput.addEventListener('input', updateQuote);
  };

  const createSwatch = (color, isActive = false) => {
    const swatch = document.createElement('button');
    swatch.type = 'button';
    swatch.className = `color-option${isActive ? ' active' : ''}`;
    swatch.setAttribute('aria-label', `Selecionar cor ${color}`);
    swatch.title = color;
    swatch.style.background = swatchColors[color] || '#cbd5e1';
    swatch.dataset.color = color;
    return swatch;
  };

  const renderColorPicker = (container, colors, selectedColor = '') => {
    if (!container || !colors.length) return;

    container.innerHTML = '';
    colors.forEach((color) => {
      const isActive = color === selectedColor || (!selectedColor && color === colors[0]);
      const swatch = createSwatch(color, isActive);
      swatch.addEventListener('click', (event) => {
        event.stopPropagation();
        const picker = event.currentTarget.closest('.product-colors, .modal-color-picker');
        const card = picker && picker.closest('.product-card');
        if (card) {
          card.dataset.selectedColor = color;
          applyColorToProductImage(card.querySelector('img'), color, card);
        }
        if (picker) {
          picker.querySelectorAll('.color-option').forEach((item) => {
            item.classList.toggle('active', item.dataset.color === color);
          });
        }
        if (document.getElementById('productModal')?.classList.contains('active')) {
          const productModal = document.getElementById('productModal');
          const modalPicker = document.getElementById('modalColorPicker');
          modalPicker?.querySelectorAll('.color-option').forEach((item) => {
            item.classList.toggle('active', item.dataset.color === color);
          });
          const modalImg = document.getElementById('modalImg');
          const modalCards = Array.from(document.querySelectorAll('.product-card')).filter((item) => {
            return normalizeProductKey(item.dataset.title) === productModal.dataset.productKey;
          });
          const modalCard = modalCards[0];
          if (modalCard && modalImg) {
            productModal.dataset.color = color;
            modalCards.forEach((matchingCard) => {
              matchingCard.dataset.selectedColor = color;
              matchingCard.querySelectorAll('.product-colors .color-option').forEach((item) => {
                item.classList.toggle('active', item.dataset.color === color);
              });
            });
            document.getElementById('modalTitle').textContent = `${modalCard.dataset.title} - ${color}`;
            document.getElementById('modalDesc').textContent = `${modalCard.dataset.desc} Cor selecionada: ${color}.`;
            modalImg.src = resolveProductImagePath(modalCard, color);
            modalImg.onerror = () => {
              if (modalImg.src !== fallbackProductImage) modalImg.src = fallbackProductImage;
            };
          }
        }
      });
      container.appendChild(swatch);
    });
  };

  const addColorPickerToCard = (card) => {
    const colors = getProductColorOptions(card);
    if (!colors.length) return;

    const info = card.querySelector('.product-info');
    const priceRow = info.querySelector('.product-price-row');
    let picker = info.querySelector('.product-colors');

    if (!picker) {
      picker = document.createElement('div');
      picker.className = 'product-colors';
      if (priceRow) {
        info.insertBefore(picker, priceRow);
      } else {
        info.appendChild(picker);
      }
    }

    const selectedColor = card.dataset.selectedColor || colors[0];
    card.dataset.selectedColor = selectedColor;
    applyColorToProductImage(card.querySelector('img'), selectedColor, card);
    renderColorPicker(picker, colors, selectedColor);
  };

  const setWishlistState = (btn, active) => {
    btn.classList.toggle('active', active);
    const icon = btn.querySelector('i');
    icon.classList.toggle('fa-solid', active);
    icon.classList.toggle('fa-regular', !active);
  };

  const updateWishlistCount = () => {
    if (!wishlistCount) return;
    const likedTitles = new Set(
      Array.from(document.querySelectorAll('.wishlist-btn.active'))
        .map((btn) => btn.closest('.product-card')?.dataset.title)
    );
    wishlistCount.textContent = likedTitles.size;
  };

  document.addEventListener('click', (event) => {
    const btn = event.target.closest('.wishlist-btn');
    if (!btn) return;

    event.stopPropagation();
    const title = btn.closest('.product-card')?.dataset.title;
    const active = !btn.classList.contains('active');
    document.querySelectorAll('.wishlist-btn').forEach((other) => {
      if (other.closest('.product-card')?.dataset.title === title) {
        setWishlistState(other, active);
      }
    });
    updateWishlistCount();
  });

  const catalogGrid = document.getElementById('catalogGrid');
  const seenProductTitles = new Set(
    Array.from(catalogGrid?.querySelectorAll('.product-card') || [])
      .map((card) => normalizeProductKey(card.dataset.title))
  );
  document.querySelectorAll('#destaques .product-card').forEach((card) => {
    const title = normalizeProductKey(card.dataset.title);
    if (!seenProductTitles.has(title) && catalogGrid) {
      seenProductTitles.add(title);
      catalogGrid.appendChild(card.cloneNode(true));
    }
  });

  const categoryCards = document.querySelectorAll('#categorias .category-card');
  const productCards = document.querySelectorAll('.product-card');          // todos (inicialização)
  const catalogCards = document.querySelectorAll('#catalogGrid .product-card');

  const normalizeCategory = (value = '') => {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const categoryMatches = (selectedCategory, productCategory) => {
    const normalizedSelected = normalizeCategory(selectedCategory);
    const normalizedProduct = normalizeCategory(productCategory);

    if (!normalizedSelected || !normalizedProduct) return false;

    const selectedVariants = new Set([
      normalizedSelected,
      normalizedSelected.replace(/s$/, ''),
      normalizedSelected.replace(/(?:es|s)$/, ''),
      normalizedSelected.replace(/\s+e\s+faixas$/, ' faixas')
    ]);

    const productVariants = new Set([
      normalizedProduct,
      normalizedProduct.replace(/s$/, ''),
      normalizedProduct.replace(/(?:es|s)$/, '')
    ]);

    for (const selectedVariant of selectedVariants) {
      for (const productVariant of productVariants) {
        if (
          selectedVariant === productVariant ||
          productVariant.includes(selectedVariant) ||
          selectedVariant.includes(productVariant)
        ) {
          return true;
        }
      }
    }

    return false;
  };

  let activeCategory = '';
  const searchInput = document.getElementById('productSearch');
  const catalogStatus = document.getElementById('catalogStatus');
  const catalogEmpty = document.getElementById('catalogEmpty');

  const filterCatalog = (selectedCategory = activeCategory, query = searchInput?.value || '') => {
    activeCategory = selectedCategory;
    const normalizedQuery = normalizeCategory(query);
    let visibleCount = 0;

    catalogCards.forEach((product) => {
      const productCategory = product.getAttribute('data-category');
      const searchableText = normalizeCategory(`${product.dataset.title} ${productCategory} ${product.dataset.desc}`);
      const matchesCategory = !selectedCategory || categoryMatches(selectedCategory, productCategory);
      const matchesSearch = !normalizedQuery || searchableText.includes(normalizedQuery);
      product.hidden = !(matchesCategory && matchesSearch);
      if (!product.hidden) visibleCount += 1;
    });

    if (catalogStatus) catalogStatus.textContent = `${visibleCount} ${visibleCount === 1 ? 'produto' : 'produtos'}`;
    if (catalogEmpty) catalogEmpty.hidden = visibleCount > 0;
  };

  const categoryDropdown = document.getElementById('categoryDropdown');
  const categoryToggle = document.querySelector('.nav-category-toggle');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.getElementById('mainNav');

  const closeCategoryMenu = () => {
    categoryDropdown.hidden = true;
    categoryToggle.setAttribute('aria-expanded', 'false');
  };

  const closeMobileMenu = () => {
    mainNav.classList.remove('is-open');
    mobileMenuToggle.setAttribute('aria-expanded', 'false');
    mobileMenuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    mobileMenuToggle.querySelector('i').className = 'fa-solid fa-bars';
  };

  const selectCategory = (category) => {
    categoryCards.forEach((item) => {
      item.classList.toggle('active', item.querySelector('span').textContent.trim() === category);
    });
    filterCatalog(category);
    closeCategoryMenu();
    closeMobileMenu();
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  };

  categoryCards.forEach((card) => {
    const category = card.querySelector('span').textContent.trim();
    const menuItem = document.createElement('button');
    menuItem.type = 'button';
    menuItem.textContent = category;
    menuItem.setAttribute('role', 'menuitem');
    menuItem.addEventListener('click', () => selectCategory(category));
    categoryDropdown.appendChild(menuItem);

    card.addEventListener('click', (event) => {
      event.preventDefault();
      selectCategory(category);
    });
  });

  categoryToggle.addEventListener('click', () => {
    const isExpanded = categoryToggle.getAttribute('aria-expanded') === 'true';
    categoryDropdown.hidden = isExpanded;
    categoryToggle.setAttribute('aria-expanded', String(!isExpanded));
  });

  mobileMenuToggle.addEventListener('click', () => {
    const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
    mainNav.classList.toggle('is-open', !isExpanded);
    mobileMenuToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenuToggle.setAttribute('aria-label', isExpanded ? 'Abrir menu de navegação' : 'Fechar menu de navegação');
    mobileMenuToggle.querySelector('i').className = isExpanded ? 'fa-solid fa-bars' : 'fa-solid fa-xmark';
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav-category')) closeCategoryMenu();
  });

  mainNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMobileMenu));

  const searchForm = document.getElementById('searchForm');
  searchInput.addEventListener('input', () => filterCatalog());
  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    filterCatalog();
    document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Links "Ver todos os produtos" / "Limpar filtro"
  document.querySelectorAll('[data-reset-categories]').forEach((link) => {
    link.addEventListener('click', () => {
      categoryCards.forEach((item) => item.classList.remove('active'));
      if (searchInput) searchInput.value = '';
      filterCatalog('');
    });
  });

  filterCatalog('');

  productCards.forEach((card) => {
    const img = card.querySelector('img');
    if (img) {
      const originalSrc = img.getAttribute('src') || '';
      const nextSrc = resolveAssetPath(originalSrc);
      if (nextSrc !== originalSrc) {
        img.setAttribute('src', nextSrc);
      }
      img.onerror = () => {
        if (img.src !== fallbackProductImage) img.src = fallbackProductImage;
      };
    }

    addColorPickerToCard(card);
    addVariantPickerToCard(card);
    addBannerQuoteCalculator(card);

    const triggerElements = card.querySelectorAll('.product-img-box, .product-title');
    triggerElements.forEach((elem) => {
      elem.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        const price = card.getAttribute('data-price');
        const category = card.getAttribute('data-category');
        const desc = card.getAttribute('data-desc');
        const selectedColor = card.dataset.selectedColor || getProductColorOptions(card)[0] || 'Padrão';
        const selectedVariant = getSelectedVariantOption(card);
        const imgPath = resolveAssetPath(selectedVariant?.image || card.getAttribute('data-img') || card.querySelector('img')?.getAttribute('src'));

        document.getElementById('modalTitle').textContent = selectedColor === 'Padrão' ? title : `${title} - ${selectedColor}`;
        document.getElementById('modalPrice').textContent = selectedVariant ? `Preço: ${price}` : `A partir de ${price}`;
        document.getElementById('modalCategory').textContent = category;
        document.getElementById('modalDesc').textContent = `${desc} Cor selecionada: ${selectedColor}.`;
        const modalImg = document.getElementById('modalImg');
        const modal = document.getElementById('productModal');
        modal.dataset.productKey = normalizeProductKey(title);
        modal.dataset.title = title;
        modal.dataset.price = price;
        modal.dataset.category = category;
        modal.dataset.image = imgPath;
        modal.dataset.color = selectedColor;
        modal.dataset.variant = selectedVariant?.label || '';
        modal.dataset.variantLabel = card.dataset.variantLabel || '';
        modalImg.alt = title;
        modalImg.src = imgPath;
        modalImg.onerror = () => {
          if (modalImg.src !== fallbackProductImage) modalImg.src = fallbackProductImage;
        };
        if (selectedColor !== 'Padrão') applyColorToProductImage(modalImg, selectedColor, card);

        const modalColors = getProductColorOptions(card);
        const modalColorPicker = document.getElementById('modalColorPicker');
        renderColorPicker(modalColorPicker, modalColors, selectedColor);
        const modalVariantPicker = document.getElementById('modalVariantPicker');
        const modalVariantSelect = document.getElementById('modalVariantSelect');
        modalVariantPicker.hidden = !selectedVariant;
        modal.dataset.variant = selectedVariant?.label || '';
        modal.dataset.variantLabel = card.dataset.variantLabel || '';
        if (selectedVariant) {
          modalVariantPicker.firstChild.textContent = card.dataset.variantLabel || 'Opção';
          renderVariantOptions(modalVariantSelect, getProductVariantOptions(card), selectedVariant.value);
        }
        modal.classList.add('active');
      });
    });
  });

  const modalHTML = `
    <div class="modal-overlay" id="productModal">
      <div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <button class="modal-close" id="modalClose" aria-label="Fechar modal">&times;</button>
        <div class="modal-body">
          <img src="" alt="" class="modal-img" id="modalImg">
          <div class="modal-details">
            <span class="product-category" id="modalCategory"></span>
            <h2 id="modalTitle"></h2>
            <p id="modalDesc" style="font-size: 0.9rem; color: var(--text-muted);"></p>
            <div class="modal-color-panel">
              <span class="color-picker-label">Cores disponíveis</span>
              <div class="modal-color-picker" id="modalColorPicker"></div>
            </div>
            <label class="modal-variant-picker" id="modalVariantPicker" hidden>
              Opção
              <select id="modalVariantSelect" aria-label="Selecionar opção do produto"></select>
            </label>
            <h3 id="modalPrice" style="color: var(--primary); margin-top: 10px;"></h3>
            <button class="btn-add-cart" style="margin-top: 15px; width: 100%; justify-content: center;">
              <i class="fa-solid fa-cart-plus"></i> Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);

  const cartHTML = `
    <div class="modal-overlay" id="cartModal">
      <section class="cart-content" role="dialog" aria-modal="true" aria-labelledby="cartTitle">
        <button class="modal-close" id="cartClose" type="button" aria-label="Fechar carrinho">&times;</button>
        <h2 id="cartTitle">Meu carrinho</h2>
        <div class="cart-items" id="cartItems"></div>
        <div class="cart-summary"><span>Subtotal</span><span id="cartSubtotal">R$ 0,00</span></div>
        <button class="cart-checkout" id="cartCheckout" type="button">
          <i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Finalizar pelo WhatsApp
        </button>
        <button class="cart-continue" id="cartContinue" type="button">Continuar comprando</button>
      </section>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', cartHTML);

  const modal = document.getElementById('productModal');
  const modalVariantSelect = document.getElementById('modalVariantSelect');
  const modalClose = document.getElementById('modalClose');
  const cartModal = document.getElementById('cartModal');
  const cartList = document.getElementById('cartItems');
  const cartSubtotal = document.getElementById('cartSubtotal');

  const getPriceValue = (price) => Number(String(price).replace(/[^\d,]/g, '').replace(',', '.')) || 0;

  modalVariantSelect.addEventListener('change', () => {
    const matchingCard = Array.from(document.querySelectorAll('.product-card')).find((card) => {
      return normalizeProductKey(card.dataset.title) === modal.dataset.productKey;
    });
    if (!matchingCard) return;

    updateProductVariant(matchingCard, modalVariantSelect.value);
  });

  const renderCart = () => {
    cartList.replaceChildren();

    if (!cartItems.length) {
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'cart-empty';
      emptyMessage.textContent = 'Seu carrinho está vazio.';
      cartList.appendChild(emptyMessage);
    }

    cartItems.forEach((item, index) => {
      const row = document.createElement('article');
      row.className = 'cart-item';

      const image = document.createElement('img');
      image.src = item.image || fallbackProductImage;
      image.alt = '';
      image.onerror = () => {
        if (image.src !== fallbackProductImage) image.src = fallbackProductImage;
      };

      const details = document.createElement('div');
      const title = document.createElement('span');
      title.className = 'cart-item-title';
      title.textContent = item.title;
      const color = document.createElement('span');
      color.className = 'cart-item-color';
      color.textContent = `Cor: ${item.color}`;
      const variant = document.createElement('span');
      variant.className = 'cart-item-color';
      variant.textContent = `${item.variantLabel || (item.size ? 'Tamanho' : 'Formato')}: ${item.variant || item.size}`;
      const controls = document.createElement('div');
      controls.className = 'cart-item-controls';

      const createCartButton = (action, label, text, className = '') => {
        const button = document.createElement('button');
        button.type = 'button';
        button.dataset.cartAction = action;
        button.dataset.cartIndex = index;
        button.setAttribute('aria-label', label);
        button.textContent = text;
        if (className) button.classList.add(className);
        return button;
      };

      controls.append(
        createCartButton('decrease', 'Diminuir quantidade', '−'),
        Object.assign(document.createElement('span'), { textContent: item.quantity }),
        createCartButton('increase', 'Aumentar quantidade', '+'),
        createCartButton('remove', `Remover ${item.title}`, '×', 'cart-remove')
      );
      details.append(title);
      if (item.color && item.color !== 'Padrão') details.append(color);
      if (item.variant || item.size) details.append(variant);
      details.append(controls);

      const price = document.createElement('span');
      price.className = 'cart-item-price';
      price.textContent = formatCurrency(getPriceValue(item.price) * item.quantity);
      row.append(image, details, price);
      cartList.appendChild(row);
    });

    const subtotal = cartItems.reduce((total, item) => total + getPriceValue(item.price) * item.quantity, 0);
    cartSubtotal.textContent = formatCurrency(subtotal);
    document.getElementById('cartCheckout').disabled = cartItems.length === 0;
    updateCartCount();
  };

  document.querySelector('.cart-btn').addEventListener('click', () => {
    renderCart();
    cartModal.classList.add('active');
  });

  modalClose.addEventListener('click', () => modal.classList.remove('active'));
  document.getElementById('cartClose').addEventListener('click', () => cartModal.classList.remove('active'));
  document.getElementById('cartContinue').addEventListener('click', () => cartModal.classList.remove('active'));
  document.getElementById('cartCheckout').addEventListener('click', () => {
    if (!cartItems.length) return;

    const subtotal = cartItems.reduce((total, item) => total + getPriceValue(item.price) * item.quantity, 0);
    const orderLines = cartItems.map((item) => {
      const unitPrice = formatCurrency(getPriceValue(item.price));
      const itemTotal = formatCurrency(getPriceValue(item.price) * item.quantity);
      const variants = [
        item.color && item.color !== 'Padrão' ? `  Cor: ${item.color}` : '',
        item.variant || item.size ? `  ${item.variantLabel || (item.size ? 'Tamanho' : 'Formato')}: ${item.variant || item.size}` : ''
      ].filter(Boolean);
      return [`- ${item.title}`, ...variants, `  Quantidade: ${item.quantity}`, `  Unitário: ${unitPrice} | Total: ${itemTotal}`].join('\n');
    });
    const message = [
      'Olá! Gostaria de finalizar este pedido:',
      '',
      ...orderLines,
      '',
      `Total dos produtos: ${formatCurrency(subtotal)}`,
      '(Frete a combinar)'
    ].join('\n');
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.classList.remove('active');
  });
  cartModal.addEventListener('click', (event) => {
    if (event.target === cartModal) cartModal.classList.remove('active');
  });

  document.addEventListener('click', (event) => {
    const cartAction = event.target.closest('[data-cart-action]');
    if (cartAction) {
      const index = Number(cartAction.dataset.cartIndex);
      const action = cartAction.dataset.cartAction;
      if (action === 'increase') cartItems[index].quantity += 1;
      if (action === 'decrease') {
        cartItems[index].quantity -= 1;
        if (cartItems[index].quantity <= 0) cartItems.splice(index, 1);
      }
      if (action === 'remove') cartItems.splice(index, 1);
      renderCart();
      return;
    }

    const addButton = event.target.closest('.btn-add-cart');
    if (!addButton) return;

    event.stopPropagation();
    const productCard = addButton.closest('.product-card');
    const productData = productCard || modal;
    const title = productData.dataset.title;
    const color = productCard?.dataset.selectedColor || productData.dataset.color || 'Padrão';
    const price = productData.dataset.price;
    if (!title || !price) return;
    const variantOption = productCard ? getSelectedVariantOption(productCard) : null;
    const variant = variantOption?.label || productData.dataset.variant || '';
    const variantLabel = productCard?.dataset.variantLabel || productData.dataset.variantLabel || '';
    const image = productCard?.dataset.selectedVariantImage || productCard?.querySelector('img')?.src || productData.dataset.image || fallbackProductImage;
    const existingItem = cartItems.find((item) => item.title === title && item.color === color && (item.variant || item.size || '') === variant);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({ title, color, variant, variantLabel, price, image, quantity: 1 });
    }

    renderCart();
    if (!productCard) {
      modal.classList.remove('active');
      cartModal.classList.add('active');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      modal.classList.remove('active');
      cartModal.classList.remove('active');
      closeCategoryMenu();
      closeMobileMenu();
    }
  });

  renderCart();

  // Newsletter (por enquanto só mostra a confirmação; falta ligar a um serviço de e-mail)
  const newsletterForm = document.getElementById('newsletterForm');
  const newsletterMsg = document.getElementById('newsletterMsg');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (event) => {
      event.preventDefault();
      newsletterMsg.textContent = 'Obrigado! Você receberá nossas novidades.';
      newsletterForm.reset();
    });
  }
});