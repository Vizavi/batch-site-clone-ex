import { createElement } from "./utils";

export const label = (id, label) => {
    return createElement('label', {class:'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70', for: id, innerText: label });
}

export const textButton = (id, label) => {
    return createElement('button', {type:'button', class:'text-button rounded px-3 text-sm font-medium text-gray-150 hover:bg-sky-200', id:id, innerText:label});
}

export const tabButton = ( id, displayName, dataState = 'incative', dataTargetOption = 'thisUser', tabIndex = 0) => {
    return createElement('button', {type:'button', role:'tab', 'data-state':dataState, 'data-target-option':dataTargetOption, id:id, tabindex:tabIndex, innerText:displayName, 
    class:'option-button inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50  data-[state=active]:bg-white data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow'
});
}

export const buttonStateClasses = () => {
    const stateClasses = {
    'disabled':'start-clone-button pointer-events-none opacity-70 inline-block rounded bg-gray-200 text-neutral-50 shadow-[0_4px_9px_-4px_rgba(51,45,45,0.7)] hover:bg-gray-200 hover:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] focus:bg-gray-300 focus:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] active:bg-cyan-700 active:shadow-[0_8px_9px_-4px_rgba(51,45,45,0.2),0_4px_18px_0_rgba(51,45,45,0.1)] px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out focus:outline-none focus:ring-0',
    'enabled': 'start-clone-button inline-block rounded bg-sky-300 px-2 py-2 text-sm font-medium text-white text-center  disabled:pointer-events-none disabled:opacity-50 transition hover:scale-110 hover:bg-sky-500 hover:shadow-xl focus:outline-none focus:ring active:bg-sky-500'
    };

    return stateClasses;
}

export const collapsedElementTitleWithIcon = (labelText = 'Label is not defined') => { 
    return `<summary class="p-2 flex cursor-pointer items-center justify-between gap-1.5 rounded-lg bg-gray-50">
<h2 class="text-sm font-medium text-neutral-300 leading-none">${labelText}</h2>
<svg class="h-5 w-5 opacity-30 shrink-0 transition duration-300 group-open:-rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
</svg>
</summary>`
};


export const footer = () => {
    const footer = `<div class="border-t-2 border-neutral-100 px-6 py-4 dark:border-neutral-500">
        <p class="flex items-center justify-center text-neutral-500 dark:text-neutral-300">
            <span class="ml-2">
                Questions? Issues? Porposals?
                \n Please <a href="https://wix.slack.com/team/U55DYB4AY"  target="_blank"> DM @evgenys </a>
            </span>
        </p>
    </div>`;
const footerDiv = document.createElement('div');
footerDiv.insertAdjacentHTML('afterbegin', footer);
return footerDiv;
}