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
        /*var lastNode = this.lastNode,
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

        return this;*/

        if (this._length === 0) {
            return this.insert(0, ...nodes);
        } else {
            return this.insert(this._length - 1, ...nodes);
        }
    }

    prepend(...nodes) {
        /*var firstNode = new listNode(nodes[0]),
            newNode,
            lastNode = firstNode,
            i;

        this._length += 1;

        for (i = 1; i < nodes.length; i += 1) {
            newNode = new listNode(nodes[i]);
            lastNode.next = newNode;
            lastNode = newNode;
            this._length += 1;
        }

        lastNode.next = this._head;
        this._head = firstNode;*/
        return this.insert(0, ...nodes);

        //return this;
    }

    insert(index, ...nodes) {
        var i,
            nodeAtIndex,
            firstNode = new listNode(nodes[0]),
            newNode,
            lastNode = firstNode,
            parentNode;

        if ((0 > index || index > this._length - 1) && (index !== 0)) {
            return this;
        }

        nodeAtIndex = this._head;
        for (i = 0; i < index; i += 1) {
            parentNode = nodeAtIndex;
            nodeAtIndex = nodeAtIndex.next;
        }
        if (index === this._length - 1) {
            parentNode = nodeAtIndex;
            nodeAtIndex = nodeAtIndex.next;
        }

        this._length += 1;
        for (i = 1; i < nodes.length; i += 1) {
            newNode = new listNode(nodes[i]);
            lastNode.next = newNode;
            lastNode = newNode;
            this._length += 1;
        }

        lastNode.next = nodeAtIndex;
        if (parentNode) {
            parentNode.next = firstNode;
        } else {
            this._head = firstNode;
        }

        return this;
    }

    toString() {
        var currentNode = this._head,
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
