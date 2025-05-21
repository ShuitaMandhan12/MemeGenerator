// MemeControls.jsx
const TextControls = ({ options, setOptions }) => (
    <div className="space-y-4">
      <FontSelector 
        value={options.fontFamily} 
        onChange={f => setOptions({...options, fontFamily: f})}
      />
      <RangeInput
        label={`Size: ${options.size}px`}
        value={options.size}
        onChange={s => setOptions({...options, size: s})}
        min={20}
        max={80}
      />
      <ColorPicker 
        value={options.color}
        onChange={c => setOptions({...options, color: c})}
      />
    </div>
  );