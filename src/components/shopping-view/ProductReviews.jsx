import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import StarRating from '@/components/common/StarRating';
import { StarIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, getReviewsByProductId } from '@/store/shop/review-slice';
import { toast } from 'sonner';

const ProductReviews = ({ productId }) => {
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { reviews } = useSelector((state) => state.reviews);

    useEffect(() => {
        if (productId) {
            dispatch(getReviewsByProductId(productId));
        }
    }, [productId, dispatch]);

    const handleAddReview = () => {
        dispatch(addReview({
            productId,
            rating,
            userId: user.id,
            reviewText: reviewText.trim() ? reviewText : undefined,
        })).then((data) => {
            if (data?.payload?.status === 'success') {
                toast.success('Review added successfully', {
                    position: 'top-right'
                });
            } else {
                toast.error(data?.payload?.message || 'Failed to add review', {
                    position: 'top-right'
                });
            }
        }).finally(() => {
            setRating(0);
            setReviewText('');
        });
    };

    return (
        <>
            <div className='flex-1 overflow-y-auto px-4 md:px-8 py-4'>
                <h2 className='text-xl font-bold mb-4'>Reviews</h2>
                <div className='space-y-4'>
                    {reviews.length === 0 ? (
                        <p className='text-muted-foreground text-sm'>
                            No reviews yet. Be the first to review!
                        </p>
                    ) : (
                        reviews.map((review) => (
                            <div key={review._id} className='flex items-start gap-3'>
                                <Avatar className='w-9 h-9 border shrink-0'>
                                    <AvatarFallback>
                                        {review?.userName?.slice(0, 2).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div className='flex-1 space-y-1'>
                                    <h3
                                        className='font-semibold text-sm'>
                                        {review?.userName}
                                    </h3>
                                    <div className='flex items-center gap-0.5'>
                                        {[...Array(5)].map((_, index) => (
                                            <StarIcon
                                                key={index}
                                                className={`w-4 h-4 
                                                    ${index < review.rating
                                                        ? 'fill-primary text-primary'
                                                        : 'fill-muted text-muted'}`
                                                }
                                            />
                                        ))}
                                    </div>
                                    {review?.reviewText && (
                                        <p className='text-muted-foreground text-sm leading-relaxed'>
                                            {review.reviewText}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className='shrink-0 border-t px-4 md:px-8 py-4 flex flex-col gap-2'>
                <Label>Write a review</Label>
                <div className='flex gap-1'>
                    <StarRating rating={rating} handleRatingChange={setRating} />
                </div>
                <Input
                    name='reviewText'
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder='Write a review'
                />
                <Button disabled={rating === 0} onClick={handleAddReview}>
                    Submit
                </Button>
            </div>
        </>
    );
};

export default ProductReviews;
