import React, { Component } from "react";
import { statuses, statusClass } from "../../constrains/StatusTask";

class Item extends Component {
    onDeleteTask = () => {
        this.props.onDeleteTask(null, this.props.task);
    };

    onSelectTask = () => {
        this.props.onSelectTask(this.props.task);
    };

    onToggleTaskStatus = () => {
        this.props.onToggleTaskStatus(this.props.task.id);
    };

    render() {
        const { task, index } = this.props;

        return (
            <tr>
                <td className="text-center">{index}</td>
                <td className="text-left">
                    <div>{task.title}</div>
                    <small>{task.content}</small>
                </td>
                <td className="text-center">
                    <BadgeStatus
                        status={task.status}
                        onToggleTaskStatus={this.onToggleTaskStatus}
                    />
                </td>
                <td className="td-actions text-center">
                    <button
                        className="btn btn-info btn-sm btn-round btn-icon"
                        data-container="body"
                        data-toggle="popover"
                        data-placement="top"
                        data-content="Coming soon"
                    >
                        <i className="now-ui-icons users_single-02" />
                    </button>
                    <button
                        className="btn btn-success btn-sm btn-round btn-icon"
                        onClick={this.onSelectTask}
                    >
                        <i className="now-ui-icons ui-2_settings-90" />
                    </button>
                    <button
                        className="btn btn-danger btn-sm btn-round btn-icon"
                        onClick={this.onDeleteTask}
                    >
                        <i className="now-ui-icons ui-1_simple-remove" />
                    </button>
                </td>
            </tr>
        );
    }
}

export default Item;

const BadgeStatus = props => {
    let index = statuses.indexOf(props.status);
    return (
        <label
            className={`badge badge-${statusClass[index]}`}
            onClick={props.onToggleTaskStatus}
        >
            {props.status}
        </label>
    );
};
