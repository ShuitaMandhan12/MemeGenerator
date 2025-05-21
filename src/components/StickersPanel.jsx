import { Smile, Heart, ThumbsUp, Flag, Ghost, Laugh, Angry, Meh, Plus } from 'lucide-react';
import { useState } from 'react';

export default function StickersPanel({ onSelect }) {
  const [activeCategory, setActiveCategory] = useState('emoji');
  
  const categories = [
    { id: 'emoji', label: 'Emoji' },
    { id: 'memes', label: 'Memes' },
    { id: 'shapes', label: 'Shapes' },
    { id: 'custom', label: 'Custom' }
  ];

  const stickers = {
    emoji: [
      { icon: <Smile size={24} />, name: 'Smile' },
      { icon: <Heart size={24} />, name: 'Heart' },
      { icon: <ThumbsUp size={24} />, name: 'Thumbs Up' },
      { icon: <Flag size={24} />, name: 'Flag' },
      { icon: <Ghost size={24} />, name: 'Ghost' },
      { icon: <Laugh size={24} />, name: 'Laugh' },
      { icon: <Angry size={24} />, name: 'Angry' },
      { icon: <Meh size={24} />, name: 'Meh' }
    ],
    memes: Array(8).fill().map((_, i) => ({
      icon: <div className="text-2xl">🤣</div>,
      name: `Meme ${i+1}`
    })),
    shapes: Array(8).fill().map((_, i) => ({
      icon: <div className="text-2xl">⭐</div>,
      name: `Shape ${i+1}`
    })),
    custom: Array(4).fill().map((_, i) => ({
      icon: <Plus size={24} className="text-gray-400" />,
      name: `Add Custom ${i+1}`
    }))
  };

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Stickers Grid */}
      <div className="grid grid-cols-4 gap-3">
        {stickers[activeCategory].map((sticker, index) => (
          <button
            key={index}
            onClick={() => onSelect(sticker)}
            className="aspect-square flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <div className="text-2xl mb-1">{sticker.icon}</div>
            <span className="text-xs text-gray-600 truncate w-full">{sticker.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}