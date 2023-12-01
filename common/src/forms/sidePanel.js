function hideForm (formToHide, viewsState = viewStates)  {
    viewsState[formToHide.id] = 'hidden';
    formToHide.classList.add('hidden');
};

function showForm (formToShow, formsToHide, viewsState = viewStates) {
    if (formsToHide.length > 0) {
        for (const formToHide of formsToHide) {
            formToHide.id != formToShow.id ? hideForm(formToHide) : '';
         }
    
        }    }



