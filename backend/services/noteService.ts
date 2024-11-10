import { Note, TImage, TNote } from "../models/Note"
import { User } from "../models/User";
import { uploadAssetToFirebase } from "../utils/uploadAsset";

export default class NoteService {
    // get all notes
    static getAllNotes = async (user: string) => {
        // get all sort by created date time and user
        return await Note.find({ user }).sort({ createdDate: -1 });
    }

    // get all reminders
    static getAllReminders = async () => {
        return await Note.find({ reminder: { $ne: null } });
    }

    // get all lists
    static getAllLists = async () => {
        return await Note.find({ list: { $exists: true, $not: { $size: 0 } } });
    }

    // get all notes that have images
    static getAllNotesWithImages = async () => {
        return await Note.find({ imgs: { $exists: true, $not: { $size: 0 } } });
    }

    // get note by color
    static getNotesByColor = async (color: string) => {
        return await Note.find({ color });
    }

    // save note
    static saveNote = async (data: TNote, attachments: any, userId: string) => {
        // get user if have
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found by ID: ' + userId);
        }
    
        let attachmentsData: TImage[] = [];
        let list = [];
        let reminder = null;
        if(data.list){
            list = JSON.parse(data.list + '')
            list = list.map((task: any) => {
                return { task: task.task, completed: task.completed };
            });
        }
        if(data.reminder){
            reminder = JSON.parse(data.reminder + '');
        }

        // save attachments
        for (const attachment of attachments) {
            const imgData = await uploadAssetToFirebase(attachment);
            attachmentsData.push(imgData);
        }


        const newNote = { ...data, list, user, reminder, imgs: attachmentsData };
        // console.log(newNote);

        return await new Note(newNote).save();
        // return null;
    }

    static updateNote = async (id: string, data: TNote, attachments: any) => {
        // console.log(id, data, attachments);
        // console.log('--------------------------------');
    
        // Check if the note exists
        const currentNote = await Note.findById(id);
        if (!currentNote) {
            throw new Error('Note not found by ID: ' + id);
        }
    
        // Initialize attachments and lists
        let attachmentsData: TImage[] = [];
        let list = [];
        let reminder = null;
    
        // Parse the `list` field if provided
        if (data.list) {
            list = JSON.parse(data.list + '');
            list = list.map((task: any) => ({
                task: task.task,
                completed: task.completed,
            }));
        }
    
        // Parse the `reminder` field if provided
        if (data.reminder) {
            reminder = JSON.parse(data.reminder + '');
        }
    
        // Upload each attachment to Firebase and save the data
        for (const attachment of attachments) {
            const imgData = await uploadAssetToFirebase(attachment);
            attachmentsData.push(imgData);
        }
    
        // Update fields in the current note
        currentNote.imgs = [...currentNote.imgs, ...attachmentsData];
        currentNote.list = list;
        currentNote.reminder = reminder;
        currentNote.title = data.title;
        currentNote.body = data.body;
        currentNote.color = data.color;
    
        // Save the updated note to the database
        await currentNote.save();
        // console.log(currentNote);
    
        // Optional: Return the updated note (after saving)
        return currentNote;
    }
    

    static deleteNote = async (id: string) => {
        // check note exists
        const exists = await Note.findById(id);
        if (!exists) {
            throw new Error('Note not found by ID: ' + id);
        }

        // delete attachments from firebase storage

        // delete note
        await Note.findByIdAndDelete(id);
    }
}