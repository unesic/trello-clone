import React from "react";
import { css } from "@emotion/core";
import SyncLoader from "react-spinners/SyncLoader";

const Spinner = ({ loading }) => {
	return (
		<SyncLoader
			css={css}
			size={10}
			color={"var(--green)"}
			loading={loading}
		/>
	);
};

export default Spinner;
