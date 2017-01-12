TESTS = test/*test*.js
DOCS = documentation

REPORTER = spec

docs:
	@./node_modules/.bin/jsdoc -r *.js -d $(DOCS)

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
