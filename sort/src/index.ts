import { CharactersCollection } from "./characters-collection";
import { LinkedList } from "./linked-list";
import { NumbersCollection } from "./numbers-collection";
import { Sorter } from "./sorter";


const numbersOfCollection = new NumbersCollection([10,3,-5,0]);
numbersOfCollection.bubble_sort();
numbersOfCollection.print();

const charactersCollection = new CharactersCollection('XaaAyb');
charactersCollection.bubble_sort();
charactersCollection.print();


const linkedList = new LinkedList();
linkedList.add(500);
linkedList.add(-10);
linkedList.add(-76);
linkedList.add(44);

linkedList.print()

linkedList.bubble_sort();
console.log('Sorted Linked List:');
linkedList.print();
