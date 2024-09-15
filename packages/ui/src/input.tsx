import React from 'react';

function Input(): React.ReactElement {
    return (
        <input
            className="p-2 border border-gray-300 rounded-md"
            placeholder="Type something..."
            type="text"
        />
    )
}

export default Input