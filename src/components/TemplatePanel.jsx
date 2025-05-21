import { useState, useEffect } from 'react';
import { Star, ImagePlus, Wand2, Search, Upload, Sliders } from 'lucide-react';

export default function TemplatePanel({ searchQuery, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'popular', icon: <Star size={16} />, label: 'Popular' },
    { id: 'recent', icon: <ImagePlus size={16} />, label: 'Recent' },
    { id: 'custom', icon: <Upload size={16} />, label: 'Custom' },
    { id: 'ai', icon: <Sliders size={16} />, label: 'AI' }
  ];

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.memegen.link/templates');
        if (!response.ok) {
          throw new Error('Failed to fetch templates');
        }
        const data = await response.json();
        const fetchedTemplates = data.map((template, index) => ({
          id: template.id,
          image: template.blank,
          name: template.name,
          category: categories[index % categories.length].id,
        }));
        setTemplates(fetchedTemplates);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const filteredTemplates = templates
    .filter(template => template.category === activeCategory)
    .filter(template => template.name.toLowerCase().includes(searchQuery.toLowerCase()));

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading templates...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      {/* Categories */}
      <div className="flex space-x-2 pb-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1.5 text-sm rounded-full flex items-center whitespace-nowrap ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.label}
            {category.count > 0 && (
              <span className="ml-2 bg-white bg-opacity-20 px-1.5 rounded-full text-xs">
                {category.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search Results Info */}
      {searchQuery && (
        <div className="text-sm text-gray-500">
          Showing {filteredTemplates.length} results for "{searchQuery}"
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredTemplates.map(template => (
          <button
            key={template.id}
            onClick={() => {onSelect(template);}}
            className="group relative aspect-[4/3] bg-gray-100 rounded-md overflow-hidden hover:ring-2 hover:ring-violet-500 transition-all"
            >
            <img 
              src={template.image} 
              alt={template.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x200?text=Template+Error';
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
            <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white text-sm truncate">{template.name}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}