import { Note, TImage, TNote } from "../models/Note"
import { uploadAssetToFirebase } from "../utils/uploadAsset";

export default class NoteService {
    // get all notes
    static getAllNotes = async () => {
        return await Note.find({});
    }

    // save note
    static saveNote = async (data: TNote, attachments: any) => {
        let attachmentsData: TImage[] = [];
        let list = [];
        if(data.list){
            list = JSON.parse(data.list + '')
            list = list.map((task: any) => {
                return { task: task.task, completed: task.completed };
            });
        }

        // save attachments
        for (const attachment of attachments) {
            const imgData = await uploadAssetToFirebase(attachment);
            attachmentsData.push(imgData);
        }


        const newNote = { ...data, list, imgs: attachmentsData };
        console.log(newNote);

        return await new Note(newNote).save();
        // return null;
    }

    static updateNote = async (id: string, data: TNote, attachments: any) => {
        // check note exists
        const exists = await Note.findById(id);
        if (!exists) {
            throw new Error('Note not found by ID: ' + id);
        }

        // check attachments updated

        // check list updated

        // update attachments in firebase storage
        if (attachments && attachments.length > 0) {
            // save attachments

            // set links to attachments
        }

        // update note
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