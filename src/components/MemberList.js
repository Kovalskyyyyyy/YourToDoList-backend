import React, { useState } from 'react';
import MemberItem from './MemberItem';

function MemberList({ members, setMembers }) {
    const [newMember, setNewMember] = useState('');

    const addMember = () => {
        if (newMember.trim()) {
            setMembers([...members, newMember]);
            setNewMember('');
        }
    };

    const deleteMember = (index) => {
        setMembers(members.filter((_, i) => i !== index));
    };

    return (
        <div className="member-list">
            <h2>Members</h2>
            <input
                type="text"
                placeholder="requires username"
                value={newMember}
                onChange={(e) => setNewMember(e.target.value)}
            />
            <button onClick={addMember}>Add Member</button>
            {members.map((member, index) => (
                <MemberItem
                    key={index}
                    member={member}
                    onDelete={() => deleteMember(index)}
                />
            ))}
        </div>
    );
}

export default MemberList;
