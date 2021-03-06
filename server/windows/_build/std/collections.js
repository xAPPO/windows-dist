/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
/**
 * A simple map to store value by a key object. Key can be any object that has toString() function to get
 * string value of the key.
 */
class LinkedMap {
    constructor() {
        this.map = Object.create(null);
        this._size = 0;
    }
    get size() {
        return this._size;
    }
    get(k) {
        const value = this.peek(k);
        return value ? value : null;
    }
    getOrSet(k, t) {
        const res = this.get(k);
        if (res) {
            return res;
        }
        this.set(k, t);
        return t;
    }
    keys() {
        const keys = [];
        for (let key in this.map) {
            keys.push(this.map[key].key);
        }
        return keys;
    }
    values() {
        const values = [];
        for (let key in this.map) {
            values.push(this.map[key].value);
        }
        return values;
    }
    entries() {
        const entries = [];
        for (let key in this.map) {
            entries.push(this.map[key]);
        }
        return entries;
    }
    set(k, t) {
        if (this.get(k)) {
            return false; // already present!
        }
        this.push(k, t);
        return true;
    }
    delete(k) {
        let value = this.get(k);
        if (value) {
            this.pop(k);
            return value;
        }
        return null;
    }
    has(k) {
        return !!this.get(k);
    }
    clear() {
        this.map = Object.create(null);
        this._size = 0;
    }
    push(key, value) {
        const entry = { key, value };
        this.map[key.toString()] = entry;
        this._size++;
    }
    pop(k) {
        delete this.map[k.toString()];
        this._size--;
    }
    peek(k) {
        const entry = this.map[k.toString()];
        return entry ? entry.value : null;
    }
}
exports.LinkedMap = LinkedMap;
/**
 * A simple Map<T> that optionally allows to set a limit of entries to store. Once the limit is hit,
 * the cache will remove the entry that was last recently added. Or, if a ratio is provided below 1,
 * all elements will be removed until the ratio is full filled (e.g. 0.75 to remove 25% of old elements).
 */
class BoundedLinkedMap {
    constructor(limit = Number.MAX_VALUE, ratio = 1) {
        this.limit = limit;
        this.map = Object.create(null);
        this._size = 0;
        this.ratio = limit * ratio;
    }
    get size() {
        return this._size;
    }
    set(key, value) {
        if (this.map[key]) {
            return false; // already present!
        }
        const entry = { key, value };
        this.push(entry);
        if (this._size > this.limit) {
            this.trim();
        }
        return true;
    }
    get(key) {
        const entry = this.map[key];
        return entry ? entry.value : null;
    }
    getOrSet(k, t) {
        const res = this.get(k);
        if (res) {
            return res;
        }
        this.set(k, t);
        return t;
    }
    delete(key) {
        const entry = this.map[key];
        if (entry) {
            this.map[key] = void 0;
            this._size--;
            if (entry.next) {
                entry.next.prev = entry.prev; // [A]<-[x]<-[C] = [A]<-[C]
            }
            else {
                this.head = entry.prev; // [A]-[x] = [A]
            }
            if (entry.prev) {
                entry.prev.next = entry.next; // [A]->[x]->[C] = [A]->[C]
            }
            else {
                this.tail = entry.next; // [x]-[A] = [A]
            }
            return entry.value;
        }
        return null;
    }
    has(key) {
        return !!this.map[key];
    }
    clear() {
        this.map = Object.create(null);
        this._size = 0;
        this.head = null;
        this.tail = null;
    }
    push(entry) {
        if (this.head) {
            // [A]-[B] = [A]-[B]->[X]
            entry.prev = this.head;
            this.head.next = entry;
        }
        if (!this.tail) {
            this.tail = entry;
        }
        this.head = entry;
        this.map[entry.key] = entry;
        this._size++;
    }
    trim() {
        if (this.tail) {
            // Remove all elements until ratio is reached
            if (this.ratio < this.limit) {
                let index = 0;
                let current = this.tail;
                while (current.next) {
                    // Remove the entry
                    this.map[current.key] = void 0;
                    this._size--;
                    // if we reached the element that overflows our ratio condition
                    // make its next element the new tail of the Map and adjust the size
                    if (index === this.ratio) {
                        this.tail = current.next;
                        this.tail.prev = null;
                        break;
                    }
                    // Move on
                    current = current.next;
                    index++;
                }
            }
            else {
                this.map[this.tail.key] = void 0;
                this._size--;
                // [x]-[B] = [B]
                this.tail = this.tail.next;
                this.tail.prev = null;
            }
        }
    }
}
exports.BoundedLinkedMap = BoundedLinkedMap;
/**
 * A subclass of Map<T> that makes an entry the MRU entry as soon
 * as it is being accessed. In combination with the limit for the
 * maximum number of elements in the cache, it helps to remove those
 * entries from the cache that are LRU.
 */
class LRUCache extends BoundedLinkedMap {
    constructor(limit) {
        super(limit);
    }
    get(key) {
        // Upon access of an entry, make it the head of
        // the linked map so that it is the MRU element
        const entry = this.map[key];
        if (entry) {
            this.delete(key);
            this.push(entry);
            return entry.value;
        }
        return null;
    }
}
exports.LRUCache = LRUCache;
// --- trie'ish datastructure
class Node {
    constructor() {
        this.children = new Map();
    }
}
/**
 * A trie map that allows for fast look up when keys are substrings
 * to the actual search keys (dir/subdir-problem).
 */
class TrieMap {
    constructor(splitter) {
        this._root = new Node();
        this._splitter = splitter;
    }
    insert(path, element) {
        const parts = this._splitter(path);
        let i = 0;
        // find insertion node
        let node = this._root;
        for (; i < parts.length; i++) {
            let child = node.children[parts[i]];
            if (child) {
                node = child;
                continue;
            }
            break;
        }
        // create new nodes
        let newNode;
        for (; i < parts.length; i++) {
            newNode = new Node();
            node.children[parts[i]] = newNode;
            node = newNode;
        }
        node.element = element;
    }
    lookUp(path) {
        const parts = this._splitter(path);
        let { children } = this._root;
        let node;
        for (const part of parts) {
            node = children[part];
            if (!node) {
                return;
            }
            children = node.children;
        }
        return node.element;
    }
    findSubstr(path) {
        const parts = this._splitter(path);
        let lastNode;
        let { children } = this._root;
        for (const part of parts) {
            const node = children[part];
            if (!node) {
                break;
            }
            if (node.element) {
                lastNode = node;
            }
            children = node.children;
        }
        // return the last matching node
        // that had an element
        if (lastNode) {
            return lastNode.element;
        }
    }
    findSuperstr(path) {
        const parts = this._splitter(path);
        let { children } = this._root;
        let node;
        for (const part of parts) {
            node = children[part];
            if (!node) {
                return;
            }
            children = node.children;
        }
        const result = new TrieMap(this._splitter);
        result._root = node;
        return result;
    }
}
TrieMap.PathSplitter = (s) => s.split(/[\\/]/).filter(s => !!s);
exports.TrieMap = TrieMap;
class ArraySet {
    constructor(elements = []) {
        this._elements = elements.slice();
    }
    get size() {
        return this._elements.length;
    }
    set(element) {
        this.unset(element);
        this._elements.push(element);
    }
    contains(element) {
        return this._elements.indexOf(element) > -1;
    }
    unset(element) {
        const index = this._elements.indexOf(element);
        if (index > -1) {
            this._elements.splice(index, 1);
        }
    }
    get elements() {
        return this._elements.slice();
    }
}
exports.ArraySet = ArraySet;
/**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default ist zero).
 */
function tail(array, n = 0) {
    return array[array.length - (1 + n)];
}
exports.tail = tail;
function equals(one, other, itemEquals = (a, b) => a === b) {
    if (one.length !== other.length) {
        return false;
    }
    for (let i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
exports.equals = equals;
function binarySearch(array, key, comparator) {
    let low = 0, high = array.length - 1;
    while (low <= high) {
        let mid = ((low + high) / 2) | 0;
        let comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
exports.binarySearch = binarySearch;
/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */
function findFirst(array, p) {
    let low = 0, high = array.length;
    if (high === 0) {
        return 0; // no children
    }
    while (low < high) {
        let mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
            high = mid;
        }
        else {
            low = mid + 1;
        }
    }
    return low;
}
exports.findFirst = findFirst;
/**
 * Returns the top N elements from the array.
 *
 * Faster than sorting the entire array when the array is a lot larger than N.
 *
 * @param array The unsorted array.
 * @param compare A sort function for the elements.
 * @param n The number of elements to return.
 * @return The first n elemnts from array when sorted with compare.
 */
function top(array, compare, n) {
    if (n === 0) {
        return [];
    }
    const result = array.slice(0, n).sort(compare);
    for (let i = n, m = array.length; i < m; i++) {
        const element = array[i];
        if (compare(element, result[n - 1]) < 0) {
            result.pop();
            const j = findFirst(result, e => compare(element, e) < 0);
            result.splice(j, 0, element);
        }
    }
    return result;
}
exports.top = top;
/**
 * @returns a new array with all undefined or null values removed. The original array is not modified at all.
 */
function coalesce(array) {
    if (!array) {
        return array;
    }
    return array.filter(e => !!e);
}
exports.coalesce = coalesce;
/**
 * Moves the element in the array for the provided positions.
 */
function move(array, from, to) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}
exports.move = move;
/**
 * @returns {{false}} if the provided object is an array
 * 	and not empty.
 */
function isFalsyOrEmpty(obj) {
    return !Array.isArray(obj) || obj.length === 0;
}
exports.isFalsyOrEmpty = isFalsyOrEmpty;
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equalness by returning a unique string for each.
 */
function distinct(array, keyFn) {
    if (!keyFn) {
        return array.filter((element, position) => {
            return array.indexOf(element) === position;
        });
    }
    const seen = Object.create(null);
    return array.filter((elem) => {
        const key = keyFn(elem);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    });
}
exports.distinct = distinct;
function uniqueFilter(keyFn) {
    const seen = Object.create(null);
    return element => {
        const key = keyFn(element);
        if (seen[key]) {
            return false;
        }
        seen[key] = true;
        return true;
    };
}
exports.uniqueFilter = uniqueFilter;
function firstIndex(array, fn) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (fn(element)) {
            return i;
        }
    }
    return -1;
}
exports.firstIndex = firstIndex;
function first(array, fn, notFoundValue = null) {
    const index = firstIndex(array, fn);
    return index < 0 ? notFoundValue : array[index];
}
exports.first = first;
function commonPrefixLength(one, other, equals = (a, b) => a === b) {
    let result = 0;
    for (let i = 0, len = Math.min(one.length, other.length); i < len && equals(one[i], other[i]); i++) {
        result++;
    }
    return result;
}
exports.commonPrefixLength = commonPrefixLength;
function flatten(arr) {
    return arr.reduce((r, v) => r.concat(v), []);
}
exports.flatten = flatten;
function range(to, from = 0) {
    const result = [];
    for (let i = from; i < to; i++) {
        result.push(i);
    }
    return result;
}
exports.range = range;
function fill(num, valueFn, arr = []) {
    for (let i = 0; i < num; i++) {
        arr[i] = valueFn();
    }
    return arr;
}
exports.fill = fill;
function index(array, indexer, merger = t => t) {
    return array.reduce((r, t) => {
        const key = indexer(t);
        r[key] = merger(t, r[key]);
        return r;
    }, Object.create(null));
}
exports.index = index;
/**
 * Inserts an element into an array. Returns a function which, when
 * called, will remove that element from the array.
 */
function insert(array, element) {
    array.push(element);
    return () => {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        }
    };
}
exports.insert = insert;
//# sourceMappingURL=collections.js.map