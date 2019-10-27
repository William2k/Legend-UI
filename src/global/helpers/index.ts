export const arrayRemoveByIndex = (arr: any[], index: number) => {
    const newArr = [...arr];

    newArr.splice(index, 1);

    return newArr;
}

export const dateDiff = (date1: Date, date2: Date = new Date()) => {
    var diff = date2.valueOf() - date1.valueOf();

    const hours   = Math.floor(diff / 3.6e6);
    const minutes = Math.floor((diff % 3.6e6) / 6e4);
    const seconds = Math.floor((diff % 6e4) / 1000);

    return {hours, minutes, seconds};
}