import { Router } from 'express';
import { addMember, deleteMember, getAllMembers, getMemberById, updateEntireMember, updateMemberFields } from './service.js';

export const router = Router();

// Get all members
router.get('/', async (req, res) => {
    try {
        const members = await getAllMembers();
        res.status(200).json(members);
    } catch(e) {
        console.log(e);
        res.status(500).json({message: 'server error'});
    }
});

// Get member by email
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const member = await getMemberById(id);
        res.status(200).json(member);
    } catch(e) {
        console.log(e);
        res.status(404).json({message: 'not found'});
    }
});

// Post new member
router.post('/', async (req, res) => {
    try {
        const member = req.body;
        const result = await addMember(member);
        res.status(201).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update entire member
router.put('/:id', async (req, res) => {
    try {
        const member = req.body;
        const id = req.params.id;
        const result = await updateEntireMember(id, member);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Update member fields
router.patch('/:id', async (req, res) => {
    try {
        const member = req.body;
        const id = req.params.id;
        const result = await updateMemberFields(id, member);
        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
});

// Delete member if she or he exists
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await deleteMember(id);
        res.status(200).json(result);
    } catch(e) {
        console.log(e);
        res.status(500).json(e);
    }
});
