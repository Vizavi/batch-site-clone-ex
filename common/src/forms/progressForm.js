    import { createElement, appendChilds } from "../../src/etc/utils";

    export const progressForm = (title = 'Tytle is missing', textData = 'No data') => {
    const flow = createElement('div', {class: 'flow-root rounded-lg border border-gray-100 py-3 shadow-sm'});
    const lines = createElement('dl', {class: '-my-3 divide-y divide-gray-100 text-sm'});
    const casesTotal = titleRow('casesTotal', 'Progress: ', 'Planned/Success/Failes');
    const processingStatus = titleRow('processingStatus', 'Current Status: ', 'N/A');
    const timeSpent = titleRow('timeSpent', 'Time spent: ', '0');
    const form =  appendChilds(lines, casesTotal.htmlElement, processingStatus.htmlElement, timeSpent.htmlElement);
   flow.appendChild(form);

    return {
        htmlElement: flow,
        setValue: (value) => {
            casesTotal.setValue(`${value.total}/ ${value.success}/ ${value.failed}  (planned/success/failes)`);
            processingStatus.setValue(value.processingStatus);
            timeSpent.setValue(Date.now() - value.startTime);
        },
        getValue: () => {
            return {
                total: casesTotal.getValue(),
                processingStatus: processingStatus.getValue(),
                timeSpent: timeSpent.getValue(),
            }
        }
    
    }
}

const svg = `<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
</svg>`;

function titleRow (id, title, value) {
    const spinner = createElement('dd', {class:'text-gray-700 sm:col-span-1'});
    spinner.insertAdjacentHTML('afterbegin', svg);

    const row = createElement('div', {groupId:`group-${id}`, class: 'grid grid-cols-1 gap-1 p-3 even:bg-gray-50 sm:grid-cols-3 sm:gap-4'});
    const rowTitle = createElement('dt', {groupId:`group-${id}`, class: 'font-medium text-gray-900', innerText:title});
    const rowData = createElement('dd', {groupId:`group-${id}`, id:id, class: 'text-gray-700 sm:col-span-1', innerText: value});
    //    const rowData = createElement('dd', {groupId:`group-${id}`, id:id, class: 'text-gray-700 sm:col-span-2', innerText: value});
    const titleRow = appendChilds(row, rowTitle, rowData, spinner);
    return     {
        htmlElement: titleRow,
        setValue:(value) =>{rowData.innerText = value},
        getValue:() => rowData.innerText,
    }
}