
import React, { useState } from 'react';

const PostUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [showInFeed, setShowInFeed] = useState(true);
  const [showInStory, setShowInStory] = useState(false);

  const handleFileChange = (e) => {
    const uploaded = e.target.files[0];
    if (uploaded) {
      setFile(uploaded);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file || (!showInFeed && !showInStory)) return;

    const post = {
      id: Date.now().toString(),
      fileUrl: URL.createObjectURL(file),
      fileType: file.type.startsWith('video') ? 'video' : 'image',
      caption,
      showInFeed,
      showInStory,
      timestamp: new Date().toISOString()
    };

    if (onUpload) onUpload(post);

    setFile(null);
    setCaption("");
    setShowInFeed(true);
    setShowInStory(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md text-black">
      <h2 className="text-lg font-bold mb-2">📤 ارسال پست جدید</h2>
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} className="mb-2" />
      {file && (
        <div className="mb-2">
          {file.type.startsWith('video') ? (
            <video src={URL.createObjectURL(file)} controls className="w-full max-h-64 rounded" />
          ) : (
            <img src={URL.createObjectURL(file)} alt="preview" className="w-full max-h-64 object-contain rounded" />
          )}
        </div>
      )}
      <textarea
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="توضیح بنویس..."
        className="w-full p-2 border rounded mb-2"
      />
      <div className="flex items-center space-x-4 mb-3">
        <label className="flex items-center">
          <input type="checkbox" checked={showInFeed} onChange={() => setShowInFeed(!showInFeed)} />
          <span className="ml-1">نمایش در Feed</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" checked={showInStory} onChange={() => setShowInStory(!showInStory)} />
          <span className="ml-1">نمایش در Story</span>
        </label>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">ارسال</button>
    </form>
  );
};

export default PostUploade