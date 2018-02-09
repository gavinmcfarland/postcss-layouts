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
		level2Rule.append({
			prop: "--grow",
			value: "1"
		});
		level2Rule.append({
			prop: "flex-grow",
			value: "var(--grow)"
		});

		for (let _i = 0; _i < values.length; _i++) {
			if (values[_i] === "wrap") {
				decl.before({
					prop: "flex-wrap",
					value: "wrap"
				});
			}
			if (values[_i] === "nowrap") {
				decl.before({
					prop: "flex-wrap",
					value: "nowrap"
				});
			}
			if (values[_i] === "open") {
				level2Rule.append({
					prop: "flex-basis",
					value: "100%"
				},{
					prop: "flex-shrink",
					value: "0"
				});
			}
			if (values[_i] === "closed") {
				decl.before({
					prop: "flex-basis",
					value: "auto"
				});
			}
			if (values[_i] === "grow") {
				decl.before({
					prop: "flex-grow",
					value: "1"
				});
			}
			if (values[_i] === "shrink") {
				level2Rule.append({
					prop: "flex-shrink",
					value: "0"
				});
			}
			if (values[_i] === "column") {
				decl.before({
					prop: "flex-direction",
					value: "column"
				});
			}
			if (values[_i] === "row") {
				decl.before({
					prop: "flex-direction",
					value: "row"
				});
			}
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



	// values.forEach((value) => {
	// 	if (value === "flex") {
	// 		decl.before({
	// 			prop: "display",
	// 			value: "flex"
	// 		});
    //
	// 		level2Rule.append({
	// 			prop: "flex-grow",
	// 			value: "1"
	// 		});
    //
	// 		level1Rule.before(level2Rule);
    //
	// 	}
	// 	if (value === "wrap") {
	// 		decl.before({
	// 			prop: "flex-wrap",
	// 			value: "wrap"
	// 		});
	// 	}
	// 	if (value === "open") {
	// 		level2Rule.append({
	// 			prop: "flex-basis",
	// 			value: "100%"
	// 		});
    //
	// 		// level1Rule.before(level2Rule);
	// 	}
    //
	// 	if (value === "shrink") {
	// 		level2Rule.append({
	// 			prop: "flex-shrink",
	// 			value: "0"
	// 		});
    //
	// 		// level1Rule.before(level2Rule);
	// 	}
    //
	// 	if (value === "column") {
	// 		decl.before({
	// 			prop: "flex-direction",
	// 			value: "column"
	// 		});
	// 	}
    //
	// 	if (value === "inline-block") {
	// 		decl.before({
	// 			prop: "font-size",
	// 			value: "0.1%"
	// 		});
    //
	// 		level2Rule.append(
	// 			{
	// 				prop: "display",
	// 				value: "inline-block"
	// 			},
	// 			{
	// 				prop: "width",
	// 				value: "100%"
	// 			},
	// 			{
	// 				prop: "font-size",
	// 				value: "100000%"
	// 			}
	// 		);
    //
	// 		level1Rule.before(level2Rule);
	// 	}
    //
    //
    //
	// });





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
