import TableOperations from "../../ui/TableOperations.jsx";
import {Filter} from "../../ui/Filter.jsx";

export function CabinTableOperations() {
    const options = [
        {value: 'all', label: 'All'},
        {value: 'no-discount', label: 'No discount'},
        {value: 'with-discount', label: 'With discount'},
    ];
    return (
        <TableOperations>
            <Filter filterField='discount' options={options} />
        </TableOperations>
    )
}
