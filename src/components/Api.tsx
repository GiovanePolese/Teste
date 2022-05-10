import React from "react";

const Api = (node: String) => {
    fetch(`${node.url}/api/v1/blocks`)
      .then(res=>res.json())
}

export default Api;