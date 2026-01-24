import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CommonForm from "@/components/common/Form";
import { addressFormControls } from "@/config";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddress, editAddress, fetchAllAddresses } from "@/store/shop/address-slice";
import { toast } from "sonner";
import AddressCard from "./AddressCard";

const initialFormData = addressFormControls.reduce((acc, control) => {
  acc[control.name] = "";
  return acc;
}, {});

const Address = ({ setCurrentSelectedAddress }) => {

  const [formData, setFormData] = useState(initialFormData);
  const [currentEditAddressId, setCurrentEditAddressId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { addressList } = useSelector(state => state.address);

  const onAddAddress = (e) => {
    e.preventDefault();

    // Limit to maximum 3 addresses
    if (addressList.length >= 3) {
      toast.error("You can only add up to 3 addresses.", {
        position: "top-right",
      });
      setFormData(initialFormData);
      return;
    }

    dispatch(addAddress({ userId: user?.id, formData })).then(data => {
      if (data.payload?.status === "success") {
        setFormData(initialFormData);
        toast.success(data.payload?.message || "Address added successfully", {
          position: "top-right",
        });
      } else if (data.payload?.data?.errors) {
        // Combine all validation errors into one message
        const errorMessages = data.payload.data.errors
          .map(err => `${err.field}: ${err.message}`)
          .join('\n');
        toast.error(errorMessages, {
          position: "top-right",
          duration: 5000,
        });
      } else {
        toast.error(data.payload?.message || "Error adding address", {
          position: "top-right",
        });
      }
    });
  };

  const isFormValid = () => {
    return addressFormControls.every(control => {
      const value = formData[control.name];
      return control.name === "notes" || (value && value.trim() !== "");
    });
  };

  const handleOnDeleteAddress = (addressId) => {
    dispatch(deleteAddress({
      userId: user?.id,
      addressId
    })).then(data => {
      if (data.payload?.status === "success") {
        toast.success(data.payload?.message || "Address deleted successfully", {
          position: "top-right",
        });
      } else {
        toast.error(data.payload?.message || "Error deleting address", {
          position: "top-right",
        });
      }
    })
  }

  const handleOnEditAddress = (addressInfo) => {
    setCurrentEditAddressId(addressInfo?._id);
    setFormData({
      address: addressInfo?.address || "",
      city: addressInfo?.city || "",
      postalCode: addressInfo?.postalCode || "",
      country: addressInfo?.country || "",
      phone: addressInfo?.phone || "",
      notes: addressInfo?.notes || ""
    });
  }

  const onEditAddress = (e) => {
    e.preventDefault();
    dispatch(editAddress({
      userId: user?.id,
      addressId: currentEditAddressId,
      formData
    })).then(data => {
      if (data.payload?.status === "success") {
        toast.success(data.payload?.message || "Address edited successfully", {
          position: "top-right",
        });
        setCurrentEditAddressId(null);
        setFormData(initialFormData);
      } else if (data.payload?.data?.errors) {
        // Combine all validation errors into one message
        const errorMessages = data.payload.data.errors
          .map(err => `${err.field}: ${err.message}`)
          .join('\n');
        toast.error(errorMessages, {
          position: "top-right",
          duration: 5000,
        });
      } else {
        toast.error(data.payload?.message || "Error editing address", {
          position: "top-right",
        });
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllAddresses(user?.id));
  }, [user?.id, dispatch]);

  return (
    <Card>
      <div className="mb-3 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
        {
          addressList.length > 0 ?
            addressList.map(address => (
              <AddressCard
                key={address?._id}
                addressInfo={address}
                handleOnDeleteAddress={handleOnDeleteAddress}
                handleOnEditAddress={handleOnEditAddress}
                setCurrentSelectedAddress={setCurrentSelectedAddress}
              />
            )) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <svg
                  className="w-24 h-24 text-gray-300 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No Addresses Yet</h3>
                <p className="text-sm text-gray-500">Add your first address below to get started</p>
              </div>
            )
        }
      </div>
      <CardHeader>
        <CardTitle>{currentEditAddressId ? "Edit Address" : "Add New Address"}</CardTitle>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={currentEditAddressId ? onEditAddress : onAddAddress}
          buttonText={currentEditAddressId ? "Update" : "Add"}
          disableSubmitButton={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
}

export default Address;
