TESTS = test/*test*.js
REPORTER = spec

test:
	@./node_modules/.bin/mocha \
	--require should \
	--reporter $(REPORTER) \
	--growl \
	$(TESTS)

test-ci:
	@./node_modules/.bin/mocha \
	--require should \
	--reporter $(REPORTER) \
	--growl \
	--watch
	$(TESTS)

.PHONY: test test-ci
