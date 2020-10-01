import { useCallback, useState } from "react";

const useToggle = (initialValue = false) => {
	const [state, setState] = useState(initialValue);

	const toggleState = useCallback(() => {
		setState(!state);
	}, [state]);

	return [state, toggleState];
};

export default useToggle;
