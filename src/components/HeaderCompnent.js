import React, {Component} from 'react';
import { Navbar, NavbarBrand, Jumbotron } from 'reactstrap';


class Header extends Component{
    render()
    {
        return (
            <>
                <Navbar dark color="">
                    <div className="container">
                        <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-16">
                                <h1>Restorante Con Fusion</h1>
                                <p>SKIPPING OPTIONAL DEPENDENCYSKIPPING OPTIONAL DEPENDENCYSKIPPING OPTIONAL DEPENDENCYSKIPPING OPTIONAL DEPENDENCY</p>
                            </div>
                        </div>

                    </div>
                </Jumbotron>
            </>
        );
        
    }
}

export default Header;