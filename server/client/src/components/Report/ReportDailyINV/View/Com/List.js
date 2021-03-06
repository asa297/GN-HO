import React, { Component } from "react";

import _ from "lodash";
import { connect } from "react-redux";
import { CSVLink } from "react-csv";
import ReactTable from "react-table";
import numeral from "numeral";
import "react-table/react-table.css";

class List extends Component {
  constructor(props) {
    super(props);
    const { date } = props;
    this.state = {
      filename: date,
      show_data: [],
      export_data: []
    };
  }

  componentDidMount() {
    const { reports_daily_inv_item } = this.props;
    let result = _.sortBy(reports_daily_inv_item, "item_code");
    let export_data = [];

    _.map(result, (value, index) => {
      value.index = index;

      const _data = this.prepareExportData(value);
      export_data.push(_data);
    });

    this.setState({
      show_data: result,
      export_data
    });
  }

  prepareExportData(value) {
    const { index, item_code, item_name, Inbound, Outbound } = value;
    return {
      "#": index,
      item_code: `#${item_code}`,
      item_name,
      Inbound,
      Outbound
    };
  }

  settingColumn() {
    return [
      {
        columns: [
          {
            Header: "#",
            accessor: "index",
            width: 30,
            style: { textAlign: "center" }
          },
          {
            Header: "Item Code",
            accessor: "item_code",
            width: 100,
            style: { textAlign: "center", fontWeight: "bold" }
          },
          {
            Header: "Item Name",
            accessor: "item_name",
            // width: 300,
            style: { textAlign: "center" }
          },
          {
            Header: "Inbound",
            accessor: "Inbound",
            Cell: row => <div>{numeral(row.value).format("0,0")}</div>,
            style: { textAlign: "center", color: "green", fontWeight: "bold" }
          },
          {
            Header: "Outbound",
            accessor: "Outbound",
            Cell: row => <div>{numeral(row.value).format("0,0")}</div>,
            style: { textAlign: "center", color: "red", fontWeight: "bold" }
          }
        ]
      }
    ];
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.state.show_data}
          noDataText="No Data"
          columns={this.settingColumn()}
          className="-striped -highlight"
        />
        <CSVLink
          data={this.state.export_data}
          filename={`daily-inv-${this.state.filename}.csv`}
        >
          <button className="waves-effect waves-light btn">
            <i className="material-icons left">cloud_download</i>
            Download
          </button>
        </CSVLink>
      </div>
    );
  }
}

function mapStateToProps({ reports_daily_inv_item }) {
  return { reports_daily_inv_item };
}

export default connect(mapStateToProps)(List);
