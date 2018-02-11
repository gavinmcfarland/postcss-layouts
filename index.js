// tooling
import postcss from "postcss";

function transformLayout(decl) {
	var values = postcss.list.space(decl.value);
	let level1Rule = decl.parent;
	let level2Rule = postcss.rule({
		selector: level1Rule.selector + " > *, " + level1Rule.selector + " > ::slotted(*)"
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
		var wrap = false;
		var open = false;

		for (let _i = 0; _i < values.length; _i++) {
			if (values[_i] === "grow") {
				grow = true;
			}
			if (values[_i] === "column") {
				column = true;
			}
			if (values[_i] === "wrap") {
				wrap = true;
			}
			if (values[_i] === "open") {
				open = true;
			}
		}

		if (grow) {
			level2Rule.append({
				prop: "--grow",
				value: "1"
			});
			level2Rule.append({
				prop: "flex-grow",
				value: "var(--grow)"
			});
		}

		if (column) {
			decl.before({
				prop: "flex-direction",
				value: "column"
			});
			decl.before({
				prop: "--direction-column",
				value: "0px !important"
			});
		} else {
			decl.before({
				prop: "--direction-row",
				value: "0px !important"
			});
		}

		if (wrap) {
			decl.before({
				prop: "flex-wrap",
				value: "wrap"
			});
		}

		if (open) {
			level2Rule.append({
				prop: "flex-basis",
				value: "100%"
			},{
				prop: "flex-shrink",
				value: "0"
			});
		}

		level1Rule.before(level2Rule);

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
