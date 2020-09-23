import React from "react";
import { FiX } from "react-icons/fi";

import {
	MainImagesWrapper,
	Title,
	Images,
	SingleImageWrapper,
	SingleImage,
	ImageUnset,
} from "../Images.module.css";

const MainImages = ({ images, click, search, searchTerm }) => {
	return (
		<div className={MainImagesWrapper}>
			<h4 className={Title}>{!search ? "Popular" : `Search results for "${searchTerm}"`}</h4>
			<div className={Images}>
				<div className={SingleImageWrapper}>
					<a
						href="/"
						onClick={(e) => click(e, "unset")}
						className={`${SingleImage} ${ImageUnset}`}
					>
						<FiX />
					</a>
				</div>
				{images.map((image, i) => (
					<div key={i} className={SingleImageWrapper}>
						<a
							href="/"
							onClick={(e) => click(e, image)}
							className={SingleImage}
						>
							<img src={image.urls.thumb} alt={image.alt} />
						</a>
					</div>
				))}
			</div>
		</div>
	);
};

export default MainImages;
