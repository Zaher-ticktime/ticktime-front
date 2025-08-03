import React, { useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import { Card, CardContent } from "@/components/Ui/card";

const MyPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [rewarded, setRewarded] = useState(false);
  const user = JSON.parse(localStorage.getItem("tick_user")) || { uid: "demo-user" };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "user_photos"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })).filter(p => p.userId === user.uid);
      setPhotos(data);
    });
    return () => unsub();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = async () => {
      await addDoc(collection(db, "user_photos"), {
        userId: user.uid,
        image: reader.result,
        createdAt: serverTimestamp(),
      });
      if (!rewarded) {
        alert("🎁 +2 SilverTICK for uploading your first photo!");
        setRewarded(true);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleShare = async (photo, index) => {
    if (localStorage.getItem(`shared_photo_${index}`)) {
      alert("🔁 You've already shared this photo.");
      return;
    }

    await addDoc(collection(db, "posts"), {
      username: user.uid,
      text: "Shared from My Photos",
      image: photo.image,
      createdAt: serverTimestamp(),
    });

    localStorage.setItem(`shared_photo_${index}`, true);
    alert("✅ Photo shared to your feed! +1 SilverTICK");
  };

  const handleDelete = async (photoId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this photo?");
    if (!confirmDelete) return;
    await deleteDoc(doc(db, "user_photos", photoId));
    alert("🗑 Photo deleted successfully.");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-cyan-500">📸 My Photo Gallery</h2>
        <input type="file" accept="image/*" onChange={handleUpload} className="text-sm" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {photos.map((p, index) => (
            <Card key={p.id}>
              <CardContent className="p-2">
                <img src={p.image} alt={`photo-${index}`} className="rounded w-full h-40 object-cover" />
                <div className="flex justify-between mt-2 text-sm">
                  <button
                    onClick={() => handleShare(p, index)}
                    className="text-purple-600 hover:underline"
                  >📤 Share</button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline"
                  >🗑 Delete</button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyPhotos;




