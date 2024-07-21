import Spinner from "../../ui/Spinner.jsx";
import {CabinRow} from "./CabinRow.jsx";
import {useCabins} from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import Menus from "../../ui/Menus.jsx";
import {useSearchParams} from "react-router-dom";

export function CabinTable() {
    const {cabins, isLoading} = useCabins(); // using a custom hook
    /* const {isLoading, data: cabins, error} = useQuery({
         queryKey: ['cabins'],
         queryFn: getCabins
     });*/
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner/>
    const filterValue = searchParams.get("discount") || "all";
    const filteredCabins = (filterValue === 'all') ? cabins
        : (filterValue === 'no-discount') ? cabins.filter(cabin => cabin.discount === 0)
        : cabins.filter(cabin => cabin.discount > 0);
    return (
        <Menus>
            <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                </Table.Header>
                <Table.Body
                    //data={cabins}
                    data={filteredCabins}
                    render={(cabin) => (<CabinRow key={cabin.id} cabin={cabin}/>)}
                />
            </Table>
        </Menus>
    );
}
