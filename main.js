// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bounds");
// }
class Node {

    constructor(value = null, next = null) {
        this.value = value;
        this.next = next;
    }
}

class Linkedlist {

    constructor() {
        this.head = null;
    }

    append(value) {
        let node = new Node(value, null);

        if(this.head === null) {
            this.head = node;
        } else {
            let current = this.head;

            while(current.next) {
                current = current.next;
            }

            current.next = node;
        }
    }

    size() {
        if(this.head === null) {
            return 0
        } else {
            let current = this.head;
            let total = 0;

            while(current.next) {
                total += 1;

                current = current.next;
            }
            total += 1;

            return total
        }
    }

    head() {
        if(this.head === null) {
            return null
        } else {
            return this.head.value;
        }
    }

    tail() {
        if(this.head === null) {
            return null
        } else {
            let current = this.head;

            while(current.next) {
                current = current.next;
            }

            return current.value;
        }
    }

    pop() {
        let current = this.head;
        
        for(let i = 0; i <= this.size()-2; i++) {
            current = current.next;
        }

        current.next = null;
    }

    contains(value) {
        let current = this.head;

        for(let i = 0; i < this.size(); i++) {
            if(current.value === value) {
                return current.value;
            } else {
                current = current.next;
            }
        }
    }

    toString() {
        let current = this.head;
        let base = "-> null";
        let string = "";

        for(let i = 0; i < this.size(); i++) {
            string += `(${current.value}) -> `

            current = current.next;
        }

        string.concat(base);
    }
}


class HashMap {
    
    constructor() {
        this.initial = 16;
        this.buckets = new Array(this.initial).fill(null);
        this.loadFacotr = 0.75;
        this.capacity = this.buckets.length * 0.75
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode %= this.buckets.length;
        }

        return hashCode;
    }
    // needs to address -> for very long key -> calculations become inaccuate
    // chance of collision up -> use modulo % on each iteration instead of outside the loop at the end

    set(key, value) {
        if(this.buckets.length === Math.trunc(this.capacity)) {
            for(let i = 0; i <= this.buckets.length; i++) {
                this.buckets.push(null);
            }
        }

        let index = this.hash(key);

        if(this.buckets[index][0] === key) {
            this.buckets[index][1] = value;
        } else if(this.buckets[index][0] !== key) {

        } 
    }

    get(key) {

    }

    has(key) {

    }

    remove(key) {

    }

    length() {

    }

    keys() {

    }

    values() {

    }

    entries() {

    }

}


