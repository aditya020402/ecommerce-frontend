// react helmet is used to modify the title and this helps us improve the seo of the webpage

import React from "react";
import Helmet from "react-helmet";

const MetaData = ({title}) => { 
    return (
        <Helmet>
            <title>{title}</title>
        </Helmet>
    )
};

export default MetaData;