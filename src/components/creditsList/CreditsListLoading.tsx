export default async function CreditsListLoading() {
    return (
        <div className="shrink-0 w-[180px] bg-white/10 rounded-lg mb-2 overflow-hidden animate-pulse">
            <div className="overflow-hidden">
                <div className="aspect-[2/3] bg-gray-900 opacity-35"></div>
            </div>
            <div className="px-4 py-2">
                <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-700 rounded w-5/6"></div>
            </div>
        </div>
    );
}
