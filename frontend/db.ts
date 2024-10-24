import { TNote } from "./types/TNote";

export const notes1: TNote[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    list: [
      { id: '1', task: "Buy milk", completed: false },
      { id: '2', task: "Buy bread", completed: true },
    ],
    imgs: [require('@/assets/images/partial-react-logo.png'), require('@/assets/images/icon.png')],
    reminder: new Date("2024-10-25T08:00:00"),
    color: "#7C4A03",
    createdDate: new Date("2024-10-20T14:30:00"),
  },
  {
    id: "2",
    title: "Meeting Notes",
    body: "Discuss project milestones and set deadlines for next phase. Discuss project milestones and set deadlines for next phase.Discuss project milestones and set deadlines for next phase.",
    imgs: [],
    createdDate: new Date("2024-10-21T09:00:00"),
  },
  {
    id: "3",
    title: "Workout Routine",
    list: [
      { id: '1', task: "Warm-up exercises", completed: false },
      { id: '2', task: "Cardio for 30 minutes", completed: false },
    ],
    imgs: [require('@/assets/images/icon.png')],
    reminder: new Date("2024-10-24T07:30:00"),
    color: "#264D3B",
    createdDate: new Date("2024-10-20T12:00:00"),
  },
  {
    id: "4",
    title: "Daily Journal",
    body: "Today was a productive day. Managed to finish a lot of tasks.",
    imgs: [],
    color: "#76172D",
    createdDate: new Date("2024-10-21T20:00:00"),
  },
];

export const notes2: TNote[] = [
  {
    id: "5",
    title: "Read Books",
    list: [
      { id: '1', task: "Finish 'Atomic Habits'", completed: false },
      { id: '2', task: "Start 'Deep Work'", completed: false },
    ],
    imgs: [],
    reminder: new Date("2024-10-28T18:00:00"),
    color: "#4B443A",
    createdDate: new Date("2024-10-22T11:45:00"),
  },
  {
    id: "6",
    title: "Birthday Party",
    body: "Prepare for Alice's surprise birthday party next weekend.",
    imgs: [],
    color: "#7C4A03",
    createdDate: new Date("2024-10-22T09:15:00"),
  },
  {
    id: "7",
    title: "Weekly Goals",
    list: [
      { id: '1', task: "Complete React Native project", completed: true },
      { id: '2', task: "Plan next week's tasks", completed: false },
    ],
    imgs: [],
    reminder: new Date("2024-10-29T08:00:00"),
    color: "#76172D",
    createdDate: new Date("2024-10-22T13:30:00"),
  },
  {
    id: "8",
    title: "Meditation Notes",
    body: "Meditated for 20 minutes focusing on breathing and mindfulness.",
    imgs: [require('@/assets/images/icon.png')],
    color: "#264D3B",
    createdDate: new Date("2024-10-21T21:00:00"),
  },
];
