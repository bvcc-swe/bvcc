import React, { FunctionComponent, useEffect, useState } from 'react';
import { ApiClient } from '../clients/ApiClient';
import { RequestedToDoListItem } from '../models/RequestedToDoListItem'
import { RequestListItemComponent } from './RequestListItemComponent';

export const RequestListComponent: FunctionComponent = () => {
    const [items, setItems] = useState<RequestedToDoListItem[]>([]);

    useEffect(() => {
        (async () => {
            const client = new ApiClient();
            const results = await client.getAll();
                setItems(results.filter(x => x.request) as RequestedToDoListItem[]);
        })();
    });
    const requestListItems = items.filter(x => x.request).map(x => <RequestListItemComponent item={x} />);
    return (
        <ul>
            {requestListItems}
        </ul>
    )
}
