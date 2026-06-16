export interface Sortable {
    length: number;
    compare(leftIndex:number, rightIndex:number): boolean;
    swap(leftIndex:number, rightIndex:number):void
}


export class Sorter {
    constructor(public collection: Sortable){}

    public bubble_sort(): void {
        const {length} = this.collection;

        for(let i = 0; i < length; i++){
            for(let j = 0; j < length - i -1; j++){
                if(this.collection.compare(j,j+1)){
                    this.collection.swap(j,j+1);   
                }
            }
        }
    }

}

// const sorter = new Sorter([10,3,-5,0]);
// sorter.bubble_sort();
// console.log(sorter.collection);

// const sorter2 = new Sorter('Xayb');
// sorter2.bubble_sort();
// console.log(sorter2.collection);
