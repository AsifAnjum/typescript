class Sorter {
    constructor(public collection: number[]| string){}

    public bubble_sort(): void {
        const {length} = this.collection;

        for(let i = 0; i < length; i++){
            for(let j = 0; j < length - i -1; j++){
                if(this.collection instanceof Array && this.collection[j] > this.collection[j+1]){
                    const leftHand = this.collection[j];
                    this.collection[j] = this.collection[j+1];
                    this.collection[j+1] = leftHand;   
                }

                if(typeof this.collection === 'string'){
                    const leftHandCharCode = this.collection.charCodeAt(j);
                    const rightHandCharCode = this.collection.charCodeAt(j+1);

                    
                }

            }
        }
    }

}

const sorter = new Sorter([10,3,-5,0]);
sorter.bubble_sort();
console.log(sorter.collection);

const sorter2 = new Sorter('Xayb');
sorter2.bubble_sort();
console.log(sorter2.collection);
