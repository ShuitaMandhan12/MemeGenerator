import { Star } from 'lucide-react';

export default function MemeOfDayModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center mb-4">
          <Star className="text-yellow-500 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Meme of the Day!</h2>
        </div>
        
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex justify-center">
          <img 
            src="https://i.imgflip.com/30b1gx.jpg"  // Classic "Distracted Boyfriend"
            alt="Meme of the day" 
            className="max-h-64 rounded"
          />
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // This would set the meme image in parent component
              onClose();
            }}
            className="bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded transition-colors"
          >
            Use This Meme
          </button>
        </div>
      </div>
    </div>
  );
}