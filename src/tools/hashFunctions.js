class HashTableNode {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.isBeingVisited = false;
    this.found = false;
    this.next = null; // For chaining
  }
}

class HashFunctions {
  static TABLE_SIZE = 10;
  static A = 0.6180339887; // Golden ratio for multiplication method

  static divisionMethod(key) {
    return key % HashFunctions.TABLE_SIZE;
  }

  static multiplicationMethod(key) {
    const fractionalPart = (key * HashFunctions.A) % 1;
    return Math.floor(HashFunctions.TABLE_SIZE * fractionalPart);
  }

  static midSquareMethod(key) {
    const squared = key * key;
    const squaredStr = squared.toString();
    const mid = Math.floor(squaredStr.length / 2);
    const midDigits = squaredStr.substring(mid - 1, mid + 1);
    return parseInt(midDigits) % HashFunctions.TABLE_SIZE;
  }

  static foldingMethod(key) {
    const keyStr = key.toString();
    let sum = 0;
    for (let i = 0; i < keyStr.length; i += 2) {
      const part = keyStr.substring(i, i + 2);
      sum += parseInt(part);
    }
    return sum % HashFunctions.TABLE_SIZE;
  }

  static cryptographicHash(key) {
    // Simple implementation for demonstration
    let hash = 0;
    const keyStr = key.toString();
    for (let i = 0; i < keyStr.length; i++) {
      const char = keyStr.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash) % HashFunctions.TABLE_SIZE;
  }

  static universalHashing(key, a, b, p) {
    return ((a * key + b) % p) % HashFunctions.TABLE_SIZE;
  }

  static perfectHashing(keys) {
    // Simple implementation for demonstration
    const uniqueHashes = new Set();
    const hashTable = new Array(HashFunctions.TABLE_SIZE).fill(null);
    
    for (const key of keys) {
      let hash = HashFunctions.cryptographicHash(key);
      while (uniqueHashes.has(hash)) {
        hash = (hash + 1) % HashFunctions.TABLE_SIZE;
      }
      uniqueHashes.add(hash);
      hashTable[hash] = new HashTableNode(key, key);
    }
    
    return hashTable;
  }

  static createHashTable() {
    return new Array(HashFunctions.TABLE_SIZE).fill(null);
  }

  static async insert(hashTable, key, value, method = 'division') {
    let hash;
    switch (method) {
      case 'division':
        hash = HashFunctions.divisionMethod(key);
        break;
      case 'multiplication':
        hash = HashFunctions.multiplicationMethod(key);
        break;
      case 'midSquare':
        hash = HashFunctions.midSquareMethod(key);
        break;
      case 'folding':
        hash = HashFunctions.foldingMethod(key);
        break;
      case 'cryptographic':
        hash = HashFunctions.cryptographicHash(key);
        break;
      case 'universal':
        hash = HashFunctions.universalHashing(key, 1, 0, 101);
        break;
      default:
        hash = HashFunctions.divisionMethod(key);
    }

    const newNode = new HashTableNode(key, value);
    newNode.isBeingVisited = true;
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!hashTable[hash]) {
      hashTable[hash] = newNode;
    } else {
      let current = hashTable[hash];
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    newNode.isBeingVisited = false;
    return hashTable;
  }

  static async search(hashTable, key, method = 'division') {
    let hash;
    switch (method) {
      case 'division':
        hash = HashFunctions.divisionMethod(key);
        break;
      case 'multiplication':
        hash = HashFunctions.multiplicationMethod(key);
        break;
      case 'midSquare':
        hash = HashFunctions.midSquareMethod(key);
        break;
      case 'folding':
        hash = HashFunctions.foldingMethod(key);
        break;
      case 'cryptographic':
        hash = HashFunctions.cryptographicHash(key);
        break;
      case 'universal':
        hash = HashFunctions.universalHashing(key, 1, 0, 101);
        break;
      default:
        hash = HashFunctions.divisionMethod(key);
    }

    let current = hashTable[hash];
    while (current) {
      current.isBeingVisited = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (current.key === key) {
        current.found = true;
        current.isBeingVisited = false;
        return current;
      }
      
      current.isBeingVisited = false;
      current = current.next;
    }
    
    return null;
  }

  static async remove(hashTable, key, method = 'division') {
    let hash;
    switch (method) {
      case 'division':
        hash = HashFunctions.divisionMethod(key);
        break;
      case 'multiplication':
        hash = HashFunctions.multiplicationMethod(key);
        break;
      case 'midSquare':
        hash = HashFunctions.midSquareMethod(key);
        break;
      case 'folding':
        hash = HashFunctions.foldingMethod(key);
        break;
      case 'cryptographic':
        hash = HashFunctions.cryptographicHash(key);
        break;
      case 'universal':
        hash = HashFunctions.universalHashing(key, 1, 0, 101);
        break;
      default:
        hash = HashFunctions.divisionMethod(key);
    }

    let current = hashTable[hash];
    let prev = null;

    while (current) {
      current.isBeingVisited = true;
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (current.key === key) {
        if (prev) {
          prev.next = current.next;
        } else {
          hashTable[hash] = current.next;
        }
        current.isBeingVisited = false;
        return hashTable;
      }
      
      current.isBeingVisited = false;
      prev = current;
      current = current.next;
    }
    
    return hashTable;
  }

  static generateRandomHashTable(size) {
    const hashTable = HashFunctions.createHashTable();
    const keys = new Set();
    
    while (keys.size < size) {
      keys.add(Math.floor(Math.random() * 1000));
    }
    
    return Promise.all([...keys].map(key => 
      HashFunctions.insert(hashTable, key, key, 'division')
    )).then(() => hashTable);
  }
}

export { HashFunctions, HashTableNode }; 