import React, { useState } from "react";
import { FiHeart, FiX } from "react-icons/fi";

import {
	SingleImageWrapper,
	SingleImageInner,
	Current,
	FavoriteButton,
	IsFavorite,
} from "../Images.module.css";

const SingleImage = ({ click, image, current, toggleFavorite }) => {
	const [icon, setIcon] = useState(<FiHeart />);

	const mouseEnterHandler = () => {
		if (image.isFavorite) {
			setIcon(<FiX />);
		}
	};

	const mouseLeaveHandler = () => {
		if (!image.IsFavorite) {
			setIcon(<FiHeart />);
		}
	};

	return (
		<div className={SingleImageWrapper}>
			<a
				href="/"
				onClick={(e) => click(e, image)}
				className={`${SingleImageInner} ${current ? Current : ""}`}
			>
				<img src={image.urls.thumb} alt={image.alt} />
			</a>
			<button
				className={`${FavoriteButton} ${
					image.isFavorite ? IsFavorite : null
				}`}
				onClick={() => toggleFavorite({ ...image, isFavorite: true })}
				onMouseEnter={mouseEnterHandler}
				onMouseLeave={mouseLeaveHandler}
			>
				{icon}
			</button>
		</div>
	);
};

export default SingleImage;
