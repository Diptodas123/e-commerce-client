import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { XCircle, Loader2 } from "lucide-react";

const PaymentSuccess = () => {

  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [errorMessage, setErrorMessage] = useState('');
  const hasProcessedRef = useRef(false);

  useEffect(() => {
    if (hasProcessedRef.current) return;
    hasProcessedRef.current = true;
    
    // Get params from URL
    const urlParams = new URLSearchParams(window.location.search);
    const paymentId = urlParams.get('token');
    const payerId = urlParams.get('PayerID');

    // Clear URL parameters immediately
    window.history.replaceState({}, '', '/shop/payment-success');

    if (!payerId || !paymentId) {
      setTimeout(() => {
        setPaymentStatus('error');
        setErrorMessage('Invalid payment parameters');
      }, 0);
      return;
    }

    const orderId = JSON.parse(sessionStorage.getItem('currentOrderId'));

    dispatch(capturePayment({
      userId: user.id,
      paymentData: {
        paymentId,
        payerId,
        orderId
      }
    })).then((data) => {
      if (data?.payload?.status === 'success') {
        setPaymentStatus('success');
        sessionStorage.removeItem('currentOrderId');
      } else {
        setPaymentStatus('error');
        setErrorMessage(data?.payload?.message || 'Payment capture failed');
      }
    }).catch(() => {
      setPaymentStatus('error');
      setErrorMessage('An unexpected error occurred');
    });
  }, [dispatch, user.id]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-6 bg-linear-to-br from-gray-50 to-gray-100">
      <Card className="w-full max-w-lg shadow-2xl border-0">
        <CardHeader className="text-center p-8">
          {paymentStatus === 'processing' && (
            <>
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              </div>
              <CardTitle className="text-3xl font-bold mb-3">Processing Payment...</CardTitle>
              <p className="text-muted-foreground text-base">
                Please wait while we confirm your payment securely.
              </p>
            </>
          )}

          {paymentStatus === 'success' && (
            <>
              <div className="mx-auto mb-6">
                <img 
                  src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Partying%20Face.png" 
                  alt="Success" 
                  className="w-32 h-32 mx-auto"
                />
              </div>
              <CardTitle className="text-3xl font-bold mb-3 text-green-600">Payment Successful!</CardTitle>
              <p className="text-muted-foreground text-base mb-2">
                Your order has been confirmed successfully!
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Thank you for shopping with us. You'll receive a confirmation email shortly.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/shop/account')}
                  className="w-full h-11 text-base font-semibold"
                  size="lg"
                >
                  View My Orders
                </Button>
                <Button
                  onClick={() => navigate('/shop/home')}
                  variant="outline"
                  className="w-full h-11 text-base"
                  size="lg"
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}

          {paymentStatus === 'error' && (
            <>
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
              <CardTitle className="text-3xl font-bold mb-3 text-red-600">Payment Failed</CardTitle>
              <p className="text-muted-foreground text-base mb-6">
                {errorMessage || 'There was an error processing your payment. Please try again.'}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/shop/checkout')}
                  className="w-full h-11 text-base font-semibold"
                  size="lg"
                >
                  Try Again
                </Button>
                <Button
                  onClick={() => navigate('/shop/home')}
                  variant="outline"
                  className="w-full h-11 text-base"
                  size="lg"
                >
                  Back to Home
                </Button>
              </div>
            </>
          )}
        </CardHeader>
      </Card>
    </div>
  )
}

export default PaymentSuccess;
