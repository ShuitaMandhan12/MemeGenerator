import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { fabric } from 'fabric';
import MemeOfDayModal from './MemeOfDayModal';
import CanvasGuides from './CanvasGuides';

const Canvas = forwardRef(({ 
  showMemeOfDay, 
  toggleMemeOfDay, 
  showGrid, 
  snapEnabled, 
  memeImage, 
  texts, 
  layers, 
  setActiveLayer, 
  setSelectedTextId,
  setLayers,
  setTexts,
  stickers,
  setStickers
}, ref) => {
  const canvasRef = useRef(null);
  const selectedObjectRef = useRef(null);
  const fabricCanvas = useRef(null);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 500, height: 500 });

  useImperativeHandle(ref, () => fabricCanvas.current);

  // Initialize canvas and set up event listeners
  useEffect(() => {
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      backgroundColor: '#ffffff',
      preserveObjectStacking: true,
      selection: true,
    });

    // Add delete keyboard support
    const handleKeyDown = (e) => {
      if (e.key === 'Delete' && fabricCanvas.current.getActiveObject()) {
        const activeObj = fabricCanvas.current.getActiveObject();
        
        // Remove from appropriate state
        if (activeObj.type === 'textbox') {
          setTexts(prev => prev.filter(text => text.id !== activeObj.id));
        } else if (activeObj.type === 'image' || activeObj.type === 'sticker') {
          setStickers(prev => prev.filter(sticker => sticker.id !== activeObj.id));
        }
        
        // Remove from layers state
        setLayers(prev => prev.filter(layer => layer.id !== activeObj.id));
        
        // Remove from canvas
        fabricCanvas.current.remove(activeObj);
        fabricCanvas.current.discardActiveObject();
        fabricCanvas.current.requestRenderAll();
        
        // Reset selection
        setSelectedTextId(null);
        setActiveLayer(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    const handleSelection = (e) => {
      if (e.target) {
        setActiveLayer(e.target.id);
        selectedObjectRef.current = e.target;
    
        if (e.target.type === 'textbox') {
          setSelectedTextId(e.target.id);
          
          // Update React state to match canvas object
          const textProps = {
            content: e.target.text,
            fontFamily: e.target.fontFamily,
            textColor: e.target.fill,
            fontSize: e.target.fontSize,
            textAlign: e.target.textAlign,
            isBold: e.target.fontWeight === 'bold',
            isItalic: e.target.fontStyle === 'italic',
            isUnderline: e.target.underline,
            left: e.target.left,
            top: e.target.top,
            scaleX: e.target.scaleX,
            scaleY: e.target.scaleY,
            angle: e.target.angle,
            shadow: !!e.target.shadow,
            shadowColor: e.target.shadow?.color,
            shadowBlur: e.target.shadow?.blur,
            shadowOffsetX: e.target.shadow?.offsetX,
            shadowOffsetY: e.target.shadow?.offsetY,
            strokeColor: e.target.stroke,
            strokeWidth: e.target.strokeWidth
          };
          
          setTexts(prev => prev.map(text => 
            text.id === e.target.id ? { ...text, ...textProps } : text
          ));
        } else {
          setSelectedTextId(null);
        }
      }
    };

    const handleClearSelection = () => {
      setSelectedTextId(null);
      setActiveLayer(null);
    };

    const handleObjectModified = (e) => {
      if (e.target) {
        // Update state when objects are modified
        if (e.target.type === 'textbox') {
          setTexts(prev => prev.map(text => 
            text.id === e.target.id ? { 
              ...text, 
              left: e.target.left,
              top: e.target.top,
              scaleX: e.target.scaleX,
              scaleY: e.target.scaleY,
              angle: e.target.angle
            } : text
          ));
        } else {
          // Handle both image stickers and text/emoji stickers
          setStickers(prev => prev.map(sticker => 
            sticker.id === e.target.id ? {
              ...sticker,
              left: e.target.left,
              top: e.target.top,
              scaleX: e.target.scaleX,
              scaleY: e.target.scaleY,
              angle: e.target.angle,
              // For text/emoji stickers
              fontSize: e.target.fontSize || sticker.fontSize,
              fontFamily: e.target.fontFamily || sticker.fontFamily
            } : sticker
          ));
        }
      }
    };

    fabricCanvas.current.on('object:selected', handleSelection);
    fabricCanvas.current.on('selection:cleared', handleClearSelection);
    fabricCanvas.current.on('object:modified', handleObjectModified);
    fabricCanvas.current.on('object:scaled', handleObjectModified);
    fabricCanvas.current.on('object:rotated', handleObjectModified);
    fabricCanvas.current.on('object:moved', handleObjectModified);

    const handleResize = () => {
      const container = document.querySelector('.canvas-container');
      if (container) {
        const newWidth = Math.min(container.clientWidth, 800);
        const newHeight = (newWidth * 3) / 4;
        setCanvasDimensions({ width: newWidth, height: newHeight });
        fabricCanvas.current.setDimensions({ width: newWidth, height: newHeight });
        fabricCanvas.current.renderAll();
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      fabricCanvas.current.dispose();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKeyDown);
      fabricCanvas.current.off('object:selected', handleSelection);
      fabricCanvas.current.off('selection:cleared', handleClearSelection);
      fabricCanvas.current.off('object:modified', handleObjectModified);
      fabricCanvas.current.off('object:scaled', handleObjectModified);
      fabricCanvas.current.off('object:rotated', handleObjectModified);
      fabricCanvas.current.off('object:moved', handleObjectModified);
    };
  }, []);

  // Handle background image changes
  useEffect(() => {
    if (!fabricCanvas.current) return;

    if (!memeImage) {
      fabricCanvas.current.setBackgroundColor('#ffffff', () => {
        fabricCanvas.current.renderAll();
      });
      return;
    }

    fabric.Image.fromURL(memeImage, (img) => {
      img.set({
        selectable: false,
        evented: false,
        originX: 'left',
        originY: 'top'
      });
      
      const scale = Math.min(
        canvasDimensions.width / img.width,
        canvasDimensions.height / img.height
      );
      img.scale(scale);
      
      img.set({
        left: (canvasDimensions.width - (img.width * scale)) / 2,
        top: (canvasDimensions.height - (img.height * scale)) / 2
      });

      fabricCanvas.current.setBackgroundImage(img, () => {
        fabricCanvas.current.renderAll();
      });
    }, { crossOrigin: 'anonymous' });
  }, [memeImage, canvasDimensions]);

  // Handle text and sticker objects
  useEffect(() => {
    if (!fabricCanvas.current) return;

    const currentTextObjects = fabricCanvas.current.getObjects('textbox');
    const currentStickers = fabricCanvas.current.getObjects().filter(obj => 
      obj.type !== 'textbox' && obj.type !== 'image'
    );

    // Remove deleted texts
    currentTextObjects.forEach(obj => {
      if (!texts.some(text => text.id === obj.id)) {
        fabricCanvas.current.remove(obj);
      }
    });

    // Remove deleted stickers
    currentStickers.forEach(obj => {
      if (!stickers.some(sticker => sticker.id === obj.id)) {
        fabricCanvas.current.remove(obj);
      }
    });

    // Add/update texts
    texts.forEach(text => {
      const layer = layers.find(l => l.id === text.id);
      if (!layer?.visible) return;

      const existingText = currentTextObjects.find(obj => obj.id === text.id);

      if (existingText) {
        // Only update if the text is not currently being edited
        if (!existingText.isEditing) {
          existingText.set({
            text: text.content,
            fontFamily: text.fontFamily || 'Impact',
            fill: text.textColor || '#ffffff',
            fontSize: text.fontSize || 32,
            textAlign: text.textAlign || 'center',
            fontWeight: text.isBold ? 'bold' : 'normal',
            fontStyle: text.isItalic ? 'italic' : 'normal',
            underline: text.isUnderline || false,
            shadow: text.shadow
              ? new fabric.Shadow({
                  color: text.shadowColor || 'rgba(0,0,0,0.8)',
                  blur: text.shadowBlur || 2,
                  offsetX: text.shadowOffsetX || 1,
                  offsetY: text.shadowOffsetY || 1,
                })
              : null,
            stroke: text.strokeColor || '#000000',
            strokeWidth: text.strokeWidth || 0
          });
        }
      } else {
        const fabricText = new fabric.Textbox(text.content, {
          id: text.id,
          left: text.left === 'center' ? canvasDimensions.width / 2 : 
                text.left === 'left' ? 20 : 
                text.left === 'right' ? canvasDimensions.width - 20 : 
                text.left || canvasDimensions.width / 2,
          top: text.top === 'center' ? canvasDimensions.height / 2 : 
               text.top === 'top' ? 20 : 
               text.top === 'bottom' ? canvasDimensions.height - 50 : 
               text.top || canvasDimensions.height / 2,
          width: canvasDimensions.width * 0.9,
          originX: text.left === 'center' ? 'center' : 'left',
          originY: text.top === 'center' ? 'center' : 
                  text.top === 'bottom' ? 'bottom' : 'top',
          fontFamily: text.fontFamily || 'Impact',
          fill: text.textColor || '#ffffff',
          fontSize: text.fontSize || 32,
          textAlign: text.textAlign || 'center',
          fontWeight: text.isBold ? 'bold' : 'normal',
          fontStyle: text.isItalic ? 'italic' : 'normal',
          underline: text.isUnderline || false,
          shadow: text.shadow
            ? new fabric.Shadow({
                color: text.shadowColor || 'rgba(0,0,0,0.8)',
                blur: text.shadowBlur || 2,
                offsetX: text.shadowOffsetX || 1,
                offsetY: text.shadowOffsetY || 1,
              })
            : null,
          stroke: text.strokeColor || '#000000',
          strokeWidth: text.strokeWidth || 0,
          splitByGrapheme: true,
          editable: true,
        });

        // Add event listener for when editing is done
        fabricText.on('editing:exited', () => {
          setTexts(prev => prev.map(t => 
            t.id === text.id ? { ...t, content: fabricText.text } : t
          ));
        });

        fabricCanvas.current.add(fabricText);
      }
    });

    // Add/update stickers
    stickers.forEach(sticker => {
      const layer = layers.find(l => l.id === sticker.id);
      if (!layer?.visible) return;

      const existingSticker = currentStickers.find(obj => obj.id === sticker.id);

      if (existingSticker) {
        // Update existing sticker properties
        existingSticker.set({
          left: sticker.left || existingSticker.left || 100,
          top: sticker.top || existingSticker.top || 100,
          scaleX: sticker.scaleX || existingSticker.scaleX || 1,
          scaleY: sticker.scaleY || existingSticker.scaleY || 1,
          angle: sticker.angle || existingSticker.angle || 0
        });
      } else {
        if (sticker.content.startsWith('http')) {
          // Image sticker
          fabric.Image.fromURL(sticker.content, (img) => {
            img.set({
              id: sticker.id,
              left: sticker.left || 100,
              top: sticker.top || 100,
              scaleX: sticker.scaleX || 1,
              scaleY: sticker.scaleY || 1,
              angle: sticker.angle || 0,
              type: 'sticker'
            });
            fabricCanvas.current.add(img);
            fabricCanvas.current.renderAll();
          }, { crossOrigin: 'anonymous' });
        } else {
          // Emoji/text sticker
          const text = new fabric.Text(sticker.content, {
            id: sticker.id,
            left: sticker.left || 100,
            top: sticker.top || 100,
            fontSize: sticker.fontSize || 40,
            fontFamily: sticker.fontFamily || 'Arial',
            scaleX: sticker.scaleX || 1,
            scaleY: sticker.scaleY || 1,
            angle: sticker.angle || 0,
            type: 'sticker'
          });
          fabricCanvas.current.add(text);
          fabricCanvas.current.renderAll();
        }
      }
    });

    fabricCanvas.current.renderAll();
  }, [texts, stickers, layers, canvasDimensions]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gray-100 relative overflow-hidden p-2">
      {showMemeOfDay && <MemeOfDayModal onClose={toggleMemeOfDay} />}
      <CanvasGuides showGrid={showGrid} snapEnabled={snapEnabled} />
      <div className="canvas-container relative w-full max-w-2xl mx-auto mt-4 sm:mt-0">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden relative">
          <canvas ref={canvasRef} className="block mx-auto" />
          <div className="absolute bottom-0.5 right-0.5 text-[8px] sm:text-xs text-gray-400/50">
            Created with MemeGen
          </div>
        </div>
      </div>
    </div>
  );
});

export default Canvas;