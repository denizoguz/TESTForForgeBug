import React, { useEffect, useState } from 'react';
import {invoke, requestJira} from '@forge/bridge';
import {view} from "@forge/bridge";

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
        view.getContext().then((context) => {
            console.log("Received context, and sending request to jira", context);
            requestJira(`/rest/api/3/project/${context.extension.project.key}`).then((response) => {
                console.log("Received response from Jira");
                response.json().then((data) => {
                    console.log(data);
                    setData(JSON.stringify(data, null, 2));
                });
            });
        });
    }, []);

    console.log("Rendering app", data);
    return (
        <div>
            {data ? data : 'Loading......'}
        </div>
    );
}

export default App;
