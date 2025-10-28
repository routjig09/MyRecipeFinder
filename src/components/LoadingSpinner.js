import React from 'react';
import { Loader } from 'lucide-react';

const LoadingSpinner = ({ message = 'Finding delicious recipes...' }) => {
  return (
    <div className="text-center py-12">
      <Loader className="animate-spin mx-auto text-orange-500 mb-4" size={48} />
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  );
};

export default LoadingSpinner;