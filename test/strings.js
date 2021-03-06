/*jshint strict:false*/
/*global describe, it*/

var zSchema = require('../src/ZSchema');
var assert = require('chai').assert;

describe('Validations for string type:', function () {

    it('should pass strings with lesser length #1', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'maxLength': 5
        }, function (err, report) {
            assert.isTrue(report.valid);
            done();
        });
    });
    it('should pass strings with lesser length #2', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'maxLength': 3
        }, function (err, report) {
            assert.isTrue(report.valid);
            done();
        });
    });
    it('should pass strings with lesser length #3', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'maxLength': 1
        }, function (err) {
            assert.instanceOf(err, Error);
            done();
        });
    });
    it('should pass strings with bigger length #1', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'minLength': 1
        }, function (err, report) {
            assert.isTrue(report.valid);
            done();
        });
    });
    it('should pass strings with bigger length #2', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'minLength': 3
        }, function (err, report) {
            assert.isTrue(report.valid);
            done();
        });
    });
    it('should pass strings with bigger length #3', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'minLength': 5
        }, function (err) {
            assert.instanceOf(err, Error);
            done();
        });
    });
    //-- pattern
    it('should accept pattern on strings #1', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'pattern': ''
        }, function (err, report) {
            if (err) {
                console.log(err);
            }
            assert.isTrue(report.valid);
            done();
        });
    });
    it('should accept pattern on strings #2', function (done) {
        zSchema.validate('xxx', {
            'type': 'number',
            'pattern': ''
        }, function (err) {
            assert.instanceOf(err, Error);
            done();
        });
    });
    it('should accept pattern on strings #3', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'pattern': 5
        }, function (err) {
            assert.instanceOf(err, Error);
            done();
        });
    });
    it('should pass pattern validation #1', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'pattern': '^xxx$'
        }, function (err, report) {
            if (err) {
                console.log(err);
            }
            assert.isTrue(report.valid);
            done();
        });
    });
    it('should pass pattern validation #2', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'pattern': '^xxxx$'
        }, function (err) {
            assert.instanceOf(err, Error);
            done();
        });
    });

    zSchema.registerFormat('xstring', function (str) {
        return str === 'xxx';
    });

    it('should pass format validation', function (done) {
        zSchema.validate('xxx', {
            'type': 'string',
            'format': 'xstring'
        }, function (err, report) {
            if (err) {
                console.log(err);
            }
            assert.isTrue(report.valid);
            done();
        });
    });
    it('should not pass format validation', function (done) {
        zSchema.validate('yyy', {
            'type': 'string',
            'format': 'xstring'
        }, function (err) {
            assert.instanceOf(err, Error);
            done();
        });
    });

    it('should pass date validation', function (done) {
        zSchema.validate('9999-12-31', {
            'type': 'string',
            'format': 'date'
        }, function (err, report) {
            assert.isTrue(report.valid);
            done();
        });
    });

    it('should pass uri format validation', function (done) {
        zSchema.validate('http://example.com', {
            'type': 'string',
            'format': 'uri'
        }, function (err, report) {
            if (err) {
                console.log(err);
            }
            assert.isTrue(!err);
            if (report) {
                assert.isTrue(report.valid);
            }
            done();
        });
    });
    it('should not pass uri format validation', function (done) {
        zSchema.validate('foobar http://example.com foobar', {
            'type': 'string',
            'format': 'uri'
        }, function (err, report) {
            assert.instanceOf(err, Error);
            if (report) {
                assert.isFalse(report.valid);
            }
            done();
        });
    });
});
