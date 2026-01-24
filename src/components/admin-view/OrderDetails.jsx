import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { renderPrice } from "@/utils/convertToLocale";
import { Separator } from "../ui/separator";
import CommonForm from "../common/Form";
import { useState } from "react";
import { orderStatusOptions } from "@/config";

const initialFormData = {
    status: orderStatusOptions[0].options[0].id
};

const AdminOrderDetailsView = () => {

    const [formData, setFormData] = useState(initialFormData);

    const handleUpdateOrderStatus = (e) => {
        e.preventDefault();
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
                        <Label>123456</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Date</p>
                        <Label>2024-06-15</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Status</p>
                        <Label>Shipped</Label>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <p className="font-medium">Price</p>
                        <Label>{renderPrice(99.99)}</Label>
                    </div>
                </div>
                <Separator />
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Order Items</div>
                        <ul className="grid gap-3">
                            <li className="flex items-center justify-between">
                                <span> Product One</span>
                                <span>{renderPrice(49.99)}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="font-medium">Shipping Details</div>
                        <div className="grid gap-0.5 text-muted-foreground">
                            <span>John Doe</span>
                            <span>Address</span>
                            <span>City</span>
                            <span>Postal Code</span>
                            <span>Country</span>
                            <span>Phone</span>
                            <span>Notes</span>
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
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetailsView;
