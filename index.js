// tooling
import postcss from "postcss";

function transformLayout(decl) {
	let level1Rule = decl.parent;
	let level2Rule = postcss.rule({
		selector: level1Rule.selector + " > *"
	});

	if (decl.value === "flex") {

		decl.before({
			prop: "display",
			value: "flex"
		});
		decl.before({
			prop: "flex-wrap",
			value: "wrap"
		});

		level2Rule.append({
			prop: "flex-basis",
			value: "100%"
		});

		level1Rule.before(level2Rule);

		decl.remove();
	}
	if (decl.value === "inline-block") {

		decl.before({
			prop: "font-size",
			value: "0.1%"
		});

		level2Rule.append({
			prop: "display",
			value: "inline-block"
		},{
			prop: "width",
			value: "100%"
		},{
			prop: "font-size",
			value: "100000%"
		});

		level1Rule.before(level2Rule);

		decl.remove();
	}

}

// plugin
export default postcss.plugin("postcss-postcss-layouts", opts => {
	console.log("opts", opts);

	return (root, result) => {
		console.log("root, result", root, result);
		root.walkDecls(function(decl) {
			if (decl.prop === "layout") {
				transformLayout(decl);
			}
		});
	};
});
