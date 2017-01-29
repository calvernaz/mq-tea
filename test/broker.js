'use strict'

const should = require('chai').should
const expect = require('chai').expect
const assert = require('chai').assert
const sinon = require('sinon')
const net = require('net')

const builder = require('../lib/builder')


describe('Broker', function () {
  describe('Pattern Matching', function () {
    let broker = builder.broker()
    it('should_ignore_dollar_subscription', function () {
      expect(broker.topic_matches_sub('$SYS/TOPIC', '/TOPIC')).to.equal(false)
    })

    it('should_match_when_topic_and_subs_are_the_same', function () {
      expect(broker.topic_matches_sub('/foo/bar', '/foo/bar')).to.equal(true)
    })

    it('should_match_when_sub_match_wildcard_topic', function () {
      expect(broker.topic_matches_sub('/foobar/#', '/foobar/topic')).to.equal(true)
    })

    it('should_match_when_sub_match_plus_wildcard_topic', function () {
      expect(broker.topic_matches_sub('/foo/+/bar', '/foo/whatever/bar')).to.equal(true)
    })

    it('should_not_match_when_wildcard_topic_doesnt_affect_subs', function () {
      expect(broker.topic_matches_sub('/foo/+/bar', 'foo/bar')).to.equal(false)
    })
  })
})