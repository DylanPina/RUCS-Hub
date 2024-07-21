import { LoadingSpinner } from "@/components/shadcn/ui/loading-spinner";

export default function LoadingTable() {
    return (
    <div className="flex justify-center">
        <LoadingSpinner className="mt-32" />
    </div>
    );
}