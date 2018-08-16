import React, { Component } from "react";

class Control extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowFabMenu: false,
            search: ""
        };
    }

    onHandleChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        if (name === "search" && value === "") this.props.onSearchTask("");
        this.setState({
            [name]: value
        });
    };

    onToggleFabMenu = () => {
        this.setState({
            isShowFabMenu: !this.state.isShowFabMenu
        });
    };

    onToggleModal = () => {
        this.props.onToggleTaskModal();
    };

    onSearchTask = () => {
        this.props.onSearchTask(this.state.search);
    };

    onDeleteTask = () => {
        this.props.onDeleteTask(true, {
            title: "All tasks",
            status: ""
        });
    };

    onSubmit = event => {
        event.preventDefault();
    };

    render() {
        const { isShowFabMenu, search } = this.state;
        return (
            <div>
                <br />
                <h3 className="center">Task Manager</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col">
                            <button
                                className="btn btn-primary"
                                onClick={this.onToggleModal}
                            >
                                <i className="now-ui-icons ui-1_simple-add" />{" "}
                                Add Task
                            </button>
                        </div>
                        <div className="col">
                            <div className="input-group ">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search..."
                                    name="search"
                                    value={search}
                                    onChange={this.onHandleChange}
                                />
                                <div className="input-group-append">
                                    <div
                                        className="input-group-text"
                                        onClick={this.onSearchTask}
                                    >
                                        <i
                                            className="now-ui-icons ui-1_zoom-bold"
                                            style={{ marginLeft: 5 }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div hidden={!isShowFabMenu} className="cf-inspector-edit-menu">
                    <button
                        className="btn btn-danger btn-icon btn-round "
                        onClick={this.onDeleteTask}
                    >
                        <i className="now-ui-icons ui-1_simple-delete" />
                    </button>
                    <button
                        className="btn btn-success btn-icon btn-round "
                        onClick={this.onToggleModal}
                    >
                        <i className="now-ui-icons ui-1_simple-add" />
                    </button>
                </div>
                <div className="cf-inspector-edit">
                    {/* fab menu */}
                    <button
                        className="btn btn-primary btn-icon btn-round"
                        onClick={this.onToggleFabMenu}
                    >
                        <i className="now-ui-icons ui-2_favourite-28" />
                    </button>
                </div>
            </div>
        );
    }
}

export default Control;
