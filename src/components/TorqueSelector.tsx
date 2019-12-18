import React, { useState} from "react";
import styled from "styled-components";
import { useDebouncedCallback } from 'use-debounce';

interface Props {
    onChange: (value: number) => void,
    debounceTime?: number,
}

const Input = styled.input`
    padding:10px;
`

export default({ onChange, debounceTime = 250 }:Props) => {
    
    const [ value, setValue ] = useState();

    const [ debouncedCallback ] = useDebouncedCallback(
        (value: any) => onChange(value), debounceTime
    )


    return(
        <>
            <Input 
                type="number"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    debouncedCallback(e.target.value);
                }}
            />
        </>
    )
}