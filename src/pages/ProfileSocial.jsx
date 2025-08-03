import React, { useState } from "react";
import ProfileBox from "../components/Profile";
import Card, { CardContent } from "@/components/ui/card";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import  Textarea  from "@/components/ui/textarea";
import { Upload, ThumbsUp, MessageCircle } from "lucide-react";

import  {useWalletStore} from "@/stores/walletStore";

export default function ProfileSocial() {
  const [postText, setPostText] = useState("");
  const [media, setMedia] = useState(null);
  const [rewarded, setRewarded] = useState(false);
  const addSilver = useWalletStore((state) => state.addSilver);

  const [likePoints, setLikePoints] = useState(0);
  const [commentPoints, setCommentPoints] = useState(0);
  const [chatPoints, setChatPoints] = useState(0);

  const handleUpload = (e) => {
    setMedia(e.target.files[0]);
  };

  const handlePost = () => {
    addSilver(1);
    setPostText("");
    setMedia(null);
    setRewarded(true);
    setTimeout(() => setRewarded(false), 4000);
  };

  const handleLike = () => {
    setLikePoints((prev) => {
      const newPoints = prev + 1;
      if ((newPoints + commentPoints + chatPoints) % 10 === 0) addSilver(1);
      return newPoints;
    });
  };

  const handleComment = () => {
    setCommentPoints((prev) => {
      const newPoints = prev + 5;
      if ((likePoints + newPoints + chatPoints) % 10 === 0) addSilver(1);
      return newPoints;
    });
  };

  const handleChatMessage = () => {
    setChatPoints((prev) => {
      const newPoints = prev + 5;
      if ((likePoints + commentPoints + newPoints) % 10 === 0) addSilver(1);
      return newPoints;
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Card className="mb-4">
        <CardContent className="space-y-4">
         <h1>👤 My Profile</h1>
          <h2 className="text-xl font-semibold">Create a new post</h2>
          <Textarea
            placeholder="What's on your mind?"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
          />
          <Input type="file" accept="image/*,video/*" onChange={handleUpload} />
          <Button onClick={handlePost} disabled={!postText && !media}>
            <Upload className="mr-2 h-4 w-4" /> Upload Post
          </Button>
          {rewarded && (
            <div className="text-green-600 text-sm mt-2">
              🎉 You've earned 1 Silver TICK for your post!
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardContent>
            <p>Sample user post with image</p>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={handleLike}><ThumbsUp className="h-4 w-4 mr-1" /> Like</Button>
              <Button size="sm" onClick={handleComment}><MessageCircle className="h-4 w-4 mr-1" /> Comment</Button>
              <Button size="sm" variant="outline" onClick={handleChatMessage}>💬 Chat</Button>
             <ProfileBox />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
