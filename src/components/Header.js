function Header({ username, onLogoClick }) {
    return (
        <div className="header">
            <h1 onClick={onLogoClick} style={{ cursor: 'pointer', color: '#00f' }}>YourToDoList</h1>
            <button className="username-btn">{username}</button>
        </div>
    );
}

export default Header;
