import React, { Component } from "react";

class DeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        };
    }

    onHandleChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name]: value
        });
    };

    validateInput() {
        return true;
    }

    onConfirmDelete = task => {
        this.props.onConfirmDelete(task);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteTask) {
            this.setState({ isShow: true });
        } else {
            this.setState({ isShow: false });
        }
    }

    render() {
        const { isShow } = this.state;
        const { deleteTask } = this.props;

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
                        width: 500,
                        background:
                            "rgb(255, 255, 255) none repeat scroll 0% 0%",
                        minHeight: "100px"
                    }}
                    tabIndex="-1"
                >
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Task</h5>
                        <button
                            type="button"
                            className="close"
                            onClick={() => this.onConfirmDelete(null)}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div
                        className="swal2-content"
                        style={{ display: "block", padding: 30 }}
                    >
                        <h5>Are you sure you want to delete</h5>
                        <h5>{deleteTask ? `${deleteTask.title}?` : ""}</h5>
                        <hr
                            className="swal2-spacer"
                            style={{ display: "block" }}
                        />
                        <button
                            type="button"
                            className="swal2-confirm btn btn-success"
                            onClick={() => this.onConfirmDelete(deleteTask)}
                        >
                            Delete
                        </button>
                        <button
                            type="button"
                            className="swal2-cancel btn btn-danger"
                            style={{ display: "inline-block" }}
                            onClick={() => this.onConfirmDelete(null)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default DeleteModal;
