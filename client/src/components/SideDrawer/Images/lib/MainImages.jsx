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
	search = false,
	title = "",
	searchTerm,
	currentImage,
	toggleFavorite,
}) => {
	return images.length ? (
		<div className={MainImagesWrapper}>
			<h4 className={Title}>
				{!search
					? title !== ""
						? title
						: "Popular"
					: `Search results for "${searchTerm}"`}
			</h4>
			<div className={Images}>
				<div className={SingleImageWrapper}>
					<button
						type="button"
						onClick={() => click("unset")}
						className={`${SingleImageInner} ${ImageUnset}`}
					>
						<FiX />
					</button>
				</div>
				{images.map((image) => (
					<SingleImage
						key={image.id}
						click={click}
						image={image}
						current={image.id === currentImage}
						toggleFavorite={
							typeof toggleFavorite === "function"
								? toggleFavorite
								: () => {}
						}
						hasFavorite
					/>
				))}
			</div>
		</div>
	) : null;
};

export default MainImages;
