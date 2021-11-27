import "./InitialsAvatar.css"

const InitialsAvatar = ({fullname, className}) => {
function getInitials(fullname) {
	const [firstName, lastName] = fullname.split(" ");

	if (firstName && lastName) {
		return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
	}

	return firstName.charAt(0).toUpperCase();
}
    return (
        <div className={className || 'initials-avatar-small'}>
            <div>{getInitials(fullname)}</div>
        </div>
    )
}

export default InitialsAvatar;
