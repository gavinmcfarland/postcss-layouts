// tooling
import postcss from "postcss";

function transformLayout(decl) {
	var values = postcss.list.space(decl.value);
	let level1Rule = decl.parent;
	let level2Rule = postcss.rule({
		selector: level1Rule.selector + " > *"
	});
	let level2Slotted = postcss.rule({
		selector: level1Rule.selector + " > ::slotted(*)"
	});

	var isFlex = "";
	let isInlineBlock = "";

	if (values[0] === "flex") {
		isFlex = true;
	}

	if (values[0] === "inline-block") {
		isInlineBlock = true;
	}

	if (isFlex) {

		// Normal flex
		decl.before({
			prop: "display",
			value: "flex"
		});

		var grow = true;
		var column = false;
		var wrap = true;
		var open = false;

		for (let _i = 0; _i < values.length; _i++) {
			if (values[_i] === "shrink") {
				grow = false;
			}
			if (values[_i] === "column") {
				column = true;
			}
			if (values[_i] === "wrap") {
				wrap = true;
			}
			if (values[_i] === "no-wrap") {
				wrap = false;
			}
			if (values[_i] === "nowrap") {
				wrap = false;
			}
			if (values[_i] === "open") {
				open = true;
			}
			if (values[_i] === "closed") {
				open = false;
			}
		}

		if (grow) {
			level2Rule.append({
				prop: "flex-grow",
				value: "1"
			});
			level2Slotted.append({
				prop: "flex-grow",
				value: "1"
			});
		}

		if (!column) {
			level2Rule.append({
				prop: "--row-grow",
				value: "0"
			});

			level2Slotted.append({
				prop: "--row-grow",
				value: "0"
			});
			level2Rule.append({
				prop: "--column-grow",
				value: "initial"
			});
			level2Slotted.append({
				prop: "--column-grow",
				value: "initial"
			});

		}

		if (column) {
			level2Rule.append({
				prop: "--column-grow",
				value: "0"
			});
			level2Slotted.append({
				prop: "--column-grow",
				value: "0"
			});
			decl.before({
				prop: "flex-direction",
				value: "column"
			});
			level2Rule.append({
				prop: "--row-grow",
				value: "initial"
			});
			level2Slotted.append({
				prop: "--row-grow",
				value: "initial"
			});
		}


		if (wrap) {
			decl.before({
				prop: "flex-wrap",
				value: "wrap"
			});

		}

		if (wrap && !open) {
			level2Rule.append({
				prop: "flex-basis",
				value: "0"
			});
			level2Slotted.append({
				prop: "flex-basis",
				value: "0"
			});
		}

		if (open) {
			level2Rule.append({
				prop: "flex-basis",
				value: "100%"
			});
			level2Slotted.append({
				prop: "flex-basis",
				value: "100%"
			});
		}

		level1Rule.before(level2Rule);
		level1Rule.before(level2Slotted);

	}

	if (isInlineBlock) {
		decl.before({
			prop: "font-size",
			value: "0.1%"
		});

		level2Rule.append(
			{
				prop: "display",
				value: "inline-block"
			},
			{
				prop: "width",
				value: "100%"
			},
			{
				prop: "font-size",
				value: "100000%"
			}
		);

		level1Rule.before(level2Rule);
	}

	decl.remove();
}

// plugin
export default postcss.plugin("postcss-postcss-layouts", opts => {
	console.log("opts", opts);

	return (root) => {
		root.walkDecls(function(decl) {
			if (decl.prop === "layout") {
				transformLayout(decl);
			}
		});
	};
});
