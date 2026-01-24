import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { renderPrice } from '@/utils/convertToLocale';
import { Button } from '../ui/button';
import { Edit, Trash } from 'lucide-react';

const defaultProductImage = 'https://menstrupedia.com/blog/wp-content/themes/koji/assets/images/default-fallback-image.png';

const AdminProductTile = ({
    product,
    setCurrentEditingProductId,
    setOpenCreateProductSheet,
    setFormData,
    setProductIdToDelete,
    setAlertDialog
}) => {

    const handleOnEdit = (product) => {
        setCurrentEditingProductId(product._id)
        setOpenCreateProductSheet(true);
        setFormData(product);
    };

    const handleOnDelete = (product) => {
        setProductIdToDelete(product._id);
        setAlertDialog(true);
    }

    return (
        <>
            <Card key={product._id} className={"w-full max-w-sm mx-auto overflow-hidden pt-0"}>
                <div className='relative'>
                    <img
                        src={product?.image || defaultProductImage}
                        alt={product?.title || 'Product Image'}
                        className='w-full h-75 object-cover'
                    />
                </div>
                <CardContent>
                    <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${product?.salePrice > 0 ? 'line-through  text-red-500' : ''} text-lg font-semibold text-primary`}>
                            {renderPrice(product?.price)}
                        </span>
                        {
                            product?.salePrice > 0 && (
                                <span className='text-lg font-bold text-primary'>
                                    {renderPrice(product?.salePrice)}
                                </span>
                            )
                        }
                    </div>
                </CardContent>
                <CardFooter className={"flex justify-between items-center"}>
                    <Button onClick={() => handleOnEdit(product)}><Edit /></Button>
                    <Button onClick={() => handleOnDelete(product)} variant="destructive"><Trash /></Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default AdminProductTile;
