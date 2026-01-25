import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { renderDate, renderPrice } from "@/utils/convertToLocale";
import { Separator } from "@/components/ui/separator";
import CommonForm from "@/components/common/Form";
import { useState, useEffect } from "react";
import { orderStatusOptions } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { updateOrderStatus } from "@/store/admin/order-slice";
import { toast } from "sonner";

const AdminOrderDetailsView = ({ onClose }) => {

    const { orderDetails, isLoading } = useSelector(state => state.adminOrder);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        status: orderDetails?.orderStatus || orderStatusOptions[0].options[0].id
    });

    const handleUpdateOrderStatus = (e) => {
        e.preventDefault();
        dispatch(updateOrderStatus({
            id: orderDetails._id,
            status: formData.status
        })).then((data) => {
            if (data?.payload?.status === 'success') {
                toast.success(data.payload?.message || "Order status updated successfully", {
                    position: "top-right",
                });
                onClose();
            } else {
                toast.error(data.payload?.message || "Error updating order status", {
                    position: "top-right",
                });
            }
        });
    }

    useEffect(() => {
        if (orderDetails?.orderStatus) {
            // eslint-disable-next-line
            setFormData({ status: orderDetails.orderStatus });
        }
    }, [orderDetails?.orderStatus]);

    if (isLoading) {
        return (
            <DialogContent className={"sm:max-w-150"}>
                <div className="flex flex-col items-center justify-center py-16">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                    <p className="text-muted-foreground">Loading order details...</p>
                </div>
            </DialogContent>
        );
    }


    if (!orderDetails) {
        return (
            <DialogContent className={"sm:max-w-150"}>
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No order details available</p>
                </div>
            </DialogContent>
        );
    }

    return (
        <DialogContent className={"sm:max-w-150"}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <DialogHeader>
                        <DialogTitle className="text-lg font-semibold mt-5">Order Details</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">ID</p>
                        <Label>{orderDetails._id}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Date</p>
                        <Label>{renderDate(orderDetails.createdAt)}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Status</p>
                        <Badge className={`${orderDetails.orderStatus === "confirmed" ? "bg-green-500" : orderDetails.orderStatus === "cancelled" ? "bg-red-500" : "bg-black"}`}>
                            {orderDetails.orderStatus}
                        </Badge>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Price</p>
                        <Label>{renderPrice(orderDetails.totalAmount)}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Payment Method</p>
                        <Label>{renderPrice(orderDetails.paymentMethod)}</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Payment Status</p>
                        <Label>{renderPrice(orderDetails.paymentStatus)}</Label>
                    </div>
                </div>
            </div>
            <Separator />
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <div className="font-medium">Order Items</div>
                    <ul className="grid gap-3">
                        {orderDetails.cartItems?.map((item) => (
                            <li key={item.productId} className="flex items-center justify-between">
                                <span>{item.title} x {item.quantity}</span>
                                <span>{renderPrice(item.price * item.quantity)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <div className="font-medium">Shipping Details</div>
                    <div className="grid gap-0.5 text-muted-foreground">
                        <span>{orderDetails?.userId?.userName}</span>
                        <span>{orderDetails.addressInfo?.address}</span>
                        <span>{orderDetails.addressInfo?.city}</span>
                        <span>{orderDetails.addressInfo?.postalCode}</span>
                        <span>{orderDetails.addressInfo?.country}</span>
                        <span>{orderDetails.addressInfo?.phone}</span>
                        {orderDetails.addressInfo?.notes && <span>{orderDetails.addressInfo.notes}</span>}
                    </div>
                </div>
            </div>

            <div>
                <CommonForm
                    formControls={orderStatusOptions}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={"Update Order Status"}
                    onSubmit={handleUpdateOrderStatus}
                />
            </div>
        </DialogContent >
    )
}

export default AdminOrderDetailsView;
