import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { renderPrice } from '@/utils/renderPrice';
import { Button } from '../ui/button';
import { Edit, Trash } from 'lucide-react';

const defaultProductImage = 'https://menstrupedia.com/blog/wp-content/themes/koji/assets/images/default-fallback-image.png';

const AdminProductTile = ({ product }) => {
    return (
        <Card className={"w-full max-w-sm mx-auto overflow-hidden pt-0"}>
            <div className='relative'>
                <img
                    src={product?.image || defaultProductImage}
                    alt={product?.title || 'Product Image'}
                    className='w-full h-75 object-cover'
                />
            </div>
            <CardContent className="pt-6">
                <h2 className='text-xl font-bold mb-2'>{product?.title}</h2>
                <div className='flex justify-between items-center mb-2'>
                    <span className={`${product?.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}>
                        {renderPrice(product?.price)}
                    </span>
                    {
                        product?.salePrice > 0 && (
                            <span className='text-lg font-bold text-green-600'>
                                {renderPrice(product?.salePrice)}
                            </span>
                        )
                    }
                </div>
            </CardContent>
            <CardFooter className={"flex justify-between items-center"}>
                <Button><Edit /></Button>
                <Button><Trash /></Button>
            </CardFooter>
        </Card>
    )
}

export default AdminProductTile;
