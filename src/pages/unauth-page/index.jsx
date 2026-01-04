import React from 'react';

const UnauthorizedPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md text-center max-w-md">
                <img
                    src="https://cdni.iconscout.com/illustration/premium/thumb/403-error-illustration-download-in-svg-png-gif-file-formats--forbidden-access-denied-page-pack-user-interface-illustrations-6430773.png"
                    alt="Unauthorized Access"
                    className="w-64 h-64 mx-auto mb-6"
                />
                <h1 className="text-3xl font-bold mb-4 text-red-600">
                    Unauthorized Access
                </h1>
                <p className="mb-6 text-gray-700">
                    You do not have permission to view this page.
                </p>
                <a href="/shop/home">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                        Go to Home
                    </button>
                </a>
            </div>
        </div>
    )
}

export default UnauthorizedPage;