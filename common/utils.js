export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const parseStringToArray = (string) => {
    const stringJ = (string).toString();
    const parsedData =  stringJ
    .replace(/[\'\"\`\,\;\(\)\n\[\(\{\]\)\}\\n\s+$]+/g, ' ')
    .trim()
    .split(/[\s,]+/);
    console.log('Res :', parsedData);
    return parsedData;
}

export function createElement(tag, options) {
    const element = document.createElement(tag);
    Object.keys(options).forEach(key => {
        if (key === 'innerText') {
            element.innerText = options[key];
        } else {
            element.setAttribute(key, options[key]);
        }
    });
    return element;
}

export function appendChilds(parent, ...childs) {
    childs.forEach(child => parent.appendChild(child));
    return parent;
}

export function setAttributeIfItHasValue (element, attributeKey, value = '' ){
    value ? element.setAttribute(attributeKey, value) : '';
    return element;
}