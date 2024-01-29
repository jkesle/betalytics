import React, {useState} from 'react';

// TODO: fix this this why is this component of all the code so far giving me problems??
const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage}) => {
    const totalPages = Math.ceil(totalItems/itemsPerPage);
    //const [pageNumbers, setPageNumbers] = useState(Array.from({length: totalPages}, (_, i) => i+1));

    return (
        <nav>
            <ul className='pagination'>
                <li>
                    <button
                        onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                        disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                </li>
            </ul>
        </nav>
    );
}
export default Pagination;