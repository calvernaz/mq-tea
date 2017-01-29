'use strict';

module.exports = Broker
function Broker() {}

/* Check that a topic used for subscriptions is valid.
 * Search for + or # in a topic, check they aren't in invalid positions such as
 * foo/#/bar, foo/+bar or foo/bar#.
 */
Broker.prototype.sub_topic_check = function (topic)
{

}

Broker.prototype.topic_matches_sub = function (sub, topic)
{
  if (!sub) return false
  if (!topic) return false

  let multilevel_wildcard = false
  let result
  let spos = 0, tpos = 0
  let slen = sub.length
  let tlen = topic.length

  if (slen && tlen) {
    if ((sub[0] === '$' && topic[0] !== '$')
      || (topic[0] === '$' && sub[0] !== '$')) {
      return false;
    }
  }

  while (spos < slen && tpos < tlen) {
    if (sub[spos] == topic[tpos]) {
      if (tpos == tlen - 1) {
        /* Check for e.g. foo matching foo/# */
        if (spos == slen - 3 && sub[spos + 1] == '/' && sub[spos + 2] == '#') {
          multilevel_wildcard = true;
          return true;
        }
      }
      spos++;
      tpos++;
      if (spos == slen && tpos == tlen) {
        result = true;
        return result;
      } else if (tpos == tlen && spos == slen - 1 && sub[spos] == '+') {
        spos++;
        return true;
      }
    } else {
      if (sub[spos] == '+') {
        spos++;
        while (tpos < tlen && topic[tpos] != '/') {
          tpos++;
        }
        if (tpos == tlen && spos == slen) {
          return true;
        }
      } else if (sub[spos] == '#') {
        multilevel_wildcard = true;
        if (spos + 1 != slen) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  }

  if (multilevel_wildcard == false && (tpos < tlen || spos < slen)) {
    result = false;
  }
  return result
}