import ProductImageUpload from '@/components/admin-view/ImageUpload';
import AdminProductTile from '@/components/admin-view/ProductTile';
import CommonForm from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Spinner } from '@/components/ui/spinner';
import { addProductFormElements } from '@/config';
import { addNewProduct, deleteProduct, editProduct, fetchAllProducts } from '@/store/admin/products-slice';
import { PackageX } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

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

  // Editing product state
  const [currentEditingProductId, setCurrentEditingProductId] = useState(null);

  // Delete product state
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [alertDialog, setAlertDialog] = useState(false);

  // products from redux store to display
  const { productList, isLoading } = useSelector(state => state.adminProducts);

  const dispatch = useDispatch();

  // Disable submit button if required fields are missing
  const disableSubmitButton = () => {
    // When adding new product, image is required
    if (!currentEditingProductId && !uploadedImageUrl) return true;

    // Check all required fields (except salePrice which is optional)
    return Object.keys(formData).some(key =>
      key !== 'salePrice' && key !== 'image' && formData[key] === ''
    );
  }

  const onSubmit = (e) => {
    e.preventDefault();

    // If editing an existing product
    if (currentEditingProductId) {
      // Dispatch action to edit product, on success the existing product in the list will be updated
      dispatch(editProduct({
        id: currentEditingProductId,
        formData
      })).then(data => {
        if (data.payload?.status === "success") {
          // Reset form and close sheet
          setFormData(initialFormData);
          setImageFile(null);
          setUploadedImageUrl('');
          setCurrentEditingProductId(null);
          setOpenCreateProductSheet(false);
          toast.success(data.payload?.message || "Product updated successfully", {
            position: "top-right"
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
          toast.error(data.payload?.message || "Failed to update product", {
            position: "top-right",
          });
        }
      });
    } else {
      // Dispatch action to add new product
      dispatch(addNewProduct({
        ...formData,
        image: uploadedImageUrl
      })).then((data) => {
        if (data.payload?.status === "success") {
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
  }

  // handle delete product
  const handleDeleteProduct = () => {
    dispatch(deleteProduct(productIdToDelete)).then(data => {
      // Get confirmation from alert if user really wants to delete the product
      if (data.payload?.status === "success") {
        toast.success(data.payload?.message || "Product deleted successfully", {
          position: "top-right"
        });
      } else {
        toast.error(data.payload?.message || "Failed to delete product", {
          position: "top-right"
        })
      }
    });
  }

  // Fetch all products on component mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <>
      <div className='mb-5 w-full flex justify-end border-b pb-3 gap-4 items-center'>
        <h3 className="mr-auto">All Products ({productList?.length || 0})</h3>
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
              <AdminProductTile
                key={product?._id}
                product={product}
                setCurrentEditingProductId={setCurrentEditingProductId}
                setOpenCreateProductSheet={setOpenCreateProductSheet}
                setFormData={setFormData}
                setProductIdToDelete={setProductIdToDelete}
                setAlertDialog={setAlertDialog}
              />
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
      <Sheet open={openCreateProductSheet} onOpenChange={(open) => {
        setOpenCreateProductSheet(open);
        setCurrentEditingProductId(null);
        setFormData(initialFormData);
        setImageFile(null);
        setUploadedImageUrl('');
      }}>
        <SheetContent side='right' className='overflow-auto'>
          <SheetHeader>
            <SheetTitle className={"border-b border-gray-300 p-2"}>
              {currentEditingProductId ? "Edit Product" : "Add New Product"}
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
            isEditMode={currentEditingProductId !== null}
          />

          {/* Product form */}
          <div className='p-6'>
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              disableSubmitButton={disableSubmitButton()}
              buttonText={currentEditingProductId ? 'Edit' : 'Add'}
            />
          </div>
        </SheetContent>
      </Sheet>
      <AlertDialog open={alertDialog} onOpenChange={(open) => {
        setAlertDialog(open);
        if (!open) setProductIdToDelete(null);
      }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              and remove it from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => {
              setAlertDialog(false);
              setProductIdToDelete(null);
            }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              handleDeleteProduct();
              setAlertDialog(false);
              setProductIdToDelete(null);
            }}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default AdminProducts;