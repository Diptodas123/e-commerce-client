import ProductImageUpload from '@/components/admin-view/ImageUpload';
import AdminProductTile from '@/components/admin-view/ProductTile';
import CommonForm from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { addProductFormElements } from '@/config';
import { addNewProduct, fetchAllProducts } from '@/store/admin/products-slice';
import { PackageX } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  price: '',
  category: '',
  brand: '',
  totalStock: '',
  salePrice: '',
};

const AdminProducts = () => {

  // State to manage Create Product Sheet
  const [openCreateProductSheet, setOpenCreateProductSheet] = useState(false);

  // Form state
  const [formData, setFormData] = useState(initialFormData);

  // Image upload state
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [imageLoadingState, setImageLoadingState] = useState(false);

  // products from redux store to display
  const { productList, isLoading } = useSelector(state => state.adminProducts);

  const dispatch = useDispatch();

  // Disable submit button if required fields are missing
  const disableSubmitButton = !uploadedImageUrl || !formData.title || !formData.description || !formData.price || !formData.category || !formData.brand || !formData.totalStock;

  const onSubmit = (e) => {
    e.preventDefault();

    // Dispatch action to add new product
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl
    })).then((data) => {
      if (data.payload?.status === "success") {
        // Refresh product list
        dispatch(fetchAllProducts());

        // Reset form and close sheet
        setFormData(initialFormData);
        setImageFile(null);
        setUploadedImageUrl('');
        setOpenCreateProductSheet(false);
        toast.success(data.payload?.message || "Product added successfully", {
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
        toast.error(data.payload?.message || "Failed to add product", {
          position: "top-right",
        });
      }
    });
  }

  // Fetch all products on component mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductSheet(true)}>Add New Product</Button>
      </div>
      {/* Products Grid to display all products */}
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
        {
          isLoading ? (
            <div className="col-span-full flex justify-center items-center min-h-100">
              <Spinner className="size-12 text-primary" />
            </div>
          ) : productList?.length > 0 ? (
            productList?.map(product =>
              <AdminProductTile key={product?._id} product={product} />
            )
          ) : (
            <div className="col-span-full flex flex-col justify-center items-center min-h-100 text-muted-foreground">
              <PackageX className="size-24 mb-4 opacity-20" />
              <p className="text-xl font-medium">
                No products found
              </p>
              <p className="text-sm mt-2">
                Click "Add New Product" to create your first product
              </p>
            </div>
          )
        }
      </div>
      <Sheet open={openCreateProductSheet} onOpenChange={(open) => setOpenCreateProductSheet(open)}>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle className={"border-b border-gray-300 p-2"}>
              Add New Product
            </SheetTitle>
          </SheetHeader>

          {/* Image upload section */}
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            imageLoading={imageLoading}
            setImageLoading={setImageLoading}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
          />

          {/* Product form */}
          <div className='p-6'>
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              disableSubmitButton={disableSubmitButton}
              buttonText={'Add'}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export default AdminProducts;