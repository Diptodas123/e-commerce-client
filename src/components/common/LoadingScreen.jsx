import { Spinner } from "../ui/spinner";

 const LoadingScreen = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-background to-muted">
        <div className="relative">
            <Spinner className="size-12 text-primary" />
            <div className="absolute inset-0 animate-ping">
                <Spinner className="size-12 text-primary opacity-20" />
            </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground animate-pulse">
            Loading your experience...
        </p>
    </div>
);

export default LoadingScreen;
