import React, { Component } from "react";
import _ from "lodash";
import { fetchInbound_ItemElement } from "../../../../../actions";
import { CSVLink } from "react-csv";
import { connect } from "react-redux";
import numeral from "numeral";
import Preloader from "../../../../utils/Preloader";
import ReactTable from "react-table";
import "react-table/react-table.css";

class List extends Component {
  constructor() {
    super();
    this.state = {
      ready: false,
      show_data: [],
      export_data: []
    };
  }
  componentDidMount() {
    this.props.fetchInbound_ItemElement();
  }

  prepareExportData(value) {
    const {
      index,
      item_code,
      item_name,
      item_qty,
      remarks,
      RecordNameBy,
      RecordDate_moment
    } = value;
    return {
      "#": index,
      item_code: `#${item_code}`,
      item_name,
      Inbound: item_qty,
      remarks,
      RecordNameBy,
      RecordDate: RecordDate_moment
    };
  }

  componentWillReceiveProps({ reports_inbound_item }) {
    if (reports_inbound_item) {
      this.setState({ ready: false });
      let export_data = [];
      _.map(reports_inbound_item, (value, index) => {
        value.RecordDate_moment =
          new Date(value.RecordDate).toLocaleDateString() +
          " " +
          new Date(value.RecordDate).toLocaleTimeString();
        value.index = index;

        const _data = this.prepareExportData(value);
        export_data.push(_data);
      });

      this.setState({
        show_data: reports_inbound_item,
        export_data,
        ready: true
      });
    }
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
            style: { fontWeight: "bold", textAlign: "center" }
          },
          {
            Header: "Item Name",
            accessor: "item_name",
            // width: 250,
            style: { textAlign: "center" }
          },
          {
            Header: "Inbound Quantity",
            accessor: "item_qty",
            Cell: row => <div>{numeral(row.value).format("0,0")}</div>,
            width: 200,
            style: { fontWeight: "bold", textAlign: "center", color: "green" }
          },
          {
            Header: "Remarks",
            accessor: "remarks",
            // width: 300,
            style: { textAlign: "center" }
          },
          {
            Header: "Record By",
            accessor: "RecordNameBy",
            width: 200,
            style: { textAlign: "center" }
          },
          {
            Header: "Record Date",
            accessor: "RecordDate_moment",
            width: 200,
            style: { textAlign: "center" }
          }
        ]
      }
    ];
  }

  render() {
    return (
      <div>
        {this.state.ready ? (
          <div>
            <ReactTable
              data={this.state.show_data}
              noDataText="No Data"
              columns={this.settingColumn()}
              className="-striped -highlight"
            />
            <CSVLink
              data={this.state.export_data}
              filename={"inboundinventoryreport.csv"}
            >
              <button className="waves-effect waves-light btn">
                <i className="material-icons left">cloud_download</i>
                Download
              </button>
            </CSVLink>
          </div>
        ) : (
          <Preloader />
        )}
      </div>
    );
  }
}

function mapStateToProps({ reports_inbound_item }) {
  return { reports_inbound_item: _.reverse(reports_inbound_item) };
}

export default connect(
  mapStateToProps,
  { fetchInbound_ItemElement }
)(List);
