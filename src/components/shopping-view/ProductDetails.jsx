import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { renderPrice } from '@/utils/convertToLocale';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDispatch, useSelector } from 'react-redux';
import { setProductDetails } from '@/store/shop/products-slice';
import ProductReviews from './ProductReviews';
import { StarIcon } from 'lucide-react';

const ProductDetailsDialog = ({ open, setOpen, productDetails, handleAddToCart }) => {

    const dispatch = useDispatch();
    const { averageRating, totalReviews } = useSelector((state) => state.reviews);

    const handleDialogClose = () => {
        setOpen(false);
        dispatch(setProductDetails());
    }

    if (!productDetails) return null;

    return (
        <Dialog open={open} onOpenChange={handleDialogClose}>
            <DialogContent className={"grid grid-cols-1 md:grid-cols-2 gap-0 p-2 max-w-[95vw] sm:max-w-3xl lg:max-w-4xl h-[85vh] overflow-hidden"}>
                <div className='relative overflow-hidden h-64 md:h-full rounded-l-lg'>
                    <img
                        src={productDetails?.image}
                        alt={productDetails?.title}
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='flex flex-col h-full overflow-hidden'>
                    <div className='p-4 md:p-8 space-y-4 md:space-y-6 shrink-0'>
                        <DialogTitle className='text-2xl md:text-3xl font-extrabold'>
                            {productDetails?.title}
                        </DialogTitle>
                        <p className='text-muted-foreground text-sm md:text-base leading-relaxed'>
                            {productDetails?.description}
                        </p>
                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-0.5'>
                                {[...Array(5)].map((_, index) => (
                                    <StarIcon
                                        key={index}
                                        className={`w-5 h-5 ${index < averageRating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'fill-muted text-muted'}`
                                        }
                                    />
                                ))}
                            </div>
                            <span className='text-muted-foreground text-sm'>
                                {averageRating} ({totalReviews} review{totalReviews !== 1 ? 's' : ''})
                            </span>
                        </div>
                        <div className='flex items-center gap-4'>
                            <p className={`${productDetails?.salePrice > 0 ?
                                'line-through text-muted-foreground text-lg md:text-xl' :
                                'text-2xl md:text-3xl font-bold text-primary'}`}
                            >
                                {renderPrice(productDetails?.price)}
                            </p>
                            {
                                productDetails?.salePrice > 0 ? (
                                    <p className='text-2xl md:text-3xl font-bold text-primary'>
                                        {renderPrice(productDetails?.salePrice)}
                                    </p>
                                ) : null
                            }
                        </div>
                        <div className='mt-5'>
                            <Button
                                onClick={(e) => handleAddToCart(e, productDetails?._id, productDetails?.totalStock)}
                                className={"w-full"}
                                disabled={!productDetails.totalStock}
                            >
                                {productDetails.totalStock ? "Add to Cart" : "Out of Stock"}
                            </Button>
                        </div>
                        <Separator />
                    </div>
                    <ProductReviews productId={productDetails._id} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog;
