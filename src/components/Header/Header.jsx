import React, { Component } from "react";

class Header extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">
                        Navbar
                    </a>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo02"
                    >
                        <form
                            className="form-inline ml-auto"
                            data-background-color
                        >
                            <div className="form-group has-white">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search"
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
