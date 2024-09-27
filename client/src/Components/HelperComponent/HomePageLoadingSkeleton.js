import { memo } from "react";

const HomePageLoadingSkeleton = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between mb-12">
                    <div className="md:w-2/3 mb-8 md:mb-0">
                        <div className="h-12 w-3/4 bg-gray-700 mb-4 rounded animate-pulse" />
                        <div className="h-4 w-full bg-gray-700 mb-2 rounded animate-pulse" />
                        <div className="h-4 w-5/6 bg-gray-700 mb-6 rounded animate-pulse" />
                        <div className="h-10 w-32 bg-blue-600 rounded animate-pulse" />
                    </div>
                    <div className="w-full md:w-1/3 aspect-square bg-gray-700 rounded animate-pulse" />
                </div>

                <div className="h-8 w-64 bg-gray-700 mb-6 mx-auto rounded animate-pulse" />
                <div className="h-4 w-full max-w-2xl bg-gray-700 mb-8 mx-auto rounded animate-pulse" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="bg-gray-800 p-6 rounded-lg">
                            <div className="h-12 w-12 bg-gray-700 rounded-full mb-4 animate-pulse" />
                            <div className="h-6 w-24 bg-gray-700 mb-2 rounded animate-pulse" />
                            <div className="h-4 w-full bg-gray-700 rounded animate-pulse" />
                            <div className="h-4 w-5/6 bg-gray-700 mt-2 rounded animate-pulse" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default memo(HomePageLoadingSkeleton);