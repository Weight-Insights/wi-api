import { v4 as uuidv4 } from 'uuid';
import { deleteMemberById, findAllMembers, findMemberById, saveMember, updateMember } from './repository.js';

async function getAllMembers() {
    const members = await findAllMembers();
    return members;
}

async function getMemberById(id) {
    const member = await findMemberById(id);
    return member;
}

async function addMember(member) {
    const id = uuidv4();
    const result = await saveMember({id, ...member});
    return result;
}

async function updateEntireMember(id, member) {
    if (id !== member.id) {
        throw new Error(`Payload and params ids must match, ${member.id} and ${id}`);
    }
    const result = await saveMember(member);
    return result;
}

async function updateMemberFields(id, member) {
    if (id !== member.id) {
        throw new Error(`Payload and params ids must match, ${member.id} and ${id}`);
    }
    const result = await updateMember(member);
    return result;
}

async function deleteMember(id) {
    const result = await deleteMemberById(id);
    return result;
}

export {
    getAllMembers,
    getMemberById,
    addMember,
    updateEntireMember,
    updateMemberFields,
    deleteMember
};
