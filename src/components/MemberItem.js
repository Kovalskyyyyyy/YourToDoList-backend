import React from 'react';

function MemberItem({ member, onDelete }) {
    return (
        <div className="member-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span>{member}</span>
            <button onClick={onDelete} style={{ background: 'none', border: 'none', color: '#f00', cursor: 'pointer' }}>❌</button>
        </div>
    );
}

export default MemberItem;
