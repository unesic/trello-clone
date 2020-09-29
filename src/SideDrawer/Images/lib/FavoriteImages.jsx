import React from "react";

import SingleImage from "./SingleImage";

import { FavoriteImagesWrapper, Title, Images } from "../Images.module.css";

const FavoriteImages = ({
	images,
	click,
	search,
	currentImage,
	toggleFavorite,
}) => {
	return !search && images.length ? (
		<div className={FavoriteImagesWrapper}>
			<h4 className={Title}>Your collection</h4>
			<div className={Images}>
				{images.map((image) => (
					<SingleImage
						key={image.id}
						click={click}
						image={image}
						current={image.id === currentImage}
						toggleFavorite={toggleFavorite}
					/>
				))}
			</div>
		</div>
	) : null;
};

export default FavoriteImages;
