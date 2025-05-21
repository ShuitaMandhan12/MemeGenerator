import { useState } from 'react';
import { Camera, Star, Move, Image as ImageIcon, Pen, Upload, Search } from 'lucide-react';

export default function Header({ toggleMemeOfDay }) {
  const [activeTool, setActiveTool] = useState('select');

  return (
    <header className="bg-white shadow-md px-4 py-2 border-b">
      {/* Larger Screens: Centered Tools */}
      <div className="hidden sm:flex items-center justify-between">
        {/* MemeGen Title */}
        <div className="flex items-center space-x-2">
          <Camera className="text-violet-500" />
          <h1 className="text-lg font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
            MemeGen
          </h1>
        </div>

        {/* Centered Editing Tools */}
        <div className="flex items-center space-x-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-1 rounded-md ${
                activeTool === 'select'
                  ? 'bg-violet-100 text-violet-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Spacing"
            >
              <Move size={18} />
            </button>
            <button
              onClick={() => setActiveTool('image')}
              className={`p-1 rounded-md ${
                activeTool === 'image'
                  ? 'bg-violet-100 text-violet-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Add Image"
            >
              <ImageIcon size={18} />
            </button>
            <button
              onClick={() => setActiveTool('draw')}
              className={`p-1 rounded-md ${
                activeTool === 'draw'
                  ? 'bg-violet-100 text-violet-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Draw"
            >
              <Pen size={18} />
            </button>
          </div>

          <button className="flex items-center px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            <Upload size={14} className="mr-1" />
            Upload
          </button>

          <div className="relative w-40">
            <Search
              size={16}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-2 py-1 text-sm border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>

        {/* Meme of the Day */}
        <button
          onClick={toggleMemeOfDay}
          className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-lg flex items-center hover:shadow-md transition-all"
        >
          <Star className="mr-1 h-4 w-4" />
          Meme of the Day
        </button>
      </div>

      {/* Small Screens: Two Rows */}
      <div className="sm:hidden">
        {/* First Row: MemeGen and Meme of the Day */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Camera className="text-violet-500" />
            <h1 className="text-lg font-bold bg-gradient-to-r from-violet-500 to-purple-500 bg-clip-text text-transparent">
              MemeGen
            </h1>
          </div>
          <button
            onClick={toggleMemeOfDay}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-3 py-1 rounded-lg flex items-center hover:shadow-md transition-all"
          >
            <Star className="mr-1 h-4 w-4" />
            Meme of the Day
          </button>
        </div>

        {/* Second Row: Editing Tools */}
        <div className="flex items-center justify-center space-x-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTool('select')}
              className={`p-1 rounded-md ${
                activeTool === 'select'
                  ? 'bg-violet-100 text-violet-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Spacing"
            >
              <Move size={18} />
            </button>
            <button
              onClick={() => setActiveTool('image')}
              className={`p-1 rounded-md ${
                activeTool === 'image'
                  ? 'bg-violet-100 text-violet-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Add Image"
            >
              <ImageIcon size={18} />
            </button>
            <button
              onClick={() => setActiveTool('draw')}
              className={`p-1 rounded-md ${
                activeTool === 'draw'
                  ? 'bg-violet-100 text-violet-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              title="Draw"
            >
              <Pen size={18} />
            </button>
          </div>

          <button className="flex items-center px-2 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
            <Upload size={14} className="mr-1" />
            Upload
          </button>

          <div className="relative w-40">
            <Search
              size={16}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-2 py-1 text-sm border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}