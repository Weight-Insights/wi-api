import { db } from '../config/firebase.js';

const membersCollection = db.collection('members');

async function findAllMembers() {
    let members = [];
    const membersData = await membersCollection.get();
    membersData.forEach(u => {members.push(u.data());});
    return members;
}

async function findMemberById(id) {
    const memberData = await membersCollection.doc(id).get();
    return memberData.data();
}

/**
 * Create a new member. In case the member (id) already exists, it will be entirely replaced.
 * @param {*} member 
 * @returns 
 */
async function saveMember(member) {
    const result = await membersCollection.doc(member.id).set(member);
    return result;
}

async function updateMember(member) {
    const result = await membersCollection.doc(member.id).update(member);
    return result;
}

async function deleteMemberById(id) {
    const result = await membersCollection.doc(id).delete();
    return result;
}

export {
    findAllMembers,
    findMemberById,
    saveMember,
    updateMember,
    deleteMemberById
};
