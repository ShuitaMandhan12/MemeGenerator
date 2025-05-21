export default function ImageUpload({ handleImageUpload, fileInputRef, setMemeImage }) {
  const memeTemplates = [
    'https://i.imgflip.com/1bij.jpg',  // One Does Not Simply
    'https://i.imgflip.com/1g8my.jpg',  // Distracted Boyfriend
    'https://i.imgflip.com/9vct.jpg',   // Drake Hotline Bling
    'https://i.imgflip.com/1h7in3.jpg'  // Blinking Guy
  ];

  return (
    <div className="space-y-4 animate-fadeIn">
       <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImageUpload(e);
          }
        }}
        accept="image/*"
        className="hidden"
        id="image-upload"
      />
      <label
        htmlFor="image-upload"
        className="block w-full bg-violet-100 hover:bg-violet-200 text-violet-700 py-2 px-4 rounded-md text-center cursor-pointer transition-colors"
      >
        Upload Custom Image
      </label>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Popular Templates</h3>
        <div className="grid grid-cols-2 gap-2">
          {memeTemplates.map((template, index) => (
            <button
              key={index}
              onClick={() => setMemeImage(template)}
              className="group relative rounded-md overflow-hidden hover:opacity-90 transition-opacity"
            >
              <img 
                src={template} 
                alt={`Meme template ${index + 1}`} 
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}