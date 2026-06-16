export abstract class Sorter{
    abstract compare(leftIndex:number, rightIndex:number): boolean;
    abstract swap(leftIndex:number, rightIndex:number):void

    abstract get length(): number;


    public bubble_sort(): void {
        const {length} = this;

        for(let i = 0; i < length; i++){
            for(let j = 0; j < length - i -1; j++){
                if(this.compare(j,j+1)){
                    this.swap(j,j+1);   
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
