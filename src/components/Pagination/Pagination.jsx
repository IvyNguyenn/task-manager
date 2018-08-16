import React, { Component } from "react";

class Pagination extends Component {
    render() {
        return (
            <ul className="pagination pagination-primary justify-content-end">
                <li className="page-item">
                    <a className="page-link" href="" aria-label="Previous">
                        <span aria-hidden="true">
                            <i
                                className="fa fa-angle-double-left"
                                aria-hidden="true"
                            />
                        </span>
                    </a>
                </li>
                <li className="page-item active">
                    <a className="page-link" href="">
                        1
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="">
                        2
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="">
                        3
                    </a>
                </li>
                <li className="page-item">
                    <a className="page-link" href="" aria-label="Next">
                        <span aria-hidden="true">
                            <i
                                className="fa fa-angle-double-right"
                                aria-hidden="true"
                            />
                        </span>
                    </a>
                </li>
            </ul>
        );
    }
}

export default Pagination;
