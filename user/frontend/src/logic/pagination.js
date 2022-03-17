export default {
    getAmountOfPages: (objects, amountOnPage) => {
        if(objects.length > 0){
            let index = 0;
            let pages = [];
            for(index; index <= Math.ceil((objects.length / amountOnPage)); index++){
                pages.push({
                    id: index + 1
                })
            }
            pages.pop();
            return pages;
        } else {
            return null
        }
    },
    getObjectsToShowOnCurrentPage: (objects, pageId, amountOnPage) => {
        let start = (pageId - 1) * amountOnPage;
        let objectsToShowOnCurrentPage = [];
        for(start; start <= (amountOnPage * pageId) - 1; start++){
            objectsToShowOnCurrentPage.push(objects[start])
        }
        return objectsToShowOnCurrentPage;
    },
    changePage: (pagination, objects, id) => {
        pagination.activePage = id;
        let newObjectsToShowOnCurrentPage = [];
        let start = (id - 1) * pagination.amountOnPage;
        for(start; start <= (pagination.amountOnPage * id) - 1; start++){
            newObjectsToShowOnCurrentPage.push(objects[start])
        }
        pagination.objectsToShowOnCurrentPage = newObjectsToShowOnCurrentPage;
    },
    jump(pagination, direction, amountOfPages, objects){
        if(direction === 'back'){
            pagination.activePage = pagination.activePage - amountOfPages;
            if(pagination.activePage < 1){
                pagination.activePage = 1;
            }
            pagination.pagesStartFrom = pagination.activePage - 1;
            pagination.pagesEndOn = pagination.activePage + (amountOfPages - 1);
            let newobjectsToShowOnCurrentPage = [];
            let start = (pagination.activePage - 1) * pagination.amountOnPage;
            for(start; start <= (pagination.amountOnPage * pagination.activePage) - 1; start++){
                newobjectsToShowOnCurrentPage.push(objects[start])
            }
            pagination.objectsToShowOnCurrentPage = newobjectsToShowOnCurrentPage;
        } else {
            pagination.activePage = pagination.activePage + amountOfPages;
            if(pagination.activePage > pagination.pages.length){
                pagination.activePage = pagination.pages.length;
            }
            pagination.pagesStartFrom = pagination.activePage - 1;
            pagination.pagesEndOn = pagination.activePage + (amountOfPages - 1);
            if(pagination.pagesEndOn > pagination.pages.length){
                pagination.pagesEndOn = pagination.pages.length
            }
            let newobjectsToShowOnCurrentPage = [];
            let start = (pagination.activePage - 1) * pagination.amountOnPage;
            for(start; start <= (pagination.amountOnPage * pagination.activePage) - 1; start++){
                newobjectsToShowOnCurrentPage.push(objects[start])
            }
            pagination.objectsToShowOnCurrentPage = newobjectsToShowOnCurrentPage;
        }
    },
    jumpOnePage(pagination, direction, objects){
        if(direction === 'forward'){
            pagination.activePage++;
            if(pagination.activePage > pagination.pages.length){
                pagination.activePage = pagination.pages.length;
            }
            if(pagination.activePage > pagination.pagesEndOn){
                pagination.pagesStartFrom++;
                pagination.pagesEndOn++;
            }
            let newobjectsToShowOnCurrentPage = [];
            let start = (pagination.activePage - 1) * pagination.amountOnPage;
            for(start; start <= (pagination.amountOnPage * pagination.activePage) - 1; start++){
                newobjectsToShowOnCurrentPage.push(objects[start])
            }
            pagination.objectsToShowOnCurrentPage = newobjectsToShowOnCurrentPage;
        } else {
            pagination.activePage--;
            if(pagination.activePage < 1){
                pagination.activePage = 1;

            }
            if(pagination.activePage <= pagination.pagesStartFrom){
                pagination.pagesStartFrom--;
                pagination.pagesEndOn--;
            }
            let newobjectsToShowOnCurrentPage = [];
            let start = (pagination.activePage - 1) * pagination.amountOnPage;
            for(start; start <= (pagination.amountOnPage * pagination.activePage) - 1; start++){
                newobjectsToShowOnCurrentPage.push(objects[start])
            }
            pagination.objectsToShowOnCurrentPage = newobjectsToShowOnCurrentPage;
        }
    }
}