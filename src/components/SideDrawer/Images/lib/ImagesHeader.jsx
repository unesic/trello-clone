import React from "react";
import { FiSearch } from "react-icons/fi";

import {
	ImagesHeader,
	Title,
	MainTitle,
	SearchField,
	SFLabel,
	SFInput,
	Active,
} from "../Images.module.css";

const Header = ({ searchTerm, onChange, onKeyUp, onFocus, onBlur }) => {
	return (
		<header className={ImagesHeader}>
			<h3 className={`${Title} ${MainTitle}`}>Images</h3>
			<div className={SearchField}>
				<input
					id="search-field"
					name="search-field"
					type="text"
					className={`${SFInput} ${searchTerm ? Active : ""}`}
					value={searchTerm}
					onChange={onChange}
					onKeyUp={onKeyUp}
					onFocus={onFocus}
					onBlur={onBlur}
				/>
				<label htmlFor="search-field" className={SFLabel}>
					<FiSearch /> Search images
				</label>
			</div>
		</header>
	);
};

export default Header;
