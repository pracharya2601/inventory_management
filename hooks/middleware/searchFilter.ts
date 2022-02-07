import { useState } from 'react';

export const searchFilter = (array) => {
    const [searchVal, onChangeSearch] = useState('aaa');
    console.log(array);
    // const cleanString = searchVal.replace(/[|&;$%@"<>()+,]/g, '').toLowerCase();

    // const filteredData = array.filter((data) => {
    //     return data.name.toLowerCase().search(cleanString) != -1;
    // });
    return { onChangeSearch, filteredData: [] };
};
