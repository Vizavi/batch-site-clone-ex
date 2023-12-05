export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const parseStringToArray = (string) => {
    const stringJ = (string).toString();
    const parsedData =  stringJ
    .replace(/[\'\"\`\,\;\(\)\n\[\(\{\]\)\}\\n\s+$]+/g, ' ')
    .trim()
    .split(/[\s,]+/);
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

export function nestedElements(...elementsList) {
    let reversIndex = elementsList.length -1 
    const lastElement = elementsList[reversIndex]

    for (const chield of  elementsList) {
       const lastChield = elementsList[reversIndex];
       const lastParent = elementsList[reversIndex-1];

       lastParent.appendChild(lastChield)
       reversIndex = reversIndex-1;

       if (reversIndex == 0)
       return {
        htmlElement:lastParent,
        nestedHtmlElement:lastElement
       }
    }
}


export function appendChilds(parent, ...childs) {
    childs.forEach(child => parent.appendChild(child));
    return parent;
}

export function setAttributeIfItHasValue (element, attributeKey, value = '' ){
    value ? element.setAttribute(attributeKey, value) : '';
    return element;
}

export function groupAndAlignElements (...childs) {
    const parent = createElement('div', {class: 'space-y-1'});
    const parent2= createElement('div', {class: 'p-6 pt-0 pb-2 space-y-2'});
    const lineSpacing = appendChilds(parent, ...childs);
    const group =  appendChilds(parent2, lineSpacing);
    return group;
}

export const paragraph = (text) => {
    return createElement('p', {class:'p-2 text-sm font-normal bg-gray-50 text-neutral-500', innerText: text});
}