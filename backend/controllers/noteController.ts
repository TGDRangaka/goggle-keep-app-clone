import express from 'express';
import NoteService from '../services/noteService';
import multer from 'multer';

const noteRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() })

noteRouter.get('/health', (req, res) => {
    res.send('Note route is working');
});

// get all

// get reminders

// search


// create note
noteRouter.post('/', upload.any(), async (req, res) => {
    try {
        const saved = await NoteService.saveNote(req.body, req.files);
        res.status(201).json({
            success: true,
            data: saved
        });
    } catch (err: any) {
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