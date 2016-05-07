'use strict';

const crypto = require('crypto');

const util = {
  getSha1: function (data) {
		var shasum = crypto.createHash('sha1');
  	shasum.update(data);
  	return shasum.digest('hex');
  }
};

function ListNode (value, next) {
	this.value = value;
	this.next = next || null;
	this.id = util.getSha1(value);
}

ListNode.prototype.toString = function() {
	return "[" + this.id + (this.next ? " " + this.next.id : "") + "]";
};

ListNode.prototype.toStringShort = function() {
	return "[" + this.id.slice(0, 6) + (this.next ? " " + this.next.id.slice(0, 6) : "") + "]";
};

ListNode.prototype.length = function() {
	return this.next ? 1 + this.next.length() : 1;
};

ListNode.prototype.shiftNode = function(value) {
	return new ListNode(value, this);
};

ListNode.prototype.append = function(ln) {
	if (!this.next) return ln.shiftNode(this.value);
	else return new ListNode(this.value, this.next.append(ln));


	var head = new ListNode(this.value),
					 cur = head,
					 end = this;
	while (end.next) {
		cur.next = new ListNode(end.next.value);
		cur = cur.next;
		end = end.next;
	}
	cur.next = ln;
	return head;
};

ListNode.prototype.remove = function(id) {
	if (this.id === id) return this.next;
	else if (this.next) return new ListNode(this.value, this.next.remove(id));



	if (this.id === id)
		return this.next;
	var head = new ListNode(this.value);
	var curOriginal = this;
	var curNew = head;
	while (curOriginal.next && curOriginal.next.id !== id) {
		curNew.next = new ListNode(curOriginal.next.value);
		curNew = curNew.next;
		curOriginal = curOriginal.next;
	}
	curNew.next = curOriginal.next.next;
	return head;
};

ListNode.prototype.splitAt = function(id) {
	if (this.id === id) return null;
	else if (this.next) return new ListNode(this.value, this.next.splitAt(id));

	if (this.id === id)
		return null;
	var head = new ListNode(this.value);
	var curOriginal = this;
	var curNew = head;
	while (curOriginal.next && curOriginal.next.id !== id) {
		curNew.next = new ListNode(curOriginal.next.value);
		curNew = curNew.next;
		curOriginal = curOriginal.next;
	}
	// if (curOriginal.next && curOriginal.next.id === id) {
	// 	curNew.next = new ListNode(curOriginal.next.value);
	// } 	
	return head;
};

ListNode.prototype.find = function(id) {
	if (this.id === id) return this;
	else if (this.next) return this.next.find(id);



	if (this.id === id)
		return this;
	var cur = this;
	while (cur.next && cur.next.id !== id) {
		cur = cur.next;
	}
	return cur.next || null;
};

ListNode.prototype.insertAt = function(id, ln) {
	if (this.id === id) return ln.append(this);
	else return new ListNode(this.value, this.next.insertAt(id, ln));


	var head = new ListNode(this.value);
	var curOriginal = this;
	var curNew = head;
	while (curOriginal.next && curOriginal.next.id !== id) {
		curNew.next = new ListNode(curOriginal.next.value);
		curNew = curNew.next;
		curOriginal = curOriginal.next;
	}
	var curAppend = ln;
	while (curAppend) {
		curNew.next = new ListNode(curAppend.value);
		curNew = curNew.next;
		curAppend = curAppend.next;
	}
	curNew.next = curOriginal.next;
	return head;
};

ListNode.prototype.commonAncestor = function(ln) {
	let ancestor = ln.find(this.id);
	return ancestor ? ancestor : this.next.commonAncestor(ln);



	
	var curThis = this;
	var curList = ln;
	while (curThis) {
		while (curList) {
			if (curThis.id === curList.id)
				return curThis;
			curList = curList.next;
		}
		curList = ln;
		curThis = curThis.next;
	}
	return null;
};

module.exports = { util: util, ListNode: ListNode };
