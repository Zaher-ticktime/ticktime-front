import React, { useState } from 'react';
import { mockStories } from '../data/mockStories';
import StoryModal from './StoryModal';

const StoryPanel = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleStoryClick = (user) => {
    setSelectedUser(user);
    setSelectedStory(user.stories[0]); // show first story for now
  };

  const closeModal = () => {
    setSelectedStory(null);
    setSelectedUser(null);
  };

  return (
    <div className="w-full bg-white p-4 border-b border-gray-200">
      <h2 className="text-black text-lg font-semibold mb-2">Stories</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {mockStories.map(user => (
          <div key={user.id} onClick={() => handleStoryClick(user)} className="cursor-pointer flex-shrink-0 text-center">
            <img
              src={user.profilePic}
              alt={user.username}
              className="w-16 h-16 rounded-full border-2 border-blue-400 object-cover"
            />
            <p className="text-sm text-black mt-1">{user.displayName}</p>
          </div>
        ))}
      </div>

      {selectedStory && selectedUser && (
        <StoryModal
          user={selectedUser}
          story={selectedStory}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default StoryPanel;
