import React, { useGlobal } from "reactn";
import styled from "styled-components";

const Avatar = styled.img`
	display: block;
	width: 35px;
	height: 35px;
	object-fit: cover;
	object-position: center center;
	border-radius: 50%;
`;

const Details = styled.div`
	margin-left: 8px;
`;

const Name = styled.h4`
	color: var(--base-solid-1);
`;

const Email = styled.p`
	font-size: 0.9em;
	color: var(--text-solid-1);
`;

const UserAvatar = ({
	src = null,
	alt = null,
	clicked = null,
	withDetails = false,
}) => {
	const [user] = useGlobal("user");

	return (
		<div
			onClick={clicked}
			style={{
				cursor: clicked ? "pointer" : null,
				display: withDetails ? "flex" : null,
				alignItems: withDetails ? "center" : null,
			}}
		>
			{src && alt ? (
				<Avatar
					src={src}
					alt={`${alt}'s Avatar`}
					style={clicked && { padding: "2px" }}
					referrerPolicy="no-referrer"
				/>
			) : (
				user && (
					<>
						<Avatar
							src={user.image}
							alt={`${user.name}'s Avatar`}
							style={clicked && { padding: "2px" }}
							referrerPolicy="no-referrer"
						/>
						{withDetails && (
							<Details>
								<Name>{user.name}</Name>
								<Email>{user.email}</Email>
							</Details>
						)}
					</>
				)
			)}
		</div>
	);
};

export default UserAvatar;
