import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { renderPrice } from '@/utils/convertToLocale';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { setProductDetails } from '@/store/shop/products-slice';

const ProductDetailsDialog = ({ open, setOpen, productDetails, handleAddToCart }) => {

    const dispath = useDispatch();

    const handleDialogClose = () => {
        setOpen(false);
        dispath(setProductDetails());
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
                                <StarIcon className='w-5 h-5 fill-primary' />
                                <StarIcon className='w-5 h-5 fill-primary' />
                                <StarIcon className='w-5 h-5 fill-primary' />
                                <StarIcon className='w-5 h-5 fill-primary' />
                                <StarIcon className='w-5 h-5 fill-primary' />
                            </div>
                            <span className='text-muted-foreground'>(4.5)</span>
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
                            <Button onClick={(e) => handleAddToCart(e, productDetails?._id)} className={"w-full"}>Add to Cart</Button>
                        </div>
                        <Separator />
                    </div>
                    <div className='flex-1 overflow-y-auto px-4 md:px-8'>
                        <h2 className='text-xl font-bold mb-4 sticky top-0 bg-background pb-2 z-10 -mx-4 md:-mx-8 px-4 md:px-8'>
                            Reviews
                        </h2>
                        <div className='space-y-6 pb-24'>
                            <div className='flex gap-4'>
                                <Avatar className={"w-10 h-10 border shrink-0"}>
                                    <AvatarFallback>DD</AvatarFallback>
                                </Avatar>
                                <div className='flex-1 space-y-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Dipto</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-muted-foreground text-sm'>
                                        This is an awesome product
                                    </p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <Avatar className={"w-10 h-10 border shrink-0"}>
                                    <AvatarFallback>DD</AvatarFallback>
                                </Avatar>
                                <div className='flex-1 space-y-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Dipto</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-muted-foreground text-sm'>
                                        This is an awesome product
                                    </p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <Avatar className={"w-10 h-10 border shrink-0"}>
                                    <AvatarFallback>DD</AvatarFallback>
                                </Avatar>
                                <div className='flex-1 space-y-1'>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-bold'>Dipto</h3>
                                    </div>
                                    <div className='flex items-center gap-0.5'>
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                        <StarIcon className='w-5 h-5 fill-primary' />
                                    </div>
                                    <p className='text-muted-foreground text-sm'>
                                        This is an awesome product
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className='mt-6 flex gap-2 sticky bottom-0 bg-background p-6 z-10 -mx-4 md:-mx-8 px-4 md:px-8'>
                            <Input placeholder="Write a review" />
                            <Button>Submit</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ProductDetailsDialog;
