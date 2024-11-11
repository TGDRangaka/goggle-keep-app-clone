import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Note from "@/components/note/Note";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import NoteService from "@/services/noteService";
import { noteActions } from "@/states/noteSlice";
import { makeStore, RootState } from "@/states/store";
import { TNote } from "@/types/TNote";
import { store } from "expo-router/build/global-state/router-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";

export default function reminders() {
  const { notes, loading } = useSelector((root: RootState) => root.note);
  const { user } = useSelector((root: RootState) => root.auth);
  const [reminders, setReminders] = useState<TNote[]>([]);
  const [column1Notes, setColumn1Notes] = useState<TNote[]>([]);
  const [column2Notes, setColumn2Notes] = useState<TNote[]>([]);
  const dispatch = useDispatch();

  const fetchAllNotes = async () => {
    dispatch(noteActions.startLoading());
    const allNotes = await NoteService.getAll(user?._id!);
    dispatch(noteActions.setNotes(allNotes));
  }

  useEffect(() => {
    fetchAllNotes();
  }, []);

  useEffect(() => {
    setReminders(notes.filter(n => n.reminder));
    // divide all notes into 2 columns
    setColumn1Notes(reminders.filter((_, index: number) => index % 2 === 0));
    setColumn2Notes(reminders.filter((_, index: number) => index % 2 === 1));
  }, [notes]);

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
                    column1Notes.map((note) => (
                      <Note key={note._id} note={note} />
                    ))
                  }
                </ThemedView>


                <ThemedView className="w-1/2 flex-col p-1">
                  {
                    column2Notes.map((note) => (
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
