import React from "react";
import _ from "lodash";
import { Route } from "react-router-dom";

import Home from "../components/Home";
import DefaultHome from "../components/DefaultHome";
//Item
import Item from "../components/Item/Item";
import ItemNew from "../components/Item/ItemNew";
import ItemView from "../components/Item/view/viewItem";

//Report
import Report from "../components/Report/Report";
import ReportPO from "../components/Report/ReportPO/ReportPO";
import ReportPOView from "../components/Report/ReportPO/ReportPOView";
import ReportInventory from "../components/Report/ReportINV/ReportINV";
import ReportInventoryView from "../components/Report/ReportINV/ReportINVView";
import ReportInBoundInventory from "../components/Report/ReportInboundINV/ReportView";
import ReportInBoundInventoryView from "../components/Report/ReportInboundINV/Component/View/InboundItem";
import ReportOutBoundInventory from "../components/Report/ReportOutboundINV/ReportView";
import ReportOutBoundInventoryView from "../components/Report/ReportOutboundINV/Component/View/OutboundItem";
import ReportDailyINV from "../components/Report/ReportDailyINV/Search/Search";
import ReportDailyINVView from "../components/Report/ReportDailyINV/View/ReportView";
import ReportDailyCashBalance from "../components/Report/ReportDailyCashBalance/Search/Search";
import ReportDailyCashBalanceView from "../components/Report/ReportDailyCashBalance/View/ReportView";
import ReportDailyCommissionGroup from "../components/Report/ReportDailyCom/Search/Search";
import ReportDailyCommissionGroupView from "../components/Report/ReportDailyCom/View/ReportView";
import ReportDailyCommissionGroupViewDetail from "../components/Report/ReportDailyCom/View/ReportViewDetail";
import ReportDeliveryNote from "../components/Report/ReportDeliveryNote/Main";
import ReportDeliveryNoteNew from "../components/Report/ReportDeliveryNote/NewReportDeliveryNote";
import ReportDeliveryNoteView from "../components/Report/ReportDeliveryNote/ViewDocument";
//Note
import NoteNew from "../components/Note/NoteNew.js";
//Login
import Login from "../components/Login";

export default auth => {
  if (!_.isNil(auth)) {
    switch (auth.priority) {
      case 1:
        return (
          <div>
            <Route exact path="/note/new" component={NoteNew} />
            <Route
              exact
              path="/report/reportdeliverynote/view"
              component={ReportDeliveryNoteView}
            />
            <Route
              exact
              path="/report/reportdeliverynote/new"
              component={ReportDeliveryNoteNew}
            />
            <Route
              exact
              path="/report/reportdeliverynote"
              component={ReportDeliveryNote}
            />
            <Route
              exact
              path="/report/reportdialycom/viewdetail"
              component={ReportDailyCommissionGroupViewDetail}
            />
            <Route
              exact
              path="/report/reportdialycom/view"
              component={ReportDailyCommissionGroupView}
            />
            <Route
              exact
              path="/report/reportdialycom"
              component={ReportDailyCommissionGroup}
            />
            <Route
              exact
              path="/report/reportdialycashbalance/view"
              component={ReportDailyCashBalanceView}
            />
            <Route
              exact
              path="/report/reportdialycashbalance"
              component={ReportDailyCashBalance}
            />
            <Route
              exact
              path="/report/reportdailyinv/view"
              component={ReportDailyINVView}
            />
            <Route
              exact
              path="/report/reportdailyinv"
              component={ReportDailyINV}
            />
            <Route
              exact
              path="/report/reportoutboundinv/view/edit"
              component={ReportOutBoundInventoryView}
            />
            <Route
              exact
              path="/report/reportoutboundinv"
              component={ReportOutBoundInventory}
            />
            <Route
              exact
              path="/report/reportinboundinv/view/edit"
              component={ReportInBoundInventoryView}
            />
            <Route
              exact
              path="/report/reportinboundinv"
              component={ReportInBoundInventory}
            />
            <Route
              exact
              path="/report/reportinv/view"
              component={ReportInventoryView}
            />
            <Route exact path="/report/reportinv" component={ReportInventory} />
            <Route
              exact
              path="/report/reportpo/view/:orderId"
              component={ReportPOView}
            />
            <Route
              exact
              path="/report/reportpo/view"
              component={ReportPOView}
            />
            <Route exact path="/report/reportpo" component={ReportPO} />
            <Route exact path="/report" component={Report} />

            <Route exact path="/Item/view" component={ItemView} />
            <Route exact path="/Item/new" component={ItemNew} />
            <Route exact path="/Item" component={Item} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/" component={DefaultHome} />
          </div>
        );
    }
  } else {
    return (
      <div>
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={DefaultHome} />
      </div>
    );
  }
};
