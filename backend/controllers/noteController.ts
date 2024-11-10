import express from 'express';
import NoteService from '../services/noteService';
import multer from 'multer';

const noteRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

noteRouter.get('/health', (req, res) => {
    res.send('Note route is working');
});

// get all
noteRouter.get('/', async (req, res) => {
    try {
        // get header 'x-userid'
        const userId = req.header('x-userid');
        if (!userId) {
            res.status(401);
            return;
        }
        const notes = await NoteService.getAllNotes(userId);
        res.json({
            success: true,
            data: notes
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// get reminders
noteRouter.get('/reminders', async (req, res) => {
    try {
        const reminders = await NoteService.getAllReminders();
        res.json({
            success: true,
            data: reminders
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

// get lists
noteRouter.get('/lists', async (req, res) => {
    try {
        const lists = await NoteService.getAllLists();
        res.json({
            success: true,
            data: lists
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})

// search
// get all notes that have images
noteRouter.get('/images', async (req, res) => {
    try {
        const notes = await NoteService.getAllNotesWithImages();
        res.json({
            success: true,
            data: notes
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})

// get notes by color
noteRouter.get('/color/:color', async (req, res) => {
    try {
        const notes = await NoteService.getNotesByColor('#' + req.params.color);
        res.json({
            success: true,
            data: notes
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})


// create note
noteRouter.post('/', upload.any(), async (req, res) => {
    try {
        // get header 'x-userid'
        const userId = req.header('x-userid');
        if (!userId) {
            res.status(401);
            return;
        }
        const saved = await NoteService.saveNote(req.body, req.files, userId);
        res.status(201).json({
            success: true,
            data: saved
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})


// update note
noteRouter.put('/:id', upload.any(), async (req, res) => {
    try {
        const updated = await NoteService.updateNote(req.params.id, req.body, req.files);
        res.status(200).json({
            success: true,
            data: updated
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})


// deletes
noteRouter.delete('/:id', async (req, res) => {
    try {
        const deleted = await NoteService.deleteNote(req.params.id);
        res.status(200).json({
            success: true,
            data: deleted
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
})

export default noteRouter;