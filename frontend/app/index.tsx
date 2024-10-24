import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Note from "@/components/Note";
import { ThemedView } from "@/components/ThemedView";
import { notes1, notes2 } from "@/db";
import { ScrollView, View } from "react-native";

export default function Index() {
  return (
    <ThemedView
      className="flex-1 items-center px-2 pt-10"
    >
      <Header />

      {/* all notes */}
      <ScrollView>
        <ThemedView className="flex-row h-full justify-center w-full pb-16">
          {/* column 1 */}
          <ThemedView className="w-1/2 flex-col p-1">
            {
              notes1.map((note) => (
                <Note key={note.id} note={note} />
              ))
            }
          </ThemedView>

          {/* column 2 */}
          <ThemedView className="w-1/2 flex-col p-1">
            {
              notes2.map((note) => (
                <Note key={note.id} note={note} />
              ))
            }
          </ThemedView>
        </ThemedView>
      </ScrollView>
      <Footer />
    </ThemedView>
  );
}
