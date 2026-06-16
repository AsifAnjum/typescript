import { CharactersCollection } from "./characters-collection";
import { LinkedList } from "./linked-list";
import { NumbersCollection } from "./numbers-collection";
import { Sorter } from "./sorter";


const numbersOfCollection = new NumbersCollection([10,3,-5,0]);
const sorter = new Sorter(numbersOfCollection);
sorter.bubble_sort();
console.log(numbersOfCollection.data);

const charactersCollection = new CharactersCollection('XaaAyb');
const sorter2 = new Sorter(charactersCollection);
sorter2.bubble_sort();
console.log(charactersCollection.data);


const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-76);
linkedList.add(44);

linkedList.print()

const sorter3 = new Sorter(linkedList);
sorter3.bubble_sort();
console.log('Sorted Linked List:');
linkedList.print();
