import ProductFilter from '@/components/shopping-view/Filter';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { sortOptions } from '@/config';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/ProductTile';
import ProductsNotFound from '@/components/shopping-view/NotFound';
import { useSearchParams, useLocation } from 'react-router-dom';
import { createSearchParamsHelper } from '@/utils/queryParams';
import ProductDetailsDialog from '@/components/shopping-view/ProductDetails';
import useProductActions from '@/hooks/useProductActions';

const ShoppingListing = () => {

  const dispatch = useDispatch();

  // Products from the store
  const { productList, isLoading } = useSelector(state => state.shopProducts);

  const {
    handleAddToCart,
    handleGetProductDetails,
    openProductDetailsDialog,
    setOpenProductDetailsDialog,
    productDetails,
  } = useProductActions();

  const location = useLocation();

  // Filter and Sort State
  const [filters, setFilters] = useState(() => JSON.parse(sessionStorage.getItem('filters')) || {});

  const [sort, setSort] = useState(sortOptions[0].id);

  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();

  // Handle Sort Change
  const handleSortChange = (value) => setSort(value);

  // Handle Filter Change
  const handleFilterChange = (getSectionId, getCurrentOption) => {

    // Create a copy of the current filters state
    let copyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(copyFilters).indexOf(getSectionId);

    // If section does not exist, create it else update the existing section
    if (indexOfCurrentSection === -1) {
      copyFilters = {
        ...copyFilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = copyFilters[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOption);
      } else {  // Remove the option that is already selected(toggle)
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
        if (copyFilters[getSectionId].length === 0) {
          delete copyFilters[getSectionId];
        }
      }
    }

    setFilters(copyFilters);
    // Persist filters to session storage so that it remains on page reload
    sessionStorage.setItem('filters', JSON.stringify(copyFilters));
  };

  // Load filters from sessionStorage when navigating (location.key changes)
  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem('filters')) || {};
    // Only update if different to avoid unnecessary re-renders
    if (JSON.stringify(storedFilters) !== JSON.stringify(filters)) {
      setFilters(storedFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  // Fetch Products on filters change
  useEffect(() => {
    dispatch(fetchAllFilteredProducts({ filterParams: filters, sortParams: sort }));
  }, [dispatch, filters, sort]);

  // Update URL search params on filter changes
  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      const params = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(params));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilterChange={handleFilterChange} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className='flex items-center gap-2'>
            <span className='text-muted-foreground'>
              {productList?.length} Product(s) Found
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className={"flex items-center gap-1"}>
                <ArrowUpDown className='h-4 w-4' />
                <span>Sort by</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className={"w-50"}>
              <DropdownMenuRadioGroup value={sort} onValueChange={handleSortChange}>
                {
                  sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.id}
                      value={option.id}
                      className={"cursor-pointer"}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {
          isLoading ? (
            <div className='flex flex-col items-center justify-center min-h-100 gap-4'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary'></div>
              <p className='text-lg text-muted-foreground'>Loading products...</p>
              <p className='text-sm text-muted-foreground'>Please wait while we fetch the latest items</p>
            </div>
          ) :
            productList?.length > 0 ?
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-4'>
                {
                  productList.map(product =>
                    <ShoppingProductTile
                      key={product?._id}
                      product={product}
                      handleGetProductDetails={handleGetProductDetails}
                      handleAddToCart={handleAddToCart}
                    />)
                }
              </div> :
              <div>
                <ProductsNotFound />
              </div>
        }
      </div>
      <ProductDetailsDialog
        open={openProductDetailsDialog}
        setOpen={setOpenProductDetailsDialog}
        productDetails={productDetails}
        handleAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default ShoppingListing;
