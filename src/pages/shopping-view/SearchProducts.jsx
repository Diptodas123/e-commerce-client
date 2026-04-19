import ShoppingProductTile from "@/components/shopping-view/ProductTile";
import SearchIdleState from "@/components/shopping-view/SearchIdleState";
import SearchNoResults from "@/components/shopping-view/SearchNoResults";
import ProductDetailsDialog from "@/components/shopping-view/ProductDetails";
import { Input } from "@/components/ui/input";
import { getSearchResults, resetSearchResults } from "@/store/shop/search-slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import useProductActions from "@/hooks/useProductActions";

const SearchProducts = () => {
    // Search results from the store
    const { searchResults } = useSelector(state => state.search);
    const [keyword, setKeyword] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const {
        handleAddToCart,
        handleGetProductDetails,
        openProductDetailsDialog,
        setOpenProductDetailsDialog,
        productDetails,
    } = useProductActions();

    const isValidKeyword = () => {
        return keyword && keyword.trim() !== '' && keyword.length >= 3;
    }

    useEffect(() => {
        if (isValidKeyword()) {
            // Debounce search input by 1 second
            const timeoutId = setTimeout(() => {
                setSearchParams(new URLSearchParams(`keyword=${keyword}`));
                dispatch(getSearchResults(keyword));
            }, 1000);

            return () => clearTimeout(timeoutId);
        } else {
            setSearchParams(new URLSearchParams());
            dispatch(resetSearchResults());
        }
    }, [keyword, dispatch, setSearchParams]);

    return (
        <div className="container mx-auto md:px-6 px-4 py-8">
            <div className="flex justify-center mb-8">
                <div className="w-full flex items-center">
                    <Input
                        className="py-6"
                        placeholder="Search Products..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        name="keyword"
                    />
                </div>
            </div>
            {
                !isValidKeyword() ? (
                    <SearchIdleState onSuggestionClick={setKeyword} />
                ) : searchResults.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                        {searchResults.map(productItem =>
                            <ShoppingProductTile
                                key={productItem._id}
                                product={productItem}
                                handleGetProductDetails={handleGetProductDetails}
                                handleAddToCart={handleAddToCart}
                            />
                        )}
                    </div>
                ) : (
                    <SearchNoResults keyword={keyword} onClear={() => setKeyword('')} />
                )
            }
            <ProductDetailsDialog
                open={openProductDetailsDialog}
                setOpen={setOpenProductDetailsDialog}
                productDetails={productDetails}
                handleAddToCart={handleAddToCart}
            />
        </div>
    );
};

export default SearchProducts;