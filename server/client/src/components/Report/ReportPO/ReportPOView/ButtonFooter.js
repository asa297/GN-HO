import React, { Component } from "react";
import { connect } from "react-redux";
import Modal from "react-modal";
import ModalStyle from "../../../../Style/JS/modalStyle";
import { delete_ReportPO } from "../../../../actions";
import { withRouter } from "react-router-dom";
import CircularLoaderBlue from "../../../utils/CircularLoaderBlue";

class ButtonFooter extends Component {
  constructor(props) {
    super(props);

    const { orderId } = props;

    this.state = {
      modalIsOpen: false,
      orderId,
      clickSubmit: false
    };
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  componentWillReceiveProps({ clickSubmit }) {
    this.setState({ clickSubmit });
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  renderModal() {
    return (
      <div>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={() => this.closeModal()}
          style={ModalStyle}
          contentLabel="Example Modal"
        >
          <h6
            ref={subtitle => (this.subtitle = subtitle)}
            style={{ color: "#f00" }}
          >
            Are you sure to delete this?
          </h6>
          <button
            className="red btn-flat right white-text"
            onClick={() => {
              this.props.delete_ReportPO(
                this.state.orderId,
                this.props.history
              );
            }}
          >
            delete
          </button>
          <button
            className="amber btn-flat right white-text"
            onClick={() => this.closeModal()}
          >
            close
          </button>
        </Modal>
      </div>
    );
  }

  renderButton() {
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            className="red btn-flat white-text left"
            style={{ marginTop: "30px" }}
            type="button"
            onClick={() => this.openModal()}
          >
            Delete
          </button>
          <div />
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            {this.state.clickSubmit ? <CircularLoaderBlue /> : null}
            <button
              className="green btn-flat white-text right"
              style={{ marginTop: "30px" }}
              type="submit"
            >
              Save
            </button>
          </div>
        </div>

        {this.renderModal()}
      </div>
    );
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}

function mapStateToProps({}) {
  return {};
}

export default connect(
  mapStateToProps,
  { delete_ReportPO }
)(withRouter(ButtonFooter));
