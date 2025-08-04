
export const mockStories = [
  {
    id: 1,
    username: "you",
    displayName: "Your Story",
    profilePic: "/assets/you.jpg",
    stories: [
      {
        id: "s1",
        type: "image",
        url: "/assets/story1.jpg",
        timestamp: "2025-08-04T10:00:00Z"
      },
      {
        id: "s2",
        type: "video",
        url: "/assets/story2.mp4",
        timestamp: "2025-08-04T11:00:00Z"
      }
    ]
  },
  {
    id: 2,
    username: "sara_k",
    displayName: "Sara Karimi",
    profilePic: "/assets/sara.jpg",
    stories: [
      {
        id: "s3",
        type: "image",
        url: "/assets/sara_story.jpg",
        timestamp: "2025-08-04T09:00:00Z"
      }
    ]
  },
  {
    id: 3,
    username: "ali_j",
    displayName: "Ali Jafari",
    profilePic: "/assets/ali.jpg",
    stories: [
      {
        id: "s4",
        type: "video",
        url: "/assets/ali_story.mp4",
        timestamp: "2025-08-03T20:30:00Z"
      }
    ]
  }
];