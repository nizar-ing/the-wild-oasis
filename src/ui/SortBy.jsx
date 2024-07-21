import {Select} from "./Select.jsx";
import {useSearchParams} from "react-router-dom";

export function SortBy({options}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const sortBy = searchParams.get("sortBy");

    const handleChange = (e) => {
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams);
    }
    return (
        <div>
           <Select
               options={options}
               type='white'
               value={sortBy}
               onChange={handleChange} />
        </div>
    )
}
