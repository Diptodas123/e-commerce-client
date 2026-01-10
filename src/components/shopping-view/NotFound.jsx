const ProductsNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center py-16 px-4'>
            <svg
                className='w-24 h-24 text-muted-foreground mb-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
            >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={1.5}
                    d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4'
                />
            </svg>
            <h3 className='text-xl font-semibold text-foreground mb-2'>No Products Found</h3>
            <p className='text-muted-foreground text-center max-w-md'>
                We couldn't find any products matching your criteria. Try adjusting your filters or check back later.
            </p>
        </div>
    )
}

export default ProductsNotFound;
