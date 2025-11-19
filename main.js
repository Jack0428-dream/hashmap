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
            console.error("Index exceeds the size of the list");
            return null;
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
        if(this.head === null) {
            console.error("This list is empty");
            return null;
        } else if(this.head !== null && this.head.nextNode === null) {
            this.head = null;
        } else {
            let current = this.head;

            while(current.nextNode.nextNode !== null) {
                current = current.nextNode;
            }

            current.nextNode = null;
        }
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

        while(current !== null) {
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
        if(index >= this.size()) {
            console.error("Index exceeds the size of the list");
            return null;
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
        if(index >= this.size()) {
            console.error("Index exceeds the size od the list");
            return null;
        }

        if(index === 0) {
            this.head = this.head.nextNode;
        } else if (index > 0) {
            let current = this.head;

            for(let i = 1; i < index; i++) {
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
        this.capacity = 0;
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
        // if the buckets size exceeds the capacity then double the buckets length.
        let size = 0;
        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i] !== null) {
                size += 1;
            }
        }
        
        if(size === (this.initial * this.loadFacotr).toFixed(0)) {
            while(this.buckets.length <= this.initial * 2) {
                this.buckets.push(null);
            }
            this.initial *= 2;
        }

        // If the index of the array is empty then store the pair
        // if not, compare the key 
        // if the keys are same, then overwrite the value its new one
        // if not, make it linkedlist and save it to nextNode.
        let index = this.hash(key);
        let strArr = this.buckets[index];

        if(strArr === null) {
            strArr = [key, value];
        } else if(strArr[0] === key) {
            strArr[1] = value;
        } else {
            const list = new Linkedlist;
            list.append([strArr[0], strArr[1]]);
            list.append([key, value]);

            strArr = list;
        }
        
    }

    // get(key) {
    //     let index = this.hash(key);
    //     let strArr = this.buckets[index];

    //     if(strArr === null) {
    //         return null;
    //     } else if(strArr[0] === key) {
    //         return strArr[1];
    //     } else if(strArr.contains(key)) {
    //         return strArr.at(strArr.find(key)).value[1]
    //     }
    // }

    // has(key) {
    //     let index = this.hash(key);
    //     let strArr = this.buckets[index];

    //     if(strArr !== null && strArr === key) {
    //         return true;
    //     } else if(strArr !== null && strArr.contains(key)) {
    //         return true 
    //     } else {
    //         return false;
    //     }
    // }

    // remove(key) {
    //     let index = this.hash(key);
    //     let strArr = this.buckets[index];

    //     if(strArr[0] === key) {
    //         strArr = null;
    //         return true;
    //     } else if(strArr.contains(key)) {
    //         strArr.removeAt(strArr.find(key));
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    // length() {
    //     let total = 0;

    //     for(let i = 0; i < this.buckets.length; i++) {
    //         if(this.buckets[i][0]) {
    //             total += 1;
    //         } else if(this.buckets[i].size()) {
    //             total += this.buckets[i].size();
    //         }
    //     }   

    //     return total;
    // }

    clear() {
        for(let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = null;
        }
    }

    // keys() {
    //     let keyArr = [];

    //     for(let i = 0; i < this.buckets.length; i++) {
    //         if(this.buckets[i][0]) {
    //             keyArr.push(this.buckets[i][0]);
    //         } else if(this.buckets[i].size()) {
    //             for(let j = 0; j < this.buckets[i].size(); j++) {
    //                 keyArr.push(this.buckets[i].at(j)[0])
    //             }
    //         }
    //     }

    //     return keyArr;
    // }

    // values() {
    //     let valueArr = [];

    //     for(let i = 0; i < this.buckets.length; i++) {
    //         if(this.buckets[i][1]) {
    //             valueArr.push(this.buckets[i][1]);
    //         } else if(this.buckets[i].size()) {
    //             for(let j = 0; j < this.buckets[i].size(); j++) {
    //                 valueArr.push(this.buckets[i].at(j)[1])
    //             }
    //         }
    //     }

    //     return valueArr;
    // }

    // entries() {
    //     let pairArr = [];

    //     for(let i = 0; i < this.buckets.length; i++) {
    //         if(this.buckets[i][0]) {
    //             pairArr.push(this.buckets[i]);
    //         } else if(this.buckets[i].size()) {
    //             for(let j = 0; j < this.buckets[i].size(); j++) {
    //                 pairArr.push(this.buckets[i].at(j))
    //             }
    //         }
    //     }

    //     return pairArr;
    // }

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

test.entries();