export const arrayRemoveByIndex = (arr: any[], index: number) => {
    const newArr = [...arr];

    newArr.splice(index, 1);

    return newArr;
}