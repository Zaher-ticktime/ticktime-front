import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
  doc,
  query,
  where
} from "firebase/firestore";

const StoryBar = () => {
  const [stories, setStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [uploading, setUploading] = useState(false);
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  useEffect(() => {
    const q = query(collection(db, "stories"), where("expiresAt", ">", Date.now()));
    const unsub = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setStories(fetched);
    });
    return () => unsub();
  }, []);

  const handleStoryClick = (story) => {
    setSelectedStory(story);
    // Add reward for viewing story
    alert("🎁 You viewed a story! +1 SilverTICK");
  };

  const handleUploadStory = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      setUploading(true);
      const base64 = reader.result;

      await addDoc(collection(db, "stories"), {
        userId: user.uid,
        image: base64,
        createdAt: serverTimestamp(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours later
      });

      setUploading(false);
      alert("✅ Story uploaded! +2 SilverTICK");
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-3 overflow-x-auto whitespace-nowrap flex space-x-4 bg-white border-b">
      <label className="cursor-pointer text-blue-600 font-semibold text-sm">
        ＋ Add Story
        <input type="file" accept="image/*,video/*" className="hidden" onChange={handleUploadStory} />
      </label>

      {stories.map((story) => (
        <div
          key={story.id}
          onClick={() => handleStoryClick(story)}
          className="w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-400 cursor-pointer"
        >
          <img src={story.image} alt="story" className="w-full h-full object-cover" />
        </div>
      ))}

      {uploading && <span className="text-sm text-gray-500">Uploading...</span>}

      {selectedStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-50"
          onClick={() => setSelectedStory(null)}
        >
          <img
            src={selectedStory.image}
            alt="Full Story"
            className="max-w-full max-h-full rounded"
          />
        </div>
      )}
    </div>
  );
};

export default StoryBar;
