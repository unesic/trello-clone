import React from "react";

import {
	PreviousImagesWrapper,
	Title,
	Images,
	SingleImageWrapper,
	SingleImage,
} from "../Images.module.css";

const PreviousImages = ({ images, click, search }) => {
	return !search && images.length ? (
		<div className={PreviousImagesWrapper}>
			<h4 className={Title}>Recently picked</h4>
			<div className={Images}>
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
	) : null;
};

export default PreviousImages;
