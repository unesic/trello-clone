import React, { useState, useEffect } from "react";

import {
	ProgressBarContainer,
	ProgressPercentage,
	ProgressBarWrapper,
	ProgressSlider,
} from "./ProgressBar.module.css";

const ProgressBar = ({ checklist }) => {
	const [{ done, total }, setItemsDone] = useState({ done: 0, total: 0 });

	useEffect(() => {
		if (checklist && checklist.length) {
			const { done } = checklist.reduce((a, b) => ({
				done: a.done + b.done,
			}));

			setItemsDone({
				done,
				total: checklist.length,
			});
		}
	}, [checklist]);

	return checklist && checklist.length ? (
		<div className={ProgressBarContainer}>
			<span className={ProgressPercentage}>{`${Math.floor(
				(done / total) * 100
			)}%`}</span>
			<div className={ProgressBarWrapper}>
				<div
					className={ProgressSlider}
					style={{ width: `${(done / total) * 100}%` }}
				></div>
			</div>
		</div>
	) : null;
};

export default ProgressBar;
