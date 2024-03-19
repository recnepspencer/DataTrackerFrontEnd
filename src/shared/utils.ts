export const range = (start: number, end: number): number[] => {
    return [...Array(end - start).keys()].map((el) => el + start);
};

export const pluck = (elements: any[], key: string) => {
    return elements.map((el) => el[key]);
};


