import React from "react";
import SyncLoader from "react-spinners/SyncLoader";

const Spinner = ({ loading }) => {
	return (
		<SyncLoader
			size={10}
			color="var(--green)"
			loading={loading}
		/>
	);
};

export default Spinner;
