import {useState} from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, getGeoOptions } from "../../api";
/* type onSearch={
    onSearchChange(): any;
} */

const Search = ({ onSearchChange }: any) => {
    const [search, setSearch] = useState(null);
    const loadOptions: any = (inputvalue: any) => { 
        return fetch(`${GEO_API_URL}/cities?countryIds=MX&namePrefix=${inputvalue}`, getGeoOptions)
        .then(response => response.json())
        .then(response => {
            return  {
                options: response.data.map((city: { latitude: any; longitude: any; name: any; countryCode: any; }) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name}, ${city.countryCode}`,
                    };
                }),
            };
        })
        .catch(err => console.error(err));
    }
    const handleOnChange = (searchData: any) => {
        setSearch(searchData);
        onSearchChange(searchData);
    }
    return (
        <AsyncPaginate 
            placeholder="Search" 
            debounceTimeout={600}
            value={search}
            onChange={handleOnChange}
            loadOptions={loadOptions}
        />
    )
}

export default Search;