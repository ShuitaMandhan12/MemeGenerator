export default function CanvasGuides({ showGrid, snapEnabled }) {
    return (
      <>
        {/* Grid Overlay */}
        {showGrid && (
          <div 
            className="absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CiAgPHBhdGggZD0iTTAgMGgyMHYyMEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZThlOGU4Ii8+Cjwvc3ZnPg==')]"
            style={{
              backgroundSize: '20px 20px',
              zIndex: 10
            }}
          />
        )}
  
        {/* Snap Guides */}
        {snapEnabled && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-blue-500/30 transform -translate-y-1/2"></div>
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/30 transform -translate-x-1/2"></div>
          </div>
        )}
      </>
    );
  }