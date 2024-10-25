import { Note, TNote } from "../models/Note"
import { uploadAssetToFirebase } from "../utils/uploadAsset";

export default class NoteService {

    // save note
    static saveNote = async (data: TNote, attachments: any) => {
        let attachmentsLinks: string[] = [];

        // save attachments in firebase storage
        if (attachments && attachments.length > 0) {
            // save attachments
            for (const attachment of attachments) {
                const url = await uploadAssetToFirebase(attachment);
                attachmentsLinks.push(url);
            }
        }

        console.log(attachmentsLinks);
        console.log(data);

        // const saved = await new Note(data).save();
        // return saved;
        return null;
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