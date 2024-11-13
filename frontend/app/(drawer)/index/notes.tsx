import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Note from "@/components/note/Note";
import { ThemedView } from "@/components/ThemedView";
import NoteService from "@/services/noteService";
import { noteActions } from "@/states/noteSlice";
import { RootState } from "@/states/store";
import { TNote } from "@/types/TNote";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const { notes, loading } = useSelector((root: RootState) => root.note);
  const { user } = useSelector((root: RootState) => root.auth);
  const [column1Notes, setColumn1Notes] = useState<TNote[]>([]);
  const [column2Notes, setColumn2Notes] = useState<TNote[]>([]);
  const dispatch = useDispatch();

  const fetchAllNotes = async () => {
    dispatch(noteActions.startLoading());
    const allNotes = await NoteService.getAll(user?._id!);
    dispatch(noteActions.setNotes(allNotes));
  }

  useFocusEffect(
    useCallback(() => {
      notes.length == 0 && fetchAllNotes(); // Fetch notes each time screen gains focus
    }, [])
  );

  useEffect(() => {
    // divide all notes into 2 columns
    setColumn1Notes(notes.filter((_, index: number) => index % 2 === 0));
    setColumn2Notes(notes.filter((_, index: number) => index % 2 === 1));
  }, [notes]);

  return (
    <SafeAreaView
      className="flex-1 items-center bg-white px-2 pt-2"
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
    </SafeAreaView>
  );
}
