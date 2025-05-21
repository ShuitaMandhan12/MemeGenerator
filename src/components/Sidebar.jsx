import { useState, useEffect } from 'react';
import { 
  ChevronRight, ChevronLeft, Type, Image as ImageIcon, Smile,
  Move, Pencil, Maximize2, Palette, Sparkles, TextCursor,
  AlignLeft, AlignCenter, AlignRight, Crop, Layers, Sliders,
  Star, Search, Upload, Text as TextIcon, X, Plus, Minus, ImagePlus,
  RotateCcw, RotateCw, FlipHorizontal, FlipVertical, ChevronDown
} from 'lucide-react';

// Panel Components
function ColorPanel({ selectedText, updateText }) {
  const colors = [
    '#ffffff', '#000000', '#ff0000', '#00ff00', '#0000ff',
    '#ffff00', '#ff00ff', '#00ffff', '#ff9900', '#9900ff'
  ];

  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Text Color</h4>
      <div className="grid grid-cols-5 gap-2">
        {colors.map(color => (
          <button
            key={color}
            onClick={() => updateText({ textColor: color })}
            className={`w-8 h-8 rounded-full transition-transform ${
              selectedText?.textColor === color
                ? 'ring-2 ring-offset-2 ring-violet-500 scale-110'
                : 'hover:scale-105'
            }`}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      <div className="relative w-full h-10">
        <input
          type="color"
          value={selectedText?.textColor || '#ffffff'}
          onChange={(e) => updateText({ textColor: e.target.value })}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="w-full h-full rounded border border-gray-300 flex items-center justify-center text-sm"
          style={{ backgroundColor: selectedText?.textColor || '#ffffff' }}>
          Custom Color
        </div>
      </div>
    </div>
  );
}

function FontPanel({ selectedText, updateText }) {
  const fonts = ['Impact', 'Arial', 'Comic Sans MS', 'Helvetica', 'Times New Roman', 'Courier New'];

  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Font Family</h4>
      <div className="grid grid-cols-2 gap-2">
        {fonts.map(font => (
          <button
            key={font}
            onClick={() => updateText({ fontFamily: font })}
            className={`p-2 text-sm rounded border transition-colors ${
              selectedText?.fontFamily === font
                ? 'border-violet-500 bg-violet-50 text-violet-700'
                : 'border-gray-200 hover:bg-gray-50 text-gray-700'
            }`}
            style={{ fontFamily: font }}
          >
            {font}
          </button>
        ))}
      </div>
    </div>
  );
}

function SizePanel({ selectedText, updateText }) {
  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">
        Size: {selectedText?.fontSize || 32}px
      </h4>
      <div className="flex items-center gap-3">
        <button
          onClick={() => updateText({ fontSize: Math.max(8, (selectedText?.fontSize || 32) - 2) })}
          className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          disabled={(selectedText?.fontSize || 32) <= 8}
        >
          <Minus size={16} />
        </button>
        <input
          type="range"
          min="8"
          max="100"
          value={selectedText?.fontSize || 32}
          onChange={(e) => updateText({ fontSize: parseInt(e.target.value) })}
          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
        />
        <button
          onClick={() => updateText({ fontSize: Math.min(100, (selectedText?.fontSize || 32) + 2) })}
          className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
          disabled={(selectedText?.fontSize || 32) >= 100}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
}

function AlignmentPanel({ selectedText, updateText }) {
  const alignments = [
    { value: 'left', icon: <AlignLeft size={18} />, label: 'Left' },
    { value: 'center', icon: <AlignCenter size={18} />, label: 'Center' },
    { value: 'right', icon: <AlignRight size={18} />, label: 'Right' },
  ];

  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Alignment</h4>
      <div className="flex border rounded-md overflow-hidden">
        {alignments.map(align => (
          <button
            key={align.value}
            onClick={() => updateText({ textAlign: align.value })}
            className={`flex-1 py-2 flex items-center justify-center transition-colors ${
              selectedText?.textAlign === align.value
                ? 'bg-violet-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title={align.label}
          >
            {align.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

function OutlinePanel({ selectedText, updateText }) {
  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Outline</h4>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <input
            type="range"
            min="0"
            max="10"
            value={selectedText?.strokeWidth || 0}
            onChange={(e) => updateText({ strokeWidth: parseInt(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
          />
        </div>
        <div className="relative w-6 h-6">
          <input
            type="color"
            value={selectedText?.strokeColor || '#000000'}
            onChange={(e) => updateText({ strokeColor: e.target.value })}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div 
            className="w-full h-full rounded-full border border-gray-300"
            style={{ backgroundColor: selectedText?.strokeColor || '#000000' }}
          />
        </div>
      </div>
    </div>
  );
}

function ShadowPanel({ selectedText, updateText }) {
  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Shadow</h4>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm">Enabled</span>
          <button
            onClick={() => updateText({ shadow: !selectedText?.shadow })}
            className={`px-2 py-1 rounded text-xs ${
              selectedText?.shadow 
                ? 'bg-violet-500 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {selectedText?.shadow ? 'ON' : 'OFF'}
          </button>
        </div>
        
        {selectedText?.shadow && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-sm">Color:</span>
              <div className="relative w-6 h-6">
                <input
                  type="color"
                  value={selectedText?.shadowColor || 'rgba(0,0,0,0.5)'}
                  onChange={(e) => updateText({ shadowColor: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="w-full h-full rounded-full border border-gray-300"
                  style={{ backgroundColor: selectedText?.shadowColor || 'rgba(0,0,0,0.5)' }}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Blur: {selectedText?.shadowBlur || 2}</label>
              <input
                type="range"
                min="0"
                max="20"
                value={selectedText?.shadowBlur || 2}
                onChange={(e) => updateText({ shadowBlur: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Offset X: {selectedText?.shadowOffsetX || 1}</label>
              <input
                type="range"
                min="-20"
                max="20"
                value={selectedText?.shadowOffsetX || 1}
                onChange={(e) => updateText({ shadowOffsetX: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm">Offset Y: {selectedText?.shadowOffsetY || 1}</label>
              <input
                type="range"
                min="-20"
                max="20"
                value={selectedText?.shadowOffsetY || 1}
                onChange={(e) => updateText({ shadowOffsetY: parseInt(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-violet-500"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TransformPanel({ selectedText, updateText }) {
  return (
    <div className="p-3 space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Transform</h4>
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => updateText({ angle: (selectedText?.angle || 0) - 15 })}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={() => updateText({ angle: (selectedText?.angle || 0) + 15 })}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <RotateCw size={16} />
        </button>
        <button
          onClick={() => updateText({ scaleX: (selectedText?.scaleX || 1) * -1 })}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <FlipHorizontal size={16} />
        </button>
        <button
          onClick={() => updateText({ scaleY: (selectedText?.scaleY || 1) * -1 })}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
        >
          <FlipVertical size={16} />
        </button>
      </div>
    </div>
  );
}

function TemplatePanel({ searchQuery, onSelect }) {
  const [activeCategory, setActiveCategory] = useState('popular');
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(8);

  const categories = [
    { id: 'popular', icon: <Star size={16} />, label: 'Popular' },
    { id: 'recent', icon: <ImagePlus size={16} />, label: 'Recent' },
    { id: 'ai', icon: <Sliders size={16} />, label: 'AI' },
    { id: 'blank', icon: <Plus size={16} />, label: 'Blank' }
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

  const visibleTemplates = filteredTemplates.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading templates...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.id);
              setVisibleCount(8);
            }}
            className={`p-2 rounded-md flex items-center justify-center space-x-2 transition-colors ${
              activeCategory === category.id
                ? 'bg-violet-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>{category.icon}</span>
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <div className="grid grid-cols-2 gap-3 pr-2">
          {visibleTemplates.map(template => (
            <button
              key={template.id}
              onClick={() => onSelect(template)}
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
        
        {visibleCount < filteredTemplates.length && (
          <button
            onClick={loadMore}
            className="w-full mt-3 py-2 bg-violet-100 hover:bg-violet-200 text-violet-700 rounded-md transition-colors"
          >
            See More
          </button>
        )}
      </div>
    </div>
  );
}

function StickersPanel({ onSelect }) {
  const [activeCategory, setActiveCategory] = useState('emoji');
  
  const categories = [
    { id: 'emoji', label: 'Emoji' },
    { id: 'memes', label: 'Memes' },
    { id: 'shapes', label: 'Shapes' }
  ];

  const stickers = {
    emoji: [
      { icon: '😀', name: 'Grin' },
      { icon: '😂', name: 'Joy' },
      { icon: '🤣', name: 'ROFL' },
      { icon: '😍', name: 'Heart Eyes' },
      { icon: '🤔', name: 'Thinking' },
      { icon: '🙄', name: 'Eye Roll' },
      { icon: '😎', name: 'Cool' },
      { icon: '🥺', name: 'Pleading' }
    ],
    memes: [
      { icon: '🤷', name: 'Shrug' },
      { icon: '🙃', name: 'Upside Down' },
      { icon: '👀', name: 'Eyes' },
      { icon: '💀', name: 'Skull' },
      { icon: '🔥', name: 'Fire' },
      { icon: '✨', name: 'Sparkles' },
      { icon: '💯', name: '100' },
      { icon: '👌', name: 'OK' }
    ],
    shapes: [
      { icon: '⭐', name: 'Star' },
      { icon: '❤️', name: 'Heart' },
      { icon: '🔴', name: 'Circle' },
      { icon: '🟦', name: 'Square' },
      { icon: '🔶', name: 'Diamond' },
      { icon: '💠', name: 'Rhombus' },
      { icon: '⚪', name: 'Ring' },
      { icon: '⬛', name: 'Black Square' }
    ]
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`p-2 rounded-md flex items-center justify-center transition-colors ${
              activeCategory === category.id
                ? 'bg-violet-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="text-sm">{category.label}</span>
          </button>
        ))}
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <div className="grid grid-cols-4 gap-2">
          {stickers[activeCategory].map((sticker, index) => (
            <button
              key={index}
              onClick={() => onSelect(sticker)}
              className="aspect-square flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg hover:bg-violet-100 transition-colors"
            >
              <div className="text-2xl mb-1">{sticker.icon}</div>
              <span className="text-xs text-gray-600 truncate w-full">{sticker.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function TextControls({ 
  texts, 
  setTexts, 
  selectedTextId,
  activeLayer,
  setActiveLayer,
  layers,
  setLayers
}) {
  const selectedText = texts.find((text) => text.id === selectedTextId);

  const updateText = (updates) => {
    setTexts(texts.map(text => {
      if (text.id === selectedTextId) {
        return { ...text, ...updates };
      }
      return text;
    }));
  };

  if (!selectedText) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        <Type className="mx-auto mb-2" size={24} />
        <p>Select a text layer to edit</p>
        <p className="text-xs mt-1">or click "+ Add Text" below</p>
      </div>
    );
  }

  return (
    <div className="p-3">
      <textarea
        value={selectedText.content}
        onChange={(e) => updateText({ content: e.target.value })}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 text-gray-800 placeholder-gray-400 resize-none"
        placeholder="Enter your text here..."
        rows={3}
      />
    </div>
  );
}

export default function Sidebar({
  isCollapsed,
  toggleSidebar,
  selectedTab,
  setSelectedTab,
  texts,
  setTexts,
  selectedTextId,
  setMemeImage,
  canvasRef,
  handleImageUpload,
  fileInputRef,
  layers,
  setLayers,
  activeLayer,
  setActiveLayer,
  stickers,
  setStickers
}) {
  const [selectedTextTool, setSelectedTextTool] = useState('text');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeToolPanel, setActiveToolPanel] = useState(null);
  const [customImage, setCustomImage] = useState(null);

  const selectedText = texts.find(text => text.id === selectedTextId);

  const updateText = (updates) => {
    setTexts(texts.map(text => 
      text.id === selectedTextId ? { ...text, ...updates } : text
    ));
  };

  const textTools = [
    {
      group: 'Formatting',
      tools: [
        { id: 'font', icon: <TextIcon size={18} />, label: 'Font', panel: 'font' },
        { id: 'color', icon: <Palette size={18} />, label: 'Color', panel: 'color' },
        { id: 'align', icon: <AlignLeft size={18} />, label: 'Align', panel: 'align' },
        { id: 'size', icon: <Maximize2 size={18} />, label: 'Size', panel: 'size' }
      ]
    },
    {
      group: 'Effects',
      tools: [
        { id: 'outline', icon: <Crop size={18} />, label: 'Outline', panel: 'outline' },
        { id: 'shadow', icon: <Sparkles size={18} />, label: 'Shadow', panel: 'shadow' },
        { id: 'transform', icon: <Layers size={18} />, label: 'Transform', panel: 'transform' }
      ]
    }
  ];

  const handleToolClick = (tool) => {
    setSelectedTextTool(tool.id);
    setActiveToolPanel(tool.panel || null);

    if (tool.id === 'move' && canvasRef.current) {
      canvasRef.current.isDrawingMode = false;
      canvasRef.current.selection = true;
      canvasRef.current.renderAll();
    } else if (tool.id === 'edit' && canvasRef.current) {
      const activeObject = canvasRef.current.getActiveObject();
      if (activeObject?.type === 'textbox') {
        activeObject.enterEditing();
        canvasRef.current.renderAll();
      }
    }
  };

  const renderToolPanel = () => {
    switch (activeToolPanel) {
      case 'color':
        return <ColorPanel selectedText={selectedText} updateText={updateText} />;
      case 'font':
        return <FontPanel selectedText={selectedText} updateText={updateText} />;
      case 'size':
        return <SizePanel selectedText={selectedText} updateText={updateText} />;
      case 'align':
        return <AlignmentPanel selectedText={selectedText} updateText={updateText} />;
      case 'outline':
        return <OutlinePanel selectedText={selectedText} updateText={updateText} />;
      case 'shadow':
        return <ShadowPanel selectedText={selectedText} updateText={updateText} />;
      case 'transform':
        return <TransformPanel selectedText={selectedText} updateText={updateText} />;
      default:
        return null;
    }
  };

  const handleTemplateSelect = (template) => {
    setMemeImage(template.image);
  };

  const resetCanvas = () => {
    setMemeImage('');
    setCustomImage(null);
    setTexts([]);
    setStickers([]);
    setLayers([]);
    if (canvasRef.current) {
      canvasRef.current.clear();
      canvasRef.current.backgroundColor = '#ffffff';
      canvasRef.current.renderAll();
    }
  };

  const renderTabContent = () => {
    switch (selectedTab) {
      case 'text':
        return (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              {textTools.map(group => (
                <div key={group.group}>
                  <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    {group.group}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {group.tools.map(tool => (
                      <button
                        key={tool.id}
                        onClick={() => handleToolClick(tool)}
                        className={`p-2 rounded-md flex items-center space-x-2 transition-colors ${
                          selectedTextTool === tool.id
                            ? 'bg-violet-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <span>{tool.icon}</span>
                        <span className="text-sm">{tool.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {activeToolPanel && (
              <div className="border-t">
                {renderToolPanel()}
              </div>
            )}
          </div>
        );
        
      case 'images':
        return (
          <div className="space-y-4 h-full flex flex-col">
            <div className="p-3 pb-0">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <TemplatePanel 
                searchQuery={searchQuery}
                onSelect={handleTemplateSelect}
              />
            </div>
            
            <div className="p-3 border-t">
              <input
                type="file"
                ref={fileInputRef}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setCustomImage(event.target.result);
                      setMemeImage(event.target.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="w-full flex items-center justify-center py-2 bg-gray-100 hover:bg-violet-200 rounded-md text-gray-700 transition-colors mb-2 cursor-pointer"
              >
                <ImagePlus size={20} className="mr-1" />
                Upload Custom Image
              </label>
              
              <button
                onClick={resetCanvas}
                className="w-full flex items-center justify-center py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-gray-700 transition-colors"
              >
                <Plus size={16} className="mr-2" />
                Create Blank Canvas
              </button>
            </div>
          </div>
        );
        
      case 'stickers':
        return (
          <div className="h-full flex flex-col">
            <div className="flex-1 overflow-hidden p-3">
              <StickersPanel 
                onSelect={(sticker) => {
                  const newSticker = {
                    id: `sticker-${Date.now()}`,
                    content: sticker.icon,
                    left: 100,
                    top: 100,
                    fontSize: 40,
                    fontFamily: 'Arial'
                  };
                  
                  setStickers(prev => [...prev, newSticker]);
                  
                  setLayers(prev => [...prev, {
                    id: newSticker.id,
                    name: sticker.name || 'Sticker',
                    type: 'sticker',
                    visible: true,
                    zIndex: prev.length > 0 ? Math.max(...prev.map(l => l.zIndex)) + 1 : 1
                  }]);
                }}
              />
            </div>
            <div className="p-3 border-t">
              <button 
                className="w-full flex items-center justify-center py-2 bg-violet-100 hover:bg-violet-200 rounded-md text-violet-700 transition-colors"
                onClick={() => {
                  const url = prompt("Enter sticker image URL:");
                  if (url) {
                    const newSticker = {
                      id: `sticker-${Date.now()}`,
                      content: url,
                      left: 100,
                      top: 100,
                      scaleX: 1,
                      scaleY: 1,
                      angle: 0
                    };
                    
                    setStickers(prev => [...prev, newSticker]);
                    
                    setLayers(prev => [...prev, {
                      id: newSticker.id,
                      name: 'Custom Sticker',
                      type: 'sticker',
                      visible: true,
                      zIndex: prev.length > 0 ? Math.max(...prev.map(l => l.zIndex)) + 1 : 1
                    }]);
                  }
                }}
              >
                <Plus size={16} className="mr-2" />
                Add Custom Sticker
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-full">
      <div className="w-14 bg-gray-800 flex flex-col items-center py-3 space-y-4">
        <button 
          onClick={() => setSelectedTab('text')}
          className={`p-2 rounded-lg transition-all ${selectedTab === 'text' 
            ? 'bg-violet-600 text-white shadow-md' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
          title="Text"
        >
          <Type size={22} />
        </button>
        
        <button 
          onClick={() => setSelectedTab('images')}
          className={`p-2 rounded-lg transition-all ${selectedTab === 'images' 
            ? 'bg-violet-600 text-white shadow-md' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
          title="Images"
        >
          <ImageIcon size={22} />
        </button>
        
        <button 
          onClick={() => setSelectedTab('stickers')}
          className={`p-2 rounded-lg transition-all ${selectedTab === 'stickers' 
            ? 'bg-violet-600 text-white shadow-md' 
            : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
          title="Stickers"
        >
          <Smile size={22} />
        </button>
        
        <div className="border-t border-gray-700 w-8 mx-auto pt-3">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-colors"
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
      </div>
      
      {!isCollapsed && (
        <div className="w-64 bg-white flex flex-col border-l border-gray-200 h-full">
          <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <h3 className="font-semibold text-gray-800">
              {selectedTab === 'text' 
                ? 'Text Tools' 
                : selectedTab === 'images' 
                  ? 'Image Library' 
                  : 'Stickers'}
            </h3>
            <button 
              onClick={toggleSidebar}
              className="p-1 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden flex flex-col">
            {renderTabContent()}
          </div>
        </div>
      )}
    </div>
  );
}