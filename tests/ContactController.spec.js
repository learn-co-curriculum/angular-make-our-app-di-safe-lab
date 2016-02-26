// The annotate function below takes in a function, converts it into a string, parses out the argument names and adds them to an array.
// This is very similiar to how Angular does dependency injection by argument name: checkout this blog post for more information! https://toddmotto.com/angular-js-dependency-injection-annotation-process/

var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
var FN_ARG_SPLIT = /,/;
var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

function annotate (fn) {
	var $inject = [];
	fn = fn.toString();
	var first = fn.replace(STRIP_COMMENTS, '');
	var second = first.match(FN_ARGS)[1];
	var third = second.split(FN_ARG_SPLIT);
	third.forEach(function (arg) {
		arg.replace(FN_ARG, function (all, underscore, name) {
			$inject.push(name);
		});
	});
	return $inject;
}

describe('ContactController', function () {
	var $controller;

	beforeEach(module('app'));

	beforeEach(inject(function (_$controller_) {
		$controller = _$controller_;
	}));

	var annotated = annotate(ContactController);

	it('should have a $inject property', function () {
		expect(ContactController.$inject).not.toBe(undefined);
	});

	it('should have $scope and $timeout in the $inject property', function () {
		expect(ContactController.$inject[0]).toBe('$scope');
		expect(ContactController.$inject[1]).toBe('$timeout');
	});

	it('should not have $scope and $timeout as arguments', function () {
		expect(annotated).not.toContain('$scope');
		expect(annotated).not.toContain('$timeout');
	});
});
