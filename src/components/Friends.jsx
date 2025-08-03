import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone, Users } from "lucide-react";
import Navbar from "../components/Navbar"; // یا مسیر درست Navbar رو جایگزین کن

// نمونه دوستان ثابت (بعداً از سرور یا دیتابیس گرفته میشه)
const realFriends = [
  { name: "Ali", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Sara", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "John", avatar: "https://i.pravatar.cc/150?img=8" },
];

export default function Friends() {
  return (
    <>
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold mb-2">👥 My Real Friends</h2>

        {realFriends.length === 0 ? (
          <p className="text-gray-500">You haven't added any friends yet.</p>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              Total friends: {realFriends.length}
            </p>

            {realFriends.map((friend, i) => (
              <Card key={i} className="border shadow-sm">
                <CardContent className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={friend.avatar}
                      alt={friend.name}
                      className="w-12 h-12 rounded-full border object-cover"
                    />
                    <span className="font-medium text-lg">{friend.name}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" title="Chat">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Voice Call">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" title="Add to Group">
                      <Users className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </>
        )}
      </div>
    </>
  );
}
