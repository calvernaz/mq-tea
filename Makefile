PATH := node_modules/.bin:$(PATH)

TESTS = test/*test*.js
DOCS = documentation
REPORTER = spec

docs:
	@jsdoc -r *.js -d $(DOCS)

debug:
	@export NODE_ENV=development; DEBUG=mq-tea ./bin/start

test:
	@mocha \
	--require should \
	--reporter $(REPORTER) \
	--growl \
	$(TESTS)

test-ci:
	@mocha \
	--require should \
	--reporter $(REPORTER) \
	--growl \
	--watch
	$(TESTS)

prod:
	@NODE_ENV=production ./bin/start

.PHONY: test test-ci
