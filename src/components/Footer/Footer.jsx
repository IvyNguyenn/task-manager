import React, { Component } from "react";

class Footer extends Component {
    render() {
        return (
            <footer className="footer" data-background-color="gray">
                <div className="container">
                    <nav>
                        <ul>
                            <li>
                                <a href="https://www.creative-tim.com">
                                    Creative Tim
                                </a>
                            </li>
                            <li>
                                <a href="http://presentation.creative-tim.com">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="http://blog.creative-tim.com">Blog</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="copyright" id="copyright">
                        © , Designed by{" "}
                        <a href="https://www.invisionapp.com" target="">
                            Invision
                        </a>
                        -
                        <a href="https://www.creative-tim.com" target="">
                            Creative Tim
                        </a>
                        . Coded by{" "}
                        <a
                            href="https://www.linkedin.com/in/vy-nguyen-431254130/"
                            target=""
                        >
                            Hoang Vy Nguyen
                        </a>
                        <a
                            href=""
                            className="btn btn-icon btn-round btn-neutral btn-github "
                        >
                            <i className="fab fa-github-square" />
                        </a>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
