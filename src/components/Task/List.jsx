import React, { Component } from "react";
import * as Status from "../../constrains/StatusTask";
import OptionStatus from "../Option/OptionStatus";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            status: ""
        };
    }

    onHandleChange = event => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        let { title, status } = this.state;
        this.props.onFilterTask({
            title: name === "title" ? value : title,
            status: name === "status" ? value : status
        });
        this.setState({
            [name]: value
        });
    };

    render() {
        const { title, status } = this.state;
        return (
            <div className="table">
                <table className="table table-bordered">
                    <thead className=" text-primary">
                        <tr>
                            <th
                                className="text-center"
                                style={{ width: "12%" }}
                            >
                                Seri
                            </th>
                            <th
                                className="text-center"
                                style={{ width: "50%" }}
                            >
                                Task
                            </th>
                            <th
                                className="text-center"
                                style={{ width: "20%" }}
                            >
                                Status
                            </th>
                            <th
                                className="text-center"
                                style={{ width: "15%" }}
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                {/* <div className="form-group">
                                    <select className="form-control">
                                        <option>A-Z</option>
                                        <option>Z-A</option>
                                    </select>
                                </div> */}
                            </td>
                            <td>
                                <input
                                    type="text"
                                    className="form-control form-control-lg"
                                    placeholder="Fiter"
                                    name="title"
                                    value={title}
                                    onChange={this.onHandleChange}
                                />
                            </td>
                            <td>
                                <div className="form-group">
                                    <select
                                        className="form-control"
                                        name="status"
                                        value={status}
                                        onChange={this.onHandleChange}
                                    >
                                        <option>All</option>
                                        <OptionStatus
                                            statuses={Status.statuses}
                                        />
                                    </select>
                                </div>
                            </td>
                            <td />
                        </tr>
                        {this.props.children}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default List;
