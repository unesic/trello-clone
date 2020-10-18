import React from "react";

import { SidebarContainer, Title } from "./Sidebar.module.css";
import Tags from "./Tags";

const Sidebar = () => {
	return (
		<aside className={SidebarContainer}>
			<h3 className={Title}>Tags</h3>
			<Tags />
		</aside>
	);
};

export default Sidebar;
