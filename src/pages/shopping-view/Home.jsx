import { Button } from '@/components/ui/button';
import {
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Footprints,
  WatchIcon,
  Venus,
  Mars
} from 'lucide-react';
import bannerOne from '@/assets/banners/banner1.jpeg';
import bannerTwo from '@/assets/banners/banner2.jpeg';
import bannerThree from '@/assets/banners/banner3.jpeg';
import nike from '@/assets/brands/nike.png';
import puma from '@/assets/brands/puma.png';
import levi from '@/assets/brands/levi.png';
import underarmour from '@/assets/brands/underarmour.png';
import newbalance from '@/assets/brands/newbalance.png';
import hnm from '@/assets/brands/hnm.png';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts, fetchProductDetails } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/ProductTile';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { addToCart } from '@/store/shop/cart-slice';
import ProductDetailsDialog from '@/components/shopping-view/ProductDetails';

const categoriesWithIcon = [
  { id: 'men', label: "Men", icon: Mars },
  { id: 'women', label: "Women", icon: Venus },
  { id: 'kids', label: "Kids", icon: BabyIcon },
  { id: 'accessories', label: "Accessories", icon: WatchIcon },
  { id: 'footwear', label: "Footwear", icon: Footprints },
];

const brands = [
  { id: 'nike', label: "Nike", logo: nike },
  { id: 'puma', label: "Puma", logo: puma },
  { id: 'levi', label: "Levi's", logo: levi },
  { id: 'underarmour', label: "Under Armour", logo: underarmour },
  { id: 'newbalance', label: "New Balance", logo: newbalance },
  { id: 'h&m', label: "H&M", logo: hnm },
];

const slides = [bannerOne, bannerTwo, bannerThree];

const ShoppingHome = () => {

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state for products
  const { productList, productDetails } = useSelector(state => state.shopProducts);

  // User info from the store
  const { user } = useSelector(state => state.auth);

  // Product Details Dialog State
  const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);

  // Navigate to listing page with filters
  const handleNavigateToListingPageWithFilters = (getCurrentItem, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter));
    navigate('/shop/listing');
  }

  // Handle Get Product Details for a product
  const handleGetProductDetails = (productId) => {
    dispatch(fetchProductDetails(productId));
    setOpenProductDetailsDialog(true);
  }

  // Handle Add to Cart for a product
  const handleAddToCart = (e, productId) => {
    e.stopPropagation();
    dispatch(addToCart({ productId, userId: user.id, quantity: 1 })).then(data => {
      if (data.payload?.status === "success") {
        toast.success(data.payload?.message || "Product added to cart", {
          duration: 3000,
          position: 'top-right'
        });
      } else {
        toast.error(data.payload?.message || "Failed to add product to cart", {
          duration: 5000,
          position: 'top-right'
        });
      }
    });
  }


  // Auto slide effect
  useEffect(() => {
    const sliderInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);
    return () => clearInterval(sliderInterval);
  }, []);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: {}, sortParams: "price-lowtohigh" }));
  }, [dispatch]);

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='relative w-full h-150 overflow-hidden'>
        {
          slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="slide"
              className={`${index === currentSlide ? "opacity-100" : "opacity-0"} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              style={index === 1 ? { objectPosition: "center 20%" } : {}}
            />
          ))
        }
        <Button
          variant='outline'
          size='icon'
          className={"absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"}
          onClick={() => setCurrentSlide(prevSlide => (prevSlide - 1 + slides.length) % slides.length)}
        >
          <ChevronLeftIcon className='w-4 h-4' />
        </Button>
        <Button
          variant='outline'
          size='icon'
          onClick={() => setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length)}
          className={"absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"}
        >
          <ChevronRightIcon className='w-4 h-4' />
        </Button>
      </div>
      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Shop by category
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
            {categoriesWithIcon.map(categoryItem => (
              <Card
                onClick={() => handleNavigateToListingPageWithFilters(categoryItem.id, 'category')}
                key={categoryItem.id}
                className={"cursor-pointer hover:shadow-lg transition-shadow"}
              >
                <CardContent className={"flex flex-col items-center justify-center p-6"}>
                  <categoryItem.icon className='w-12 h-12 mb-4 text-primary' />
                  <span className='font-bold'>{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className='py-12'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Featured Products
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {productList.length === 0 ? (
              <p className='text-center col-span-full'>No products available.</p>
            ) : (
              productList.slice(0, 4).map(productItem => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  key={productItem?._id}
                  product={productItem}
                  handleAddToCart={handleAddToCart}
                />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='py-12 bg-gray-50'>
        <div className='container mx-auto px-4'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Shop by Brand
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
            {brands.map(brandItem => (
              <Card
                key={brandItem.id}
                className={"cursor-pointer hover:shadow-lg transition-shadow"}
                onClick={() => handleNavigateToListingPageWithFilters(brandItem.id, 'brand')}
              >
                <CardContent className={"flex flex-col items-center justify-center p-6"}>
                  <img src={brandItem.logo} alt={brandItem.label} className='w-20 h-20 mb-4 object-contain' />
                  <span className='font-bold'>{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section >
      <ProductDetailsDialog
        open={openProductDetailsDialog}
        setOpen={setOpenProductDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div >
  )
}

export default ShoppingHome;
