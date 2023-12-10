// prettier-ignore
class Emitter {
	constructor() {
		const e = this;
		e.events = {};
		e.pipes = [];
	}
	on(i, fn) {
		const e = this;
		(e.events[i] ||= []).push(fn);
		return e;
	}
	off(i, fn) {
		const e = this, m = e.events;
		m[i] = m[i]?.filter(e => fn !== e);
		return e;
	}
	once(i, fn) {
		const e = this;
		const x = (...args) => {
			e.off(i, x);
			fn.apply(e, args);
		};
		e.on(i, x);
		return e;
	}
	emit(i, args) {
        const e = this, fns = e.events[i];
		if (fns?.length) {
			for (const fn of fns) {
				fn.apply(e, args);
			}
		}
		return e;
	}
}

/*
// Example usage:
const emitter = new Emitter();
emitter.on('event', data => console.log(`Event received: ${data}`));
emitter.emit('event', ['Hello, World!']);
*/
