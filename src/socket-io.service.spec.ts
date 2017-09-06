import 'reflect-metadata';

import { Observable } from 'rxjs/Rx';

import { WrappedSocket as IOSocket } from './socket-io.service';

describe('Service', () => {
	let socket: any;

	beforeEach(() => {
		socket = new IOSocket({ url });
	});

	const url = 'http://localhost:3000';
	const event = 'event';
	const callback = function() {};

	it('should exist', () => {
		expect(IOSocket).toEqual(jasmine.any(Function));
		const socket = new IOSocket({ url });
		expect(socket.ioSocket).toEqual(jasmine.any(Object));
	});

	describe('on', () => {
		it('should call socket.on with event and callback', () => {
			const spy = spyOn(socket.ioSocket, 'on');
			socket.on(event, callback);
			expect(spy).toHaveBeenCalledWith(event, callback);
		});
	});

	describe('once', () => {
		it('should call socket.once with event and callback', () => {
			const spy = spyOn(socket.ioSocket, 'once');
			socket.once(event, callback);
			expect(spy).toHaveBeenCalledWith(event, callback);
		});
	});

	describe('connect', () => {
		it('should call socket.connect', () => {
			const spy = spyOn(socket.ioSocket, 'connect');
			socket.connect();
			expect(spy).toHaveBeenCalledWith();
		});
	});

	describe('disconnect', () => {
		it('should call socket.disconnect', () => {
			const spy = spyOn(socket.ioSocket, 'disconnect');
			const args = [{}];
			socket.disconnect(...args);
			expect(spy).toHaveBeenCalledWith(...args);
		});
	});

	describe('emit', () => {
		it('should call socket.emit with arguments', () => {
			const spy = spyOn(socket.ioSocket, 'emit');
			const args = [event, { data: 'data' }, callback];
			socket.emit(...args);
			expect(spy).toHaveBeenCalledWith(...args);
		});
	});

	describe('removeListener', () => {
		it('should call socket.removeListener with arguments', () => {
			const spy = spyOn(socket.ioSocket, 'removeListener');
			socket.removeListener(event, callback);
			expect(spy).toHaveBeenCalledWith(event, callback);
		});
	});

	describe('removeAllListener', () => {
		it('should call socket.removeAllListener with event', () => {
			const spy = spyOn(socket.ioSocket, 'removeAllListeners');
			socket.removeAllListeners(event);
			expect(spy).toHaveBeenCalledWith(event);
		});
	});

	describe('fromEvent', () => {
		it('should create an Observable from an event', () => {
			const obs = socket.fromEvent(event);
			expect(obs).toEqual(jasmine.any(Observable));
		});

		it('should be subscribable', () => {
			const obs = socket.fromEvent(event);
			const spy = spyOn(socket.ioSocket, 'on');
			obs.subscribe();
			expect(spy).toHaveBeenCalledWith(event, jasmine.any(Function));
		});

		it('should be unsubscribable', () => {
			const obs = socket.fromEvent(event);
			const sub = obs.subscribe();
			const spy = spyOn(socket.ioSocket, 'removeListener');
			sub.unsubscribe();
			expect(spy).toHaveBeenCalledWith(event);
		});
	});

	describe('fromEventOnce', () => {
		it('should create a Promise from an event once', () => {
			const spy = spyOn(socket.ioSocket, 'once');
			const promise = socket.fromEventOnce(event);
			expect(promise).toEqual(jasmine.any(Promise));
			expect(spy).toHaveBeenCalledWith(event, jasmine.any(Function));
		});
	});
});
