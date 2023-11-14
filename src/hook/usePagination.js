import { useState } from "react"



const usePagination = (data, itemPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);

    function next() {
        setCurrentPage((currentPage) => Math.min(currentPage + 1, getCurrentPage()));
    }

    function prev() {
        setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
    }

    function jump(page) {
        const pageNumber = Math.max(1, page)
        const currentPage = Math.min(pageNumber, getMaxPage());
        console.log({pageNumber,currentPage, getCurrentPage});
        setCurrentPage(() => currentPage);
    }

    function getMaxPage(){
        return Math.ceil(data?.length || 0 / itemPerPage);
    }

    function getCurrentPage(){
        return currentPage;
    }

    function currentData() {
      
        if (!data) {
            return [];
        }
        const begin = (currentPage - 1) * itemPerPage;
        const end = begin + itemPerPage;
        // console.log({data, begin, end, currentPage});
        return data.slice(begin, end);
    }

    function getItemPerPage() {
        return itemPerPage;
    }


    return {next, prev, jump, currentData, getMaxPage, getCurrentPage, getItemPerPage};
}

export {
    usePagination
}