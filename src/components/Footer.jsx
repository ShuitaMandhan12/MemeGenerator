import { Download, Share2, Trash2, Plus } from 'lucide-react';

export default function Footer({ addText, deleteSelected, handleDownload, handleShare }) {
  return (
    <footer className="bg-white shadow-md-top px-6 py-3 flex justify-between items-center border-t">
      <div className="flex items-center space-x-3">
        <button
          onClick={deleteSelected}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <Trash2 size={16} className="mr-1" />
          Delete
        </button>
        <button
          onClick={addText}
          className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <Plus size={16} className="mr-1" />
          Add Text
        </button>
      </div>

      <div className="flex space-x-3">
        <button
          onClick={handleShare}
          className="flex items-center px-4 py-2 bg-violet-500 hover:bg-violet-600 text-white rounded-lg transition-colors"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
        >
          <Download className="mr-2 h-5 w-5" />
          Download
        </button>
      </div>
    </footer>
  );
}