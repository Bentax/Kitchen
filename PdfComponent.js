import React from "react";
import ReactToPrint from "react-to-print";

import DataComponent from "./DataComponent.js";

class PdfComponent extends React.Component {
  render() {
    return (
      <div className="container">
        <ReactToPrint
          content={() => this.componentRef}
          trigger={() => (
            <button className="btn btn-primary">Print to PDF!</button>
          )}
        />
        <DataComponent ref={(response) => (this.componentRef = response)} />
      </div>
    );
  }
}

export default PdfComponent;
