import React from "react";

import { SidebarContainer, Title } from "./Sidebar.module.css";
import Tags from "./Tags";

const Sidebar = ({ tags: itemTags, dispatch }) => {
	return (
		<aside className={SidebarContainer}>
			<h3 className={Title}>Tags</h3>
			<Tags itemTags={itemTags} dispatch={dispatch} />
		</aside>
	);
};

export default Sidebar;
