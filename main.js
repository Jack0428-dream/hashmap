if (index < 0 || index >= buckets.length) {
    throw new Error("Trying to access index out of bounds");
}

class HashMap {
    
    constructor() {
        this.initial = 16;
        this.loadFacotr = 0.75;
        this.capacity = buckets.length * 0.75
        this.buckets = new Array(initial).fill(null);
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
