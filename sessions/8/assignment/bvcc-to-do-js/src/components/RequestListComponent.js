import React, { useEffect, useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import { RequestListItemComponent } from './RequestListItemComponent';

/**
 * Creates a component that represents a request list.
 */
export const RequestListComponent = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        (async () => {
            const client = new ApiClient();
            const results = await client.getAll();
            setItems(results.filter(x => x.request));
        })();
    }, []);
    const requestListItems = items.filter(x => x.request).map(x => <RequestListItemComponent item={x} />);
    return (
        <ul>
            {requestListItems}
        </ul>
    )
}
