import React from "react";

import SingleImage from "./SingleImage";

import { PreviousImagesWrapper, Title, Images } from "../Images.module.css";

const PreviousImages = ({
	images,
	click,
	search,
	toggleFavorite,
}) => {
	return !search && images.length ? (
		<div className={PreviousImagesWrapper}>
			<h4 className={Title}>Recently picked</h4>
			<div className={Images}>
				{images.map((image) => (
					<SingleImage
						key={image.id}
						click={click}
						image={image}
						current={false}
						toggleFavorite={toggleFavorite}
					/>
				))}
			</div>
		</div>
	) : null;
};

export default PreviousImages;
