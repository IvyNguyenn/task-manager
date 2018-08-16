import React from "react";

const OptionStatus = props =>
    props.statuses.map((status, index) => {
        return <option key={index}>{status}</option>;
    });

export default OptionStatus;
