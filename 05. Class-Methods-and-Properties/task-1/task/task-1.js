'use strict';

class listNode {
    constructor(value) {
        this._data = value;
        this._next = null;
    }

    get data() {
        return this._data;
    }

    get next() {
        return this._next;
    }

    set next(value) {
        this._next = value;
    }
}



class LinkedList {
    constructor() {
        this._length = 0;
        this._head = null;

        return this;
    }

    //properties

    get first() {
        if (this._head !== null) {
            return this._head.data;
        }
        return undefined;
    }

    get last() {
        var currentNode;

        if (this._head !== null) {
            currentNode = this._head;
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }
            return currentNode.data;
        }
        return undefined;
    }

    get length() {
        return this._length;
    }

    get lastNode() {
        var currentNode;

        if (this._head !== null) {
            currentNode = this._head;
            while (currentNode.next !== null) {
                currentNode = currentNode.next;
            }
            return currentNode;
        }
        return undefined;
    }

    //methods
    append(...nodes) {
        var lastNode = this.lastNode,
            newNode,
            i;

        if (this._length === 0) {
            this._head = new listNode(nodes[0]);
            lastNode = this._head;
            this._length += 1;
            for (i = 1; i < nodes.length; i += 1) {
                newNode = new listNode(nodes[i]);
                lastNode.next = newNode;
                lastNode = newNode;
                this._length += 1;
            }
        } else {
            for (i = 0; i < nodes.length; i += 1) {
                newNode = new listNode(nodes[i]);
                lastNode.next = newNode;
                lastNode = newNode;
                this._length += 1;
            }
        }

        return this;
    }

    toString() {
        var i,
            currentNode = this._head,
            result = '';

        if (currentNode === null) {
            return '';
        }
        while (currentNode !== null) {
            if (currentNode === this._head) {
                result += `${currentNode.data}`;
            } else {
                result += ` -> ${currentNode.data}`;
            }
            currentNode = currentNode.next;
        }

        return result;
    }
}

module.exports = LinkedList;
