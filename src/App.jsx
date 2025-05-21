import { useState, useRef, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Footer from './components/Footer';
import LayerControls from './components/LayerControls';

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedTab, setSelectedTab] = useState('text');
  const [texts, setTexts] = useState([
    {
      id: 'top',
      content: 'TOP TEXT',
      fontSize: 32,
      fontFamily: 'Impact',
      textAlign: 'center',
      isBold: false,
      isItalic: false,
      textColor: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 1,
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.8)',
      shadowBlur: 2,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      isUnderline: false,
      left: 'center',
      top: 20,
    },
    {
      id: 'bottom',
      content: 'BOTTOM TEXT',
      fontSize: 32,
      fontFamily: 'Impact',
      textAlign: 'center',
      isBold: false,
      isItalic: false,
      textColor: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 1,
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.8)',
      shadowBlur: 2,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      isUnderline: false,
      left: 'center',
      top: 'bottom',
    },
  ]);
  const [selectedTextId, setSelectedTextId] = useState('top');
  const [memeImage, setMemeImage] = useState('');
  const [showMemeOfDay, setShowMemeOfDay] = useState(false);
  const [layers, setLayers] = useState([
    { id: 'top', name: 'Top Text', visible: true, type: 'text' },
    { id: 'bottom', name: 'Bottom Text', visible: true, type: 'text' },
  ]);
  const [activeLayer, setActiveLayer] = useState('top');
  const [showGrid, setShowGrid] = useState(false);
  const [snapEnabled, setSnapEnabled] = useState(true);
  const [stickers, setStickers] = useState([]);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMemeImage(e.target.result);
        const newLayer = {
          id: `image-${Date.now()}`,
          name: 'Background Image',
          visible: true,
          type: 'image',
        };
        setLayers((prev) => [...prev, newLayer]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addText = useCallback(() => {
    const newId = `text-${Date.now()}`;
    const newText = {
      id: newId,
      content: 'NEW TEXT',
      fontSize: 32,
      fontFamily: 'Impact',
      textAlign: 'center',
      isBold: false,
      isItalic: false,
      textColor: '#ffffff',
      strokeColor: '#000000',
      strokeWidth: 1,
      shadow: true,
      shadowColor: 'rgba(0,0,0,0.8)',
      shadowBlur: 2,
      shadowOffsetX: 1,
      shadowOffsetY: 1,
      isUnderline: false,
      left: 'center',
      top: 'center',
    };

    const newLayer = {
      id: newId,
      name: `Text ${texts.length + 1}`,
      visible: true,
      type: 'text',
    };

    setTexts((prev) => [...prev, newText]);
    setLayers((prev) => [...prev, newLayer]);
    setSelectedTextId(newId);
    setActiveLayer(newId);
  }, [texts]);

  const deleteSelected = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getActiveObject()) return;

    const obj = canvas.getActiveObject();
    if (!obj) return;

    const id = obj.id;

    if (obj.type === 'textbox') {
      setTexts((prev) => prev.filter((text) => text.id !== id));
    } else if (obj.type === 'image' || obj.type === 'sticker') {
      setStickers((prev) => prev.filter((s) => s.id !== id));
    }

    setLayers((prev) => prev.filter((l) => l.id !== id));
    canvas.remove(obj);
    canvas.discardActiveObject();
    canvas.requestRenderAll();
    setSelectedTextId(null);
    setActiveLayer(null);
  }, [texts, stickers, layers]);

  const addSticker = useCallback((sticker) => {
    const newId = `sticker-${Date.now()}`;
    const newSticker = {
      id: newId,
      type: 'sticker',
      content: sticker.icon,
      left: 100,
      top: 100,
      fontSize: 40,
      fontFamily: 'Arial',
    };

    const newLayer = {
      id: newId,
      name: sticker.name || 'Sticker',
      visible: true,
      type: 'sticker',
    };

    setStickers((prev) => [...prev, newSticker]);
    setLayers((prev) => [...prev, newLayer]);
    setActiveLayer(newId);
  }, [stickers, layers]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL({ format: 'png' });
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = dataUrl;
    link.click();
  };

  const handleShare = useCallback(() => {
    // handleDownload();
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied! You can now share it via WhatsApp or Email.');
  }, [handleDownload]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden">
      <Header toggleMemeOfDay={() => setShowMemeOfDay(!showMemeOfDay)} />
      <div className="flex flex-1 flex-col sm:flex-row overflow-hidden">
        <div className={`w-full sm:w-60 order-2 sm:order-1 transition-all duration-300 ease-in-out ${isCollapsed ? 'sm:w-16' : 'sm:w-60'}`}>
          <Sidebar
            canvasRef={canvasRef}
            isCollapsed={isCollapsed}
            toggleSidebar={() => setIsCollapsed(!isCollapsed)}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            texts={texts}
            setTexts={setTexts}
            selectedTextId={selectedTextId}
            setSelectedTextId={setSelectedTextId}
            handleImageUpload={handleImageUpload}
            fileInputRef={fileInputRef}
            setMemeImage={setMemeImage}
            layers={layers}
            setLayers={setLayers}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
            addSticker={addSticker}
          />
        </div>
        <div className="flex-1 flex flex-col order-1 sm:order-2">
          <div className="flex-1 flex items-center justify-center overflow-auto">
            <Canvas
              ref={canvasRef}
              texts={texts}
              memeImage={memeImage}
              showMemeOfDay={showMemeOfDay}
              toggleMemeOfDay={() => setShowMemeOfDay(!showMemeOfDay)}
              layers={layers}
              setLayers={setLayers}
              activeLayer={activeLayer}
              setActiveLayer={setActiveLayer}
              showGrid={showGrid}
              setShowGrid={setShowGrid}
              snapEnabled={snapEnabled}
              setSnapEnabled={setSnapEnabled}
              selectedTextId={selectedTextId}
              setSelectedTextId={setSelectedTextId}
              stickers={stickers}
              setTexts={setTexts}
              setStickers={setStickers}
            />
          </div>
        </div>
        <div className="hidden sm:block w-64 p-4 order-3">
          <LayerControls
            layers={layers}
            setLayers={setLayers}
            activeLayer={activeLayer}
            setActiveLayer={setActiveLayer}
            showGrid={showGrid}
            setShowGrid={setShowGrid}
            snapEnabled={snapEnabled}
            setSnapEnabled={setSnapEnabled}
          />
        </div>
      </div>
      <Footer
        addText={addText}
        deleteSelected={deleteSelected}
        handleDownload={handleDownload}
        handleShare={handleShare}
      />
    </div>
  );
}
