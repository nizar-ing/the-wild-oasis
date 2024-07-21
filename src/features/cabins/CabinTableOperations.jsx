import TableOperations from "../../ui/TableOperations.jsx";
import {Filter} from "../../ui/Filter.jsx";
import {SortBy} from "../../ui/SortBy.jsx";

export function CabinTableOperations() {
    const filterOptions = [
        {value: 'all', label: 'All'},
        {value: 'no-discount', label: 'No discount'},
        {value: 'with-discount', label: 'With discount'},
    ];
    const sortOptions = [
        {value: 'name-asc', label: 'Sort by name (A-Z)'},
        {value: 'name-desc', label: 'Sort by name (Z-A)'},
        {value: 'regularPrice-asc', label: 'Sort by price (Low first)'},
        {value: 'regularPrice-desc', label: 'Sort by price(High first)'},
        {value: 'maxCapacity-asc', label: 'Sort by capacity (Low first)'},
        {value: 'maxCapacity-desc', label: 'Sort by capacity(High first)'},
    ];
    return (
        <TableOperations>
            <Filter filterField='discount' options={filterOptions} />
            <SortBy options={sortOptions} />
        </TableOperations>
    )
}
