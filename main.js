// if (index < 0 || index >= buckets.length) {
//     throw new Error("Trying to access index out of bounds");
// }

class Node {

    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class Linkedlist {

    constructor() {
        this.head = null;
    }

    append(value) {
        const node = new Node(value, null);

        if(this.head === null) {
            this.head = node;
        } else {
            let current = this.head;

            while(current.nextNode !== null) {
                current = current.nextNode;
            }

            current.nextNode = node;
        }
    }

    prepend(value) {
        const node = new Node(value, null);

        if(this.head === null) {
            this.head = node;
        } else {
            let current = this.head;
            node.nextNode = current;
            this.head = node;
        }
    }

    size() {
        let current = this.head;
        let number = 0;

        while(current !== null) {
            number += 1;
            current = current.nextNode;
        }

        return number;
    }

    headNode() {
        if(this.head === null) {
            return console.log("This list is empty");
        } else {
            return this.head;
        }
    }

    tail() {
        if(this.head === null) {
            return console.log("This list is empty");
        } else {
            let current = this.head;

            while(current.nextNode !== null) {
                current = current.nextNode;
            }

            return current;
        }
    }

    at(index) {

        if(index >= this.size()) {
            return console.error("Index exceeds the size of the list");
        }

        if(index === 0) {
            return this.head;
        } else if(index > 0) {
            let current = this.head;

            for(let i = 1; i <= index; i++) {
                current = current.nextNode;
            }

            return current;
        }
    }

    pop() {
        let current = this.head;

        while(current.nextNode.nextNode !== null) {
            current = current.nextNode;
        }

        current.nextNode = null;
    }

    contains(value) {
        let current = this.head;

        while(current !== null) {
            if(current.value === value) {
                return true;
            } else {
                current = current.nextNode;
            }
        }

        return false;
    }

    find(value) {
        //returns the index of the node containing value
        let current = this.head;
        let index = 0;

        while(current.value !== null) {
            if(current.value === value) {
                return index;
            } else {
                index += 1;
                current = current.nextNode;
            }
        }

        return null;
    }
    
    toString() {
        let current = this.head;
        let string = "null";
        let string2 = "";

        while(current.nextNode !== null) {
            string2 += `( ${current.value} ) -> `;
            current = current.nextNode;
        }

        string2 += `( ${current.value} ) -> `;
        let result = string2.concat(string);
        return console.log(result);
    }

    insertAt(value, index) {
        if(index > this.size()) {
            console.error("Index exceeds the size of the list");
        }

        if(index === 0) {
            const node = new Node(value, null);

            node.nextNode = this.head;
            this.head = node;
        } else if(index > 0) {
            const node = new Node(value, null);
            let current = this.head;

            for(let i = 1; i < index; i++) {
                current = current.nextNode;
            }

            node.nextNode = current.nextNode;
            current.nextNode = node;
        }
    }

    removeAt(index) {
        if(index > this.size()) {
            console.error("Index exceeds the size od the list");
        }

        if(index === 0) {
            this.head = this.head.nextNode;
        } else if (index > 0) {
            let current = this.head;

            for(let i = 0; i < index; i++) {
                current = current.nextNode;
            }

            current.nextNode = current.nextNode.nextNode;
        }
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
            let list = this.buckets[index];
            list.append([key, value]);
        } 
        
        if(list.contains(key)) {
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
            if(this.buckets[i].contains(key) && this.buckets.findHead()[0] === key) {
                this.buckets[i].changeHead();
                return true;
            } else if(this.buckets[i].contains(key) && this.buckets.tail()[0] === key) {
                this.buckets[i].pop();
                return true;
            } else if(this.buckets[i].contains(key) && this.buckets.findHead()[0] !== key && this.buckets.tail()[0] !== key) {
                this.buckets.changeAdr(key);
            } else {
                return false;
            }
        }
    }

    length() {
      let total = 0;
      
      for(let i = 0; i < this.buckets.length; i++) {
        if(this.buckets[i] !== null) {
            total += this.buckets[i].size()
        }
      }

      return total;
    }

    keys() {
        let keyArr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== null) {
                for(let j = 0; j < this.buckets[i].size(); j++) {
                    let current = this.buckets[i]
                    keyArr.push(current.value[0])
                    current = current.next;
                }
            }
        }

        return keyArr;
    }

    values() {
        let valueArr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== null) {
                for(let j = 0; j < this.buckets[i].size(); j++) {
                    let current = this.buckets[i]
                    valueArr.push(current.value[1])
                    current = current.next;
                }
            }
        }

        return valueArr;
    }

    entries() {
        let pairArr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== null) {
                for(let j = 0; j < this.buckets[i].size(); j++) {
                    let current = this.buckets[i]
                    pairArr.push(current.value);
                    current = current.next;
                }
            }
        }

        return pairArr;
    }

}


const test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')