import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { renderPrice } from '@/utils/renderPrice';
import { Button } from '@/components/ui/button';
import { brandOptionsMap, categoryOptionsMap } from '@/config';

const ShoppingProductTile = ({ product }) => {

    const isSalePriceAvailable = product.salePrice > 0;

    return (
        <Card className="w-full max-w-sm mx-auto pt-0 shadow-sm">
            <div>
                <div className='relative'>
                    <img
                        src={product.image}
                        alt={product.title}
                        className='w-full h-75 object-cover rounded-t-lg'
                    />
                    {isSalePriceAvailable ? (
                        <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white">
                            Sale
                        </Badge>
                    ) : null}
                </div>
                <CardContent className={"p-4"}>
                    <h2 className='text-xl font-bold mb-2'>{product.title}</h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span className='text-sm text-muted-foreground'>
                            {categoryOptionsMap[product.category]}
                        </span>
                        <span className='text-sm text-muted-foreground'>
                            {brandOptionsMap[product.brand]}
                        </span>
                    </div>
                    <div className='flex justify-between items-center mb-2'>
                        <span className={`${isSalePriceAvailable ? 'line-through' : ''} text-lg font-semibold text-primary`}>
                            {renderPrice(product.price)}
                        </span>
                        {
                            isSalePriceAvailable && (
                                <span className='text-lg font-semibold text-primary'>
                                    {renderPrice(product.salePrice)}
                                </span>)
                        }
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className={"w-full"}>
                        Add to cart
                    </Button>
                </CardFooter>
            </div>
        </Card>
    )
}

export default ShoppingProductTile;
