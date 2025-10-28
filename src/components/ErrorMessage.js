import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  return (
    <div className="max-w-3xl mx-auto mb-8 px-4">
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between gap-3 text-red-700">
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span className="text-sm sm:text-base">{message}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-100 rounded transition-colors"
            aria-label="Close error message"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;