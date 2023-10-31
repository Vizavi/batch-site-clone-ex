export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const parseStringToArray = async (string) => {
    const stringJ = await  (string).toString();
    const parsedData = await stringJ
    .replace(/[\'\"\`\,\;\(\)\n\[\(\{\]\)\}\\n\s+$]+/g, ' ')
    .trim()
    .split(/[\s,]+/);
    console.log('Res :', parsedData);
    return parsedData;
}