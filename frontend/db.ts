import { TNote } from "./types/TNote";

export const notes1: TNote[] = [
  {
    id: "1",
    title: "Grocery Shopping",
    list: [
      { id: '1', task: "Buy milk", completed: false },
      { id: '2', task: "Buy bread", completed: true },
    ],
    imgs: [{_id: '1', path: "", uri: "https://firebasestorage.googleapis.com/v0/b/hope-2c90e.appspot.com/o/uploads%2F463599498_1103428291152985_2603835696371597429_n.jpg?alt=media&token=77bf4910-7bc1-4c8e-8336-9bae64630ec6"}],
    reminder: "2024-10-25T08:00:00",
    color: "#f29f75",
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
    imgs: [{_id: '1', path: "", uri: "https://firebasestorage.googleapis.com/v0/b/hope-2c90e.appspot.com/o/uploads%2F463599498_1103428291152985_2603835696371597429_n.jpg?alt=media&token=77bf4910-7bc1-4c8e-8336-9bae64630ec6"}],
    reminder: "2024-10-25T08:00:00",
    color: "#afccdc",
    createdDate: new Date("2024-10-20T12:00:00"),
  },
  {
    id: "4",
    title: "Daily Journal",
    body: "Today was a productive day. Managed to finish a lot of tasks.",
    imgs: [],
    color: "#e2f6d1",
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
    reminder: "2024-10-25T08:00:00",
    color: "#afccdc",
    createdDate: new Date("2024-10-22T11:45:00"),
  },
  {
    id: "6",
    title: "Birthday Party",
    body: "Prepare for Alice's surprise birthday party next weekend.",
    imgs: [],
    color: "#afccdc",
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
    reminder: "2024-10-25T08:00:00",
    color: "#fbafa9",
    createdDate: new Date("2024-10-22T13:30:00"),
  },
  {
    id: "8",
    title: "Meditation Notes",
    body: "Meditated for 20 minutes focusing on breathing and mindfulness.",
    imgs: [{_id: '1', path: "", uri: "https://firebasestorage.googleapis.com/v0/b/hope-2c90e.appspot.com/o/uploads%2F463599498_1103428291152985_2603835696371597429_n.jpg?alt=media&token=77bf4910-7bc1-4c8e-8336-9bae64630ec6"}],
    color: "#efeff1",
    createdDate: new Date("2024-10-21T21:00:00"),
  },
];
