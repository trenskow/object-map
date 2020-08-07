'use strict';

const
	{expect } = require('chai');

const
	objectMap = require('../');

require('chai').use(require('chai-as-promised'));

const testData = {
	key1: 'value1',
	key2: 'value2'
};

describe('Mapping keys', () => {

	describe('sync', () => {
		it ('should throw an error if input is not an object when mapping keys', () => {
			expect(() => {
				objectMap.keys([]);
			}).to.throw(TypeError);
		});
		it ('should map keys', () => {
			expect(objectMap.keys(testData, (key, value, idx) => {
				return key + value + idx;
			})).to.eql({
				'key1value10': 'value1',
				'key2value21': 'value2'
			});
		});
		it ('should throw an error if input is not an object when mapping values', () => {
			expect(() => {
				objectMap.values([]);
			}).to.throw(TypeError);
		});
		it ('should map values', () => {
			expect(objectMap.values(testData, (key, value, idx) => {
				return key + value + idx;
			})).to.eql({
				key1: 'key1value10',
				key2: 'key2value21'
			});
		});
		it ('should throw an error if input is not an object when mapping both', () => {
			expect(() => {
				objectMap.both([]);
			}).to.throw(TypeError);
		});
		it ('should map both', () => {
			expect(objectMap.both(testData, (key, value, idx) => {
				return ['key' + key + value + idx, 'value' + key + value + idx];
			})).to.eql({
				'keykey1value10': 'valuekey1value10',
				'keykey2value21': 'valuekey2value21'
			});
		});
	});

	describe('async', () => {
		it ('should throw an error if input is not an object when mapping keys', async () => {
			return expect(objectMap.async.keys([])).to.eventually.be.rejectedWith(TypeError);
		});
		it ('should map keys', () => {
			return expect(objectMap.async.keys(testData, (key, value, idx) => {
				return key + value + idx;
			})).to.eventually.eql({
				'key1value10': 'value1',
				'key2value21': 'value2'
			});
		});
		it ('should throw an error if input is not an object when mapping values', () => {
			return expect(objectMap.async.values([])).to.eventually.be.rejectedWith(TypeError);
		});
		it ('should map values', () => {
			expect(objectMap.async.values(testData, (key, value, idx) => {
				return key + value + idx;
			})).to.eventually.eql({
				key1: 'key1value10',
				key2: 'key2value21'
			});
		});
		it ('should throw an error if input is not an object when mapping both', () => {
			return expect(objectMap.async.both([])).to.eventually.be.rejectedWith(TypeError);
		});
		it ('should map both', () => {
			return expect(objectMap.async.both(testData, (key, value, idx) => {
				return ['key' + key + value + idx, 'value' + key + value + idx];
			})).to.eventually.eql({
				'keykey1value10': 'valuekey1value10',
				'keykey2value21': 'valuekey2value21'
			});
		});
	});

});
