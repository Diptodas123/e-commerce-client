import { Label } from '@/components/ui/label';
import React, { useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input';
import { FileIcon, UploadCloudIcon, XIcon } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from 'react-redux';

const ProductImageUpload = ({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    imageLoading,
    setImageLoading,
    imageLoadingState,
    setImageLoadingState,
}) => {

    const inputRef = useRef(null);

    const handleImageFileChange = (e) => {
        const selectedFile = e.target.files?.[0];

        // Update the image file state
        if (selectedFile) {
            setImageFile(selectedFile);
        }

    }

    const handleDragOver = (e) => {
        e.preventDefault();
    }

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files?.[0];

        // Update the image file state
        if (droppedFile) {
            setImageFile(droppedFile);
        }
    }

    const handleRemoveImage = () => {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    }

    const uploadedImageToCloudinary = async () => {
        setImageLoadingState(true);
        const data = new FormData();
        data.append('image', imageFile);

        try {
            const response = await axios.post(`http://localhost:3000/api/admin/products/upload-image`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response?.data?.status === 'success') {
                setUploadedImageUrl(response?.data?.data?.imageUrl);
            }
            toast.success("Image uploaded successfully", {
                position: "top-right",
            });
        } catch (error) {
            toast.error(error.response?.data?.message || "Image upload failed", {
                position: "top-right",
            });
        } finally {
            setImageLoadingState(false);
        }
    }

    useEffect(() => {
        if (imageFile && !uploadedImageUrl) {
            uploadedImageToCloudinary();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageFile]);


    return (
        <div className='w-full max-w-md mx-auto px-6'>
            <Label className='text-lg font-semibold mb-2 block'>
                Upload Product Images
            </Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className='cursor-pointer border-2 border-dashed border-gray-300 rounded-md p-3'
            >
                <Input
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    id="image-upload"
                    type="file"
                    className={"hidden"}
                />
                {
                    !imageFile ? (
                        <Label
                            htmlFor="image-upload"
                            className="cursor-pointer flex flex-col items-center justify-center h-32"
                        >
                            <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                            <span>Drag & drop or Click to upload image</span>
                        </Label>
                    ) : (
                        imageLoadingState ? (
                            <Skeleton className={'h-10 bg-gray-100'} />
                        ) : (
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <FileIcon className='w-8 text-primary mr-2 h-8' />
                                </div>
                                <p className='text-sm font-medium'>{imageFile.name}</p>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    className={"text-muted-foreground hover:text-foreground"}
                                    onClick={handleRemoveImage}>
                                    <XIcon className='w-4 h-4' />
                                    <span className='sr-only'>Remove image</span>
                                </Button>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    )
}

export default ProductImageUpload;