import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Note from "@/components/note/Note";
import { ThemedView } from "@/components/ThemedView";
import { notes1, notes2 } from "@/db";
import NoteService from "@/services/noteService";
import { noteActions } from "@/states/noteSlice";
import { RootState } from "@/states/store";
import { useEffect } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as Notifications from "expo-notifications";

export default function Index() {
  const { notes, loading } = useSelector((root: RootState) => root.note);
  const dispatch = useDispatch();

  const fetchAllNotes = async () => {
    dispatch(noteActions.startLoading());
    const allNotes = await NoteService.getAll();
    dispatch(noteActions.setNotes(allNotes));
  }

  async function scheduleReminder() {

    // Schedule a notification
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Reminder!",
            body: "Don't forget to complete your task.",
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: {
            seconds: 60, // Trigger after 60 seconds
        },
    });

    alert('Reminder set for 1 minute from now!');
}

  useEffect(() => {
    fetchAllNotes();
    scheduleReminder(); // schedule a reminder for 1 minute from now
  }, []);

  return (
    <ThemedView
      className="flex-1 items-center px-2 pt-10"
    >
      <Header />

      {/* all notes */}
      <ScrollView>
        <ThemedView className="flex-row h-full justify-center w-full pb-16">

          {
            loading
              ? <View><ActivityIndicator /></View>
              : <>
                <ThemedView className="w-1/2 flex-col p-1">
                  {
                    notes.map((note) => (
                      <Note key={note._id} note={note} />
                    ))
                  }
                </ThemedView>


                <ThemedView className="w-1/2 flex-col p-1">
                  {
                    notes.map((note) => (
                      <Note key={note._id} note={note} />
                    ))
                  }
                </ThemedView>
              </>
          }
        </ThemedView>
      </ScrollView>
      <Footer />
    </ThemedView>
  );
}
