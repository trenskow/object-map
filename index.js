'use strict';

exports = module.exports = {
	keys: (obj, transform) => {
		if (typeof obj !== 'object' || Array.isArray(obj)) throw TypeError('Input is not an object.');
		let result = {};
		Object.keys(obj).forEach((key, idx) => {
			result[transform(key, obj[key], idx)] = obj[key];
		});
		return result;
	},
	values: (obj, transform) => {
		if (typeof obj !== 'object' || Array.isArray(obj)) throw TypeError('Input is not an object.');
		let result = {};
		Object.keys(obj).forEach((key, idx) => {
			result[key] = transform(key, obj[key], idx);
		});
		return result;
	},
	both: (obj, transform) => {
		if (typeof obj !== 'object' || Array.isArray(obj)) throw TypeError('Input is not an object.');
		let result = {};	
		Object.keys(obj).forEach((key, idx) => {
			const [newKey, value] = transform(key, obj[key], idx);
			result[newKey] = value;
		});
		return result;
	},
	async: {
		keys: async (obj, transform) => {
			if (typeof obj !== 'object' || Array.isArray(obj)) throw TypeError('Input is not an object.');
			let result = {};
			await Promise.all(Object.keys(obj).map(async (key, idx) => {
				result[await Promise.resolve(transform(key, obj[key], idx))] = obj[key];
			}));
			return result;
		},
		values: async (obj, transform) => {
			if (typeof obj !== 'object' || Array.isArray(obj)) throw TypeError('Input is not an object.');
			let result = {};
			await Promise.all(Object.keys(obj).map(async (key, idx) => {
				result[key] = await Promise.resolve(transform(key, obj[key], idx));
			}));
			return result;
		},
		both: async (obj, transform) => {
			if (typeof obj !== 'object' || Array.isArray(obj)) throw TypeError('Input is not an object.');
			let result = {};
			await Promise.all(Object.keys(obj).map(async (key, idx) => {
				const [newKey, value] = await Promise.resolve(transform(key, obj[key], idx));
				result[newKey] = value;
			}));
			return result;
		}
	}
};
