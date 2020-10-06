import React from "react";
import { FiX } from "react-icons/fi";

import SingleImage from "./SingleImage";

import {
	MainImagesWrapper,
	Title,
	Images,
	SingleImageWrapper,
	SingleImageInner,
	ImageUnset,
} from "../Images.module.css";

const MainImages = ({
	images,
	click,
	search,
	searchTerm,
	currentImage,
	toggleFavorite,
}) => {
	return images.length ? (
		<div className={MainImagesWrapper}>
			<h4 className={Title}>
				{!search ? "Popular" : `Search results for "${searchTerm}"`}
			</h4>
			<div className={Images}>
				<div className={SingleImageWrapper}>
					<a
						href="/"
						onClick={(e) => click(e, "unset")}
						className={`${SingleImageInner} ${ImageUnset}`}
					>
						<FiX />
					</a>
				</div>
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

export default MainImages;
