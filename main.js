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
            return null;
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
    
        this.capacity = this.initial * this.loadFacotr;
        let count = 0;
        for(let i = 0; i < this.initial; i++) {
            if(Array.isArray(this.buckets[i])) {
                count += 1;
            } else if(this.buckets[i] instanceof Linkedlist) {
                count += this.buckets[i].size();
            }
        }

        if(parseInt(this.capacity.toFixed(0)) === count){
            let temp = this.buckets.slice();

            this.initial *= 2;
            this.buckets = new Array(this.initial).fill(null);

            for(let i = 0; i < temp.length; i++) {
                if(Array.isArray(temp[i])) {
                    this.set(temp[i][0], temp[i],[1])
                } else if(temp[i] instanceof Linkedlist) {
                    for(let j = 0; j < temp[i].size(); j++) {
                        this.set(temp[i].at(j).value[0], temp[i].at(j).value[1])
                    }
                }
            }
        }

        // index = hash(key)
        // bucket = this.buckets[index]
        let index = this.hash(key);

        // IF bucket is null:
        //     (store pair)
        if(this.buckets[index] === null) {
            this.buckets[index] = [key, value];
        } else if(Array.isArray(this.buckets[index])) {
            if(this.buckets[index][0] === key) {
                this.buckets[index][1] = value;
            } else {
                const list = new Linkedlist;
                list.append([this.buckets[index][0], this.buckets[index][1]]);
                list.append([key, value]);
                this.buckets[index] = list;
            }
        } else if(this.buckets[index] instanceof Linkedlist) {
            let found = false;

            for(let i = 0; i < this.buckets[index].size(); i++) {
                if(this.buckets[index].at(i).value[0] === key) {
                    this.buckets[index].at(i).value[1] = value;
                    found = true;
                    break;
                }
            }

            if(found !== true) {
                this.buckets[index].append([key, value]);
            }
        }

        // Else IF bucket is array:
        //     IF array key matches:
        //         (update value)
        //     ELSE:
        //         (convert to LinkedList)
        // Else IF bucket is linkedlist:
        //     (search list)
        //     if found:
        //         (update value)
        //     else: 
        //         (append pair)
    }

    get(key) {
        let index = this.hash(key);

        if(Array.isArray(this.buckets[index]) && this.buckets[index][0] === key) {
            return this.buckets[index][1];
        } else if(this.buckets[index] instanceof Linkedlist) {
            for(let i = 0; i < this.buckets[index].size(); i++) {
                if(this.buckets[index].at(i).value[0] === key) {
                    return this.buckets[index].at(i).value[1];
                }
            }
        }

        return null;
    }

    has(key) {
        let index = this.hash(key);
        let strArr = this.buckets[index];

        if(strArr !== null && strArr === key) {
            return true;
        } else if(strArr !== null && strArr.contains(key)) {
            return true 
        } else {
            return false;
        }
    }

    remove(key) {
        let index = this.hash(key);
        let strArr = this.buckets[index];

        if(strArr[0] === key) {
            strArr = null;
            return true;
        } else if(strArr.contains(key)) {
            strArr.removeAt(strArr.find(key));
            return true;
        } else {
            return false;
        }
    }

    length() {
        let total = 0;

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i][0]) {
                total += 1;
            } else if(this.buckets[i].size()) {
                total += this.buckets[i].size();
            }
        }   

        return total;
    }

    clear() {
        for(let i = 0; i < this.buckets.length; i++) {
            this.buckets[i] = null;
        }
    }

    keys() {
        let keyArr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i][0]) {
                keyArr.push(this.buckets[i][0]);
            } else if(this.buckets[i].size()) {
                for(let j = 0; j < this.buckets[i].size(); j++) {
                    keyArr.push(this.buckets[i].at(j)[0])
                }
            }
        }

        return keyArr;
    }

    values() {
        let valueArr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i][1]) {
                valueArr.push(this.buckets[i][1]);
            } else if(this.buckets[i].size()) {
                for(let j = 0; j < this.buckets[i].size(); j++) {
                    valueArr.push(this.buckets[i].at(j)[1])
                }
            }
        }

        return valueArr;
    }

    entries() {
        let pairArr = [];

        for(let i = 0; i < this.buckets.length; i++) {
            if(this.buckets[i][0]) {
                pairArr.push(this.buckets[i]);
            } else if(this.buckets[i].size()) {
                for(let j = 0; j < this.buckets[i].size(); j++) {
                    pairArr.push(this.buckets[i].at(j))
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

test.keys();