import { Eye, EyeOff, Grid, Move, Zap } from 'lucide-react';

export default function LayerControls({
  layers,
  setLayers,
  activeLayer,
  setActiveLayer,
  showGrid,
  setShowGrid,
  snapEnabled,
  setSnapEnabled,
}) {
  const toggleVisibility = (id) => {
    setLayers(
      layers.map((layer) =>
        layer.id === id ? { ...layer, visible: !layer.visible } : layer
      )
    );
  };

  return (
    <div className="bg-white/90 rounded-lg p-3 shadow-lg backdrop-blur-sm space-y-3 w-full sm:w-60">
      {/* Canvas Tools */}
      <div className="flex space-x-2">
        <button
          onClick={() => setShowGrid(!showGrid)}
          className={`p-2 rounded-md ${
            showGrid ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-600'
          }`}
          title="Toggle Grid"
        >
          <Grid size={16} />
        </button>
        <button
          onClick={() => setSnapEnabled(!snapEnabled)}
          className={`p-2 rounded-md ${
            snapEnabled ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-600'
          }`}
          title="Snap to Grid"
        >
          <Zap size={16} />
        </button>
      </div>

      {/* Layer List */}
      <div className="space-y-2">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center p-2 rounded-md cursor-pointer ${
              activeLayer === layer.id ? 'bg-violet-100' : 'bg-gray-100'
            }`}
            onClick={() => setActiveLayer(layer.id)}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleVisibility(layer.id);
              }}
              className="p-1 text-gray-500 hover:text-gray-700 mr-2"
            >
              {layer.visible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
            <span className="text-sm flex-1">{layer.name}</span>
            <Move size={14} className="text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
}