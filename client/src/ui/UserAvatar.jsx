import React, { useGlobal } from "reactn";
import styled from "styled-components";

const Avatar = styled.img`
	width: 35px;
	height: 35px;
	object-fit: cover;
	object-position: center center;
	border-radius: 50%;
`;

const UserAvatar = ({ src = null, alt = null }) => {
	const [{ image, name }] = useGlobal("user");
	return src && alt ? (
		<Avatar src={src} alt={`${alt}'s Avatar`} />
	) : (
		<Avatar src={image} alt={`${name}'s Avatar`} />
	);
};

export default UserAvatar;
