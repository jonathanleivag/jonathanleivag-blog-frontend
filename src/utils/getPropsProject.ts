export const extractImage = (input: string): string => {
    const matches = [...input.matchAll(/<<([^<>]+)>>/g)];
    return matches.map((match) => match[1])[0];
}

export const extractURL = (input: string): string => {
    const matches = [...input.matchAll(/<<?([^<>]+)>>?/g)];
    return matches.map((match) => match[1])[1];
}


export const extractTechnologies = (input: string): string[] => {
    const matches = [...input.matchAll(/\[([^\[\]]+)\]/g)];
    const results = matches.map((match) => match[1]);
    return JSON.parse(`[${results[0]}]`);
}
