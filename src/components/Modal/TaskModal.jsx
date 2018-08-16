import React, { Component } from "react";
import * as Status from "../../constrains/StatusTask";
import OptionStatus from "../Option/OptionStatus";

class TaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            id: "",
            title: "",
            content: "",
            status: Status.ACTIVE_STATUS
        };
    }

    onResetForm = () => {
        this.setState({
            id: "",
            title: "",
            content: "",
            status: Status.ACTIVE_STATUS
        });
    };

    onToggleModal = () => {
        this.onResetForm();
        this.props.onToggleTaskModal();
    };

    onHandleChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    };

    validateInput() {
        let { title } = this.state;
        if (title) return true;
        return false;
    }

    onSubmit = event => {
        event.preventDefault();
        if (this.validateInput()) {
            let { id, title, content, status } = this.state;
            this.props.onSubmitTask({
                id,
                title,
                content,
                status
            });
            this.onToggleModal();
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.selectTask) {
            let { id, title, content, status } = nextProps.selectTask;
            this.setState({
                id,
                title,
                content,
                status
            });
        }
    }

    render() {
        const { isShow } = this.props;
        const { id, title, status, content } = this.state;
        return (
            <div
                className={`swal2-container swal2-fade ${
                    isShow ? "swal2-in" : ""
                }`}
                style={{ overflowY: "auto" }}
            >
                <div
                    className="swal2-modal swal2-show"
                    style={{
                        display: isShow ? "block" : "none",
                        width: 450,
                        background:
                            "rgb(255, 255, 255) none repeat scroll 0% 0%",
                        minHeight: "300px"
                    }}
                    tabIndex="-1"
                >
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {id ? "Update Task" : "Add Task"}
                        </h5>
                        <button
                            type="button"
                            className="close"
                            onClick={this.onToggleModal}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div
                        className="swal2-content"
                        style={{ display: "block", padding: 20 }}
                    >
                        <div className="card-body">
                            <form>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <i className="now-ui-icons text_caps-small" />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={title}
                                        className="form-control form-control-lg"
                                        placeholder="Title..."
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea
                                        className="form-control"
                                        placeholder="Content..."
                                        rows="1"
                                        name="content"
                                        value={content}
                                        onChange={this.onHandleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <select
                                        className="form-control form-control-lg"
                                        name="status"
                                        value={status}
                                        onChange={this.onHandleChange}
                                    >
                                        <OptionStatus
                                            statuses={Status.statuses}
                                        />
                                    </select>
                                </div>
                            </form>
                        </div>
                        <hr
                            className="swal2-spacer"
                            style={{ display: "block" }}
                        />
                        <button
                            type="button"
                            className="swal2-confirm btn btn-success"
                            onClick={this.onSubmit}
                        >
                            {id ? "Update" : "Add"}
                        </button>
                        <button
                            type="button"
                            className="swal2-cancel btn btn-danger"
                            style={{ display: "inline-block" }}
                            onClick={this.onToggleModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskModal;
