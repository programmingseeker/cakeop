export default (fn) => (...args) =>
	Promise.resolve(fn(...args)).catch(args[args.length - 1]);
