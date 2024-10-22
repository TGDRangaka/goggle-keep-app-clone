import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ImageNote from "@/components/ImageNote";
import ListNote from "@/components/ListNote";
import Note from "@/components/Note";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { ScrollView, View } from "react-native";

export default function Index() {
  return (
    <ThemedView
      className="flex-1 items-center px-5 py-10"
    >
      <Header />

      {/* all notes */}
      <ScrollView>
        <ThemedView className="flex-row h-full justify-center w-full">
          {/* column 1 */}
          <ThemedView className="w-1/2 flex-col p-1">
            <Note note={{ title: 'Hello', body: 'Hello world whats up?' }} />
            <ImageNote />

            {
              new Array(15).fill(null).map((_, i) => (
                <Note key={i} note={{
                  title: 'Title-',
                  body: 'Lorem ipsum dolor sit amet consectetur',
                }} />
              ))
            }
          </ThemedView>

          {/* column 2 */}
          <ThemedView className="w-1/2 flex-col p-1">
            <Note note={{
              title: 'Title-',
              body: 'Lorem ipsum dolor sit amet consectetur',
            }} />
            <ListNote />
            <ImageNote />

          </ThemedView>
        </ThemedView>

      </ScrollView>

      <Footer />
    </ThemedView>
  );
}
