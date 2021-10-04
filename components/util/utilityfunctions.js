export function shuffle(array){
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export function loopposter(comp,digit){
    let poster =[];
    for(let index = 0; index <= digit; index++){
        poster.push(comp);
    }
    return poster;
};
