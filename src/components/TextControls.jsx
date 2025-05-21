import { useEffect } from 'react';
import { 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Minus, 
  Plus, 
  Palette, 
  Type, 
  Move, 
  Maximize2,
  TextCursorInput,
  Underline
} from 'lucide-react';

export default function TextControls({ 
  fabricCanvas,
  texts, 
  setTexts, 
  selectedTextId,
  activeLayer,
  setActiveLayer,
  layers,
  setLayers
}) {
  const colors = [
    '#ffffff', '#000000', '#ff0000', '#00ff00',
    '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
  ];

  const textAlignOptions = [
    { value: 'left', icon: <AlignLeft size={18} />, label: 'Left' },
    { value: 'center', icon: <AlignCenter size={18} />, label: 'Center' },
    { value: 'right', icon: <AlignRight size={18} />, label: 'Right' },
  ];

  const fonts = ['Impact', 'Arial', 'Comic Sans MS', 'Helvetica', 'Times New Roman'];

  const selectedText = texts.find((text) => text.id === selectedTextId);
   const [showAdvancedEffects, setShowAdvancedEffects] = useState(false);
  // Update fabric.js text object when properties change
  useEffect(() => {
    if (!fabricCanvas || !selectedText) return;

    const textObject = fabricCanvas.getObjects().find(obj => obj.id === selectedTextId);
    
    if (textObject) {
      textObject.set({
        text: selectedText.content,
        fontFamily: selectedText.fontFamily || 'Impact',
        fill: selectedText.textColor || '#ffffff',
        fontSize: selectedText.fontSize || 32,
        textAlign: selectedText.textAlign || 'center',
        fontWeight: selectedText.isBold ? 'bold' : 'normal',
        fontStyle: selectedText.isItalic ? 'italic' : 'normal',
        underline: selectedText.isUnderline || false,
        shadow: selectedText.shadow ? new fabric.Shadow({
          color: selectedText.shadowColor || 'rgba(0,0,0,0.8)',
          blur: selectedText.shadowBlur || 2,
          offsetX: selectedText.shadowOffsetX || 1,
          offsetY: selectedText.shadowOffsetY || 1
        }) : null,
        stroke: selectedText.strokeColor || '#000000',
        strokeWidth: selectedText.strokeWidth || 0
      });
      fabricCanvas.renderAll();
    }
  }, [selectedText, fabricCanvas, selectedTextId]);

  const updateText = (updates) => {
  const updatedTexts = texts.map(text => 
    text.id === selectedTextId ? { ...text, ...updates } : text
  );
  setTexts(updatedTexts);

    // Immediately update the canvas
  if (fabricCanvas && selectedTextId) {
    const textObject = fabricCanvas.getObjects().find(obj => obj.id === selectedTextId);
    if (textObject) {
      // textObject.set(updates);
      // fabricCanvas.renderAll();
const wasEditing = textObject.isEditing;
      
      textObject.set({
        ...updates,
        // Ensure shadow is properly constructed
        shadow: updates.shadow !== undefined 
          ? updates.shadow 
            ? new fabric.Shadow({
                color: updates.shadowColor || selectedText.shadowColor || 'rgba(0,0,0,0.8)',
                blur: updates.shadowBlur || selectedText.shadowBlur || 2,
                offsetX: updates.shadowOffsetX || selectedText.shadowOffsetX || 1,
                offsetY: updates.shadowOffsetY || selectedText.shadowOffsetY || 1,
              })
            : null
          : textObject.shadow
      });
      
      // Restore editing state if needed
      if (wasEditing) {
        textObject.enterEditing();
        textObject.selectAll();
      }
      
      fabricCanvas.renderAll();
    }
  }
};
  const handleLayerVisibility = () => {
    const newLayers = layers.map(layer => 
      layer.id === selectedTextId ? { ...layer, visible: !layer.visible } : layer
    );
    setLayers(newLayers);

    if (fabricCanvas) {
      const textObject = fabricCanvas.getObjects().find(obj => obj.id === selectedTextId);
      if (textObject) {
        textObject.set('visible', !textObject.visible);
        fabricCanvas.renderAll();
      }
    }
  };

  const focusTextObject = () => {
    if (fabricCanvas && selectedTextId) {
      const textObject = fabricCanvas.getObjects().find(obj => obj.id === selectedTextId);
      if (textObject) {
        fabricCanvas.setActiveObject(textObject);
        fabricCanvas.renderAll();
        setActiveLayer(selectedTextId);
      }
    }
  };

  const enterTextEditing = () => {
    if (fabricCanvas && selectedTextId) {
      const textObject = fabricCanvas.getObjects().find(obj => obj.id === selectedTextId);
      if (textObject && textObject.type === 'textbox') {
        textObject.enterEditing();
        textObject.selectAll();
        fabricCanvas.renderAll();
      }
    }
  };

  if (!texts || texts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        <Type className="mx-auto mb-2" size={24} />
        <p>No text layers available</p>
        <p className="text-xs mt-1">Click "+ Add Text" to create a new text layer</p>
      </div>
    );
  }

  if (!selectedText) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        <TextCursorInput className="mx-auto mb-2" size={24} />
        <p>Select a text layer to edit</p>
        <p className="text-xs mt-1">or click "+ Add Text" below</p>
      </div>
    );
  }

  return (
    <div className="space-y-5 p-4">
      {/* Text Layer Selection */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-800 capitalize">{selectedTextId} Text</h3>
        <div className="flex space-x-2">
          <button
            onClick={focusTextObject}
            className={`p-1.5 rounded ${activeLayer === selectedTextId ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
            title="Focus layer"
          >
            <Move size={16} />
          </button>
          <button
            onClick={handleLayerVisibility}
            className={`p-1.5 rounded ${
              layers.find(l => l.id === selectedTextId)?.visible 
                ? 'text-gray-500 hover:bg-gray-100' 
                : 'text-gray-300 hover:bg-gray-50'
            }`}
            title="Toggle visibility"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </div>

      {/* Text Content */}
      <div className="space-y-2">
        <textarea
          value={selectedText.content}
          onChange={(e) => updateText({ content: e.target.value })}
          onFocus={enterTextEditing}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400 resize-none"
          placeholder="Enter your text here..."
          rows={3}
        />
      </div>

      {/* Font Selection */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
        <div className="grid grid-cols-2 gap-2">
          {fonts.map(font => (
            <button
              key={font}
              onClick={() => updateText({ fontFamily: font })}
              className={`p-2 text-sm rounded border transition-colors ${
                selectedText.fontFamily === font
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:bg-gray-50 text-gray-700'
              }`}
              style={{ fontFamily: font }}
            >
              {font}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size: {selectedText.fontSize}px
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => updateText({ fontSize: Math.max(8, selectedText.fontSize - 2) })}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            disabled={selectedText.fontSize <= 8}
          >
            <Minus size={16} />
          </button>
          <input
            type="range"
            min="8"
            max="100"
            value={selectedText.fontSize}
            onChange={(e) => updateText({ fontSize: parseInt(e.target.value) })}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <button
            onClick={() => updateText({ fontSize: Math.min(100, selectedText.fontSize + 2) })}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
            disabled={selectedText.fontSize >= 100}
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Text Alignment */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Alignment</label>
        <div className="flex border rounded-md overflow-hidden">
          {textAlignOptions.map(align => (
            <button
              key={align.value}
              onClick={() => updateText({ textAlign: align.value })}
              className={`flex-1 py-2 flex items-center justify-center transition-colors ${
                selectedText.textAlign === align.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
              title={align.label}
            >
              {align.icon}
            </button>
          ))}
        </div>
      </div>

      {/* Text Styles */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => updateText({ isBold: !selectedText.isBold })}
            className={`p-2 rounded-md transition-colors ${
              selectedText.isBold
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => updateText({ isItalic: !selectedText.isItalic })}
            className={`p-2 rounded-md transition-colors ${
              selectedText.isItalic
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => updateText({ isUnderline: !selectedText.isUnderline })}
            className={`p-2 rounded-md transition-colors ${
              selectedText.isUnderline
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            title="Underline"
          >
            <Underline size={16} />
          </button>
        </div>
      </div>

      {/* Text Color */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
        <div className="flex flex-wrap gap-2">
          {colors.map(color => (
            <button
              key={color}
              onClick={() => updateText({ textColor: color })}
              className={`w-8 h-8 rounded-full transition-transform ${
                selectedText.textColor === color
                  ? 'ring-2 ring-offset-2 ring-blue-500 scale-110'
                  : 'hover:scale-105'
              }`}
              style={{ backgroundColor: color }}
              title={`Color ${color}`}
            />
          ))}
          <div className="relative w-8 h-8">
            <input
              type="color"
              value={selectedText.textColor || '#ffffff'}
              onChange={(e) => updateText({ textColor: e.target.value })}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="w-full h-full rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center"
              style={{ backgroundColor: selectedText.textColor || '#ffffff' }}
            >
              <Palette size={16} className="text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Text Outline */}
      {/* Advanced Effects Section */}
    <div className="space-y-2">
      <button
        onClick={() => setShowAdvancedEffects(!showAdvancedEffects)}
        className="w-full flex items-center justify-between py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-md"
      >
        <span className="font-medium">Advanced Effects</span>
        <ChevronDown size={16} className={`transition-transform ${showAdvancedEffects ? 'rotate-180' : ''}`} />
      </button>

      {showAdvancedEffects && (
        <div className="space-y-4 p-3 bg-gray-50 rounded-md">
          {/* Outline Controls */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Outline</label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={selectedText.strokeWidth || 0}
                  onChange={(e) => updateText({ strokeWidth: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
              <div className="relative w-6 h-6">
                <input
                  type="color"
                  value={selectedText.strokeColor || '#000000'}
                  onChange={(e) => updateText({ strokeColor: e.target.value })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div 
                  className="w-full h-full rounded-full border border-gray-300"
                  style={{ backgroundColor: selectedText.strokeColor || '#000000' }}
                />
              </div>
            </div>
          </div>

          {/* Shadow Controls */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Shadow</label>
              <Switch
                checked={selectedText.shadow || false}
                onChange={(checked) => updateText({ shadow: checked })}
                className={`${
                  selectedText.shadow ? 'bg-blue-500' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    selectedText.shadow ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
            </div>

            {selectedText.shadow && (
              <div className="space-y-3 pl-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Color:</span>
                  <div className="relative w-6 h-6">
                    <input
                      type="color"
                      value={selectedText.shadowColor || 'rgba(0,0,0,0.5)'}
                      onChange={(e) => updateText({ shadowColor: e.target.value })}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div 
                      className="w-full h-full rounded-full border border-gray-300"
                      style={{ backgroundColor: selectedText.shadowColor || 'rgba(0,0,0,0.5)' }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Blur:</span>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={selectedText.shadowBlur || 5}
                    onChange={(e) => updateText({ shadowBlur: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Offset X:</span>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={selectedText.shadowOffsetX || 2}
                    onChange={(e) => updateText({ shadowOffsetX: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Offset Y:</span>
                  <input
                    type="range"
                    min="-20"
                    max="20"
                    value={selectedText.shadowOffsetY || 2}
                    onChange={(e) => updateText({ shadowOffsetY: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Transform Controls */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Transform</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => updateText({ angle: (selectedText.angle || 0) - 15 })}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <RotateCcw size={16} />
              </button>
              <button
                onClick={() => updateText({ angle: (selectedText.angle || 0) + 15 })}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <RotateCw size={16} />
              </button>
              <button
                onClick={() => updateText({ scaleX: (selectedText.scaleX || 1) * -1 })}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <FlipHorizontal size={16} />
              </button>
              <button
                onClick={() => updateText({ scaleY: (selectedText.scaleY || 1) * -1 })}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                <FlipVertical size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
);
}