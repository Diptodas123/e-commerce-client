import ProductImageUpload from "@/components/admin-view/ImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImage, deleteFeatureImage, getFeatureImageList } from "@/store/common";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { ImageIcon, Loader2, Trash2 } from "lucide-react";

const AdminDashboard = () => {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(false);
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const dispatch = useDispatch();

    const { featureImageList, isLoading } = useSelector((state) => state.common);

    const handleFeatureImageUpload = () => {
        if (!uploadedImageUrl) return;
        setImageLoading(true);

        dispatch(addFeatureImage(uploadedImageUrl))
            .then(data => {
                if (data.payload?.status === "success") {
                    toast.success(data.payload?.message || "Feature image uploaded successfully", {
                        position: "top-right"
                    });
                    dispatch(getFeatureImageList());
                    setImageFile(null);
                    setUploadedImageUrl('');
                } else {
                    toast.error(data.payload?.message || "Failed to upload feature image", {
                        position: "top-right"
                    });
                }
            })
            .finally(() => {
                setImageLoading(false);
            });
    };

    const handleDeleteImage = (id) => {
        setDeletingId(id);
        dispatch(deleteFeatureImage(id))
            .then(data => {
                if (data.payload?.status === "success") {
                    toast.success("Banner image removed", { position: "top-right" });
                } else {
                    toast.error(data.payload?.message || "Failed to delete image", { position: "top-right" });
                }
            })
            .finally(() => setDeletingId(null));
    };

    useEffect(() => {
        dispatch(getFeatureImageList());
        return () => {
            setImageFile(null);
            setUploadedImageUrl('');
            setImageLoading(false);
            setImageLoadingState(false);
        };
    }, [dispatch]);

    const isProcessing = imageLoadingState;
    const isSaving = imageLoading;
    const isDisabled = !uploadedImageUrl || isProcessing || isSaving;

    const buttonLabel = isSaving
        ? "Saving..."
        : isProcessing
            ? "Processing image..."
            : "Add to Banner";

    return (
        <div className="py-6 px-4 lg:px-8">
            <div className="lg:grid lg:grid-cols-3 lg:gap-8">

                {/* Left panel — upload */}
                <div className="lg:col-span-1">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold">Feature Banner</h2>
                        <p className="text-sm text-muted-foreground mt-1">
                            Upload an image, wait for it to process, then click "Add to Banner".
                        </p>
                    </div>

                    <div className="rounded-xl border bg-card shadow-sm p-4">
                        <ProductImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl={setUploadedImageUrl}
                            imageLoading={imageLoading}
                            setImageLoading={setImageLoading}
                            imageLoadingState={imageLoadingState}
                            setImageLoadingState={setImageLoadingState}
                            isCustomStyling
                        />

                        <div className="px-6">
                            <Button
                                className="mt-4 w-full"
                                onClick={handleFeatureImageUpload}
                                disabled={isDisabled}
                            >
                                {(isProcessing || isSaving) && (
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                )}
                                {buttonLabel}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Right panel — banner list */}
                <div className="mt-10 lg:mt-0 lg:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Current Banner Images</h3>
                        {featureImageList?.length > 0 && (
                            <span className="text-sm text-muted-foreground">
                                {featureImageList.length} {featureImageList.length === 1 ? "image" : "images"}
                            </span>
                        )}
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                        </div>
                    ) : featureImageList?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
                            {featureImageList.map((img) => (
                                <div key={img._id} className="group relative rounded-xl overflow-hidden border shadow-sm">
                                    <img
                                        src={img.image}
                                        alt={`Feature Image ${img._id}`}
                                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => handleDeleteImage(img._id)}
                                            disabled={deletingId === img._id}
                                        >
                                            {deletingId === img._id
                                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                                : <><Trash2 className="w-4 h-4 mr-1" /> Remove</>
                                            }
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground border rounded-xl">
                            <ImageIcon className="w-10 h-10 mb-3 opacity-40" />
                            <p className="text-sm">No banner images yet. Upload one to get started.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;