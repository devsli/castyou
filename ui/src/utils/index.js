export const elementOffset = (el) => {
	let x = 0, y = 0;

	while (el) {
		x += (el.offsetLeft + el.clientLeft);
		y += (el.offsetTop + el.clientTop);
		el = el.offsetParent;
	}

	return { x, y };
};
