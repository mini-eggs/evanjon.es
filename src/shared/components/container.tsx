import * as React from "react";

interface Props {
    children: React.ReactChild
}

export default (props: Props) => {
    return(
        <div>
            {props.children}
        </div>
    );
};