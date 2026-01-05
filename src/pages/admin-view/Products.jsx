import ProductImageUpload from '@/components/admin-view/ImageUpload';
import CommonForm from '@/components/common/Form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { useState } from 'react';

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

  // Disable submit button if required fields are missing
  const disableSubmitButton = !formData.image || !formData.title || !formData.description || !formData.price || !formData.category || !formData.brand || !formData.totalStock;

  const onSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  }

  return (
    <>
      <div className='mb-5 w-full flex justify-end'>
        <Button onClick={() => setOpenCreateProductSheet(true)}>Add New Product</Button>
      </div>
      <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>

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