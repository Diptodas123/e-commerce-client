import ProductFilter from '@/components/shopping-view/Filter';
import React, { useEffect } from 'react';
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
import { fetchAllFilteredProducts } from '@/store/shop/product-slice';
import ShoppingProductTile from '@/components/shopping-view/ProductTile';
import ProductsNotFound from '@/components/shopping-view/NotFound';

const ShoppingListing = () => {

  const dispatch = useDispatch();

  const { productList } = useSelector(state => state.shopProducts);

  useEffect(() => {
    dispatch(fetchAllFilteredProducts());
  }, [dispatch]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter />
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
              <DropdownMenuRadioGroup>
                {
                  sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
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
          productList?.length > 0 ?
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 p-4'>
              {
                productList.map(product => <ShoppingProductTile key={product?._id} product={product} />)
              }
            </div> :
            <div>
              <ProductsNotFound />
            </div>
        }
      </div>
    </div>
  )
}

export default ShoppingListing;
