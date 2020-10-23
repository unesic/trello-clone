import React, { useGlobal } from "reactn";
import { FiTrash2, FiCheck, FiX, FiList } from "react-icons/fi";

import { Button } from "./ItemActions.module.css";

const Actions = ({ onToggle, onMark, onDelete, done }) => {
	const [isUserOwner] = useGlobal("isUserOwner");

	return (
		<>
			<button onClick={onToggle} className={Button}>
				<FiList /> View details
			</button>
			{isUserOwner ? (
				<>
					<button onClick={onMark} className={Button}>
						{done ? (
							<>
								<FiX /> Mark as not done
							</>
						) : (
							<>
								<FiCheck /> Mark as done
							</>
						)}
					</button>
					<button onClick={onDelete} className={Button}>
						<FiTrash2 /> Remove item
					</button>
				</>
			) : null}
		</>
	);
};

export default Actions;
