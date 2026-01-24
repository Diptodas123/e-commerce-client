export const renderPrice = (price) => {
    return price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });
};

export const renderDate = (date) => {    
    return new Date(date).toLocaleDateString()
};