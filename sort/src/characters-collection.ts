import { Sorter } from "./sorter";

export class CharactersCollection extends Sorter {
 constructor(public data: string){
   super();
 }
 
 get length(): number {
    return this.data.length;
 }

 public compare(leftIndex:number, rightIndex: number): boolean {
    return this.data[leftIndex].toLocaleLowerCase() > this.data[rightIndex].toLocaleLowerCase();
 }

 public swap(leftIndex:number, rightIndex:number):void{
    const characters = this.data.split('');
    const leftHand = characters[leftIndex];
    characters[leftIndex] = characters[rightIndex];
    characters[rightIndex] = leftHand;

    this.data = characters.join('')
 }

 public print(): void {
    console.log(this.data);
 }
}