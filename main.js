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

    changeHead() {
        this.head = this.head.next;
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
        
        for(let i = 0; i < this.size(); i++) {
            current = current.next;
        }

        current.next = null;
    }

    changeAdr(item) {
        let current = this.head;

        for(let i = 0; i < this.size(); i++) {
            if(current.value[0] === item) {
                current = current.next.next;
                return true;
            } else {
                current = current.next;
            }
        }

        return false;
    }

    contains(value) {
        let current = this.head;

        for(let i = 0; i < this.size(); i++) {
            if(current.value[0] === value) {
                return true;
            } else {
                current = current.next;
            }
        }

        return false;
    }

    find(value) {
        let current = this.head;
        let index = 0;

        for(let i = 0; i < this.size(); i++) {
            if(current.value[0] === value) {
                return index
            } else {
                current = current.next;
                index += 1;
            } 
        }

        return false;
    }

    change(key, newValue) {
        let current = this.head;

        for(let i = 0; i < this.size(); i++) {
            if(current.value[0] === key) {
                current.value[1] = newValue;
                return;
            } else {
                current = current.next;
            }
        }


    }

    get(key) {
        let current = this.head;

        for(let i = 0; i < this.size(); i++) {
            if(current.value[0] === key) {
                return current.value[1];
            } else {
                current = current.next;
            }
        }

        return false;
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
        // make buckets as a linkedList
        if(this.buckets.length === Math.trunc(this.capacity)) {
            for(let i = 0; i <= this.buckets.length; i++) {
                this.buckets.push(null);
            }
        }

        let index = this.hash(key);

        if(this.buckets[index] === null ) {
            this.buckets[index] = new Linkedlist;
            this.buckets[index] = list;
            list.append([key, value]);
        } else if(list.contains(key)) {
            // overwrite the old value
            list.change(key, value);
        } else {
            list.append([key, value]);
        }
    }

    get(key) {
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i].contains(key)) {
                return this.buckets[i].get(key);
            }
        }
        
        return false;
    }

    has(key) {
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i].contains(key)) {
                return true;
            } else {
                return false;
            }
        }
    }

    remove(key) {
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i].contains(key) && this.buckets.head()[0] === key) {
                this.buckets[i].changeHead();
                return true;
            } else if(this.buckets[i].contains(key) && this.buckets.tail()[0] === key) {
                this.buckets[i].pop();
                return true;
            } else if(this.buckets[i].contains(key) && this.buckets.head()[0] !== key && this.buckets.tail()[0] !== key) {
                this.buckets.changeAdr(key);
            } else {
                return false;
            }
        }
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


