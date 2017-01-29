'use strict'

const expect = require('chai').expect
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

    it('#_is_valid_wildcard_receive_all_messages', function () {
      expect(broker.topic_matches_sub('#', '/foobar/bar')).to.equal(true)
    })

    it('#_not_valid_terminator_character_for_a_topic', function() {
      expect(broker.topic_matches_sub('sport/tennis#', '/sport/tennis/')).to.equal(false)
    })

    it('#_not_valid_as_subtopic_character', function () {
      expect(broker.topic_matches_sub('sport/tennis/#/ranking', 'sport/tennis/bar')).to.equal(false)
    })

    it('slashed_topic_are_different_from_non_slashed_ones', function () {
      expect(broker.topic_matches_sub('/finance', 'finance')).to.equal(false)
    })
  })
})