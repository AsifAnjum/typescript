import { Sorter } from "./sorter";


class Node {
    next: Node | null = null;
    constructor(public data: number){}
}

export  class LinkedList extends Sorter  {
    head: Node | null = null;

    // in future Sorter might have constructor
    constructor(){
        super()
    }

    public add(data:number):void {
        const node = new Node(data);

        if(!this.head){
            this.head = node;
            return;
        }

        let tail = this.head;
        while(tail.next){
            tail = tail.next;
        }
        tail.next = node;
    }
    
    get length(): number {
        if(!this.head){
            return 0;
        }

        let length = 0;
        let currentNode: Node | null = this.head;

        while(currentNode){
            length++;
            currentNode = currentNode.next;
        }
        return length;
    }


    public at(index:number): Node {
        if(!this.head){
            throw new Error('Index out of bounds');
        }

        let counter = 0;
        let node: Node | null = this.head;

        while(node){
            if(counter == index){
                return node;
            }
            counter ++;
            node = node.next
        }

        throw new Error('Index out of bounds');
    }

    public compare(leftIndex: number, rightIndex: number): boolean {

        if(!this.head){
            throw new Error('List is empty');
        }

        const leftNode = this.at(leftIndex);
        const rightNode = this.at(rightIndex);

        return leftNode.data > rightNode.data
    }

    public swap(leftIndex: number, rightIndex: number): void {
         const leftNode = this.at(leftIndex);
         const rightNode = this.at(rightIndex);

         const leftNodeValue = leftNode.data;
         leftNode.data = rightNode.data;
         rightNode.data = leftNodeValue;
    }

    public print(): void {
        if(!this.head){
            return;
        }

        let currentNode: Node | null = this.head;

        while(currentNode){
            console.log(currentNode.data)
            currentNode = currentNode.next;
        }
    }

}   