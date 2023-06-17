import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input,Button } from 'reactstrap';

//SimpleBar
import SimpleBar from "simplebar-react";

//import images
import image2 from "../../assets/images/users/avatar-2.jpg";
import image3 from "../../assets/images/users/avatar-3.jpg";
import image5 from "../../assets/images/users/avatar-5.jpg";

const SearchOption = () => {
    const [value, setValue] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('customer');
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (value) => {
        setSelectedItem(value);
        setIsOpen(false); // close the dropdown after selection
    };
    return (
        <React.Fragment>
            <form className="app-search d-none d-md-block">
                <div className="hstack gap-0">
                    <div className="">
                        <Button className="btn btn-light input-group-text"
                            style={{
                                borderTopLeftRadius: '30px',
                                borderBottomLeftRadius: '30px',
                                backgroundColor: '#fff'
                            }}>
                            {selectedItem === 'customer' ? (
                                <i className="bx bx-user"></i>
                            ) : selectedItem === 'job' ? (
                                <i className="bx bx-car"></i>
                            ) : selectedItem === 'tags' ? (
                                <i className="bx bx-hash"></i>
                            ) : null}
                        </Button>
                    </div>
                    <Input type="hidden" id="w_top_search_type" value="customer" />
                    <Input type="text" className="form-control " value="" autocomplete="off" placeholder="Search" />
                    <div className="input-group-prepend">
                        <Button
                            type="button"
                            className="btn btn-light btn-icon dropdown-toggle"
                            style={{
                                borderTopRightRadius: "30px",
                                borderBottomRightRadius: "30px",
                                backgroundColor: "#fff"
                            }}
                            aria-expanded={isOpen}
                            onClick={toggleDropdown}
                        ></Button>
                        {isOpen && (
                            <div
                                className="dropdown-menu show"
                                style={{
                                    position: "absolute",
                                    willChange: "transform",
                                    top: "15px",
                                    left: "0px",
                                    transform: "translate3d(155px, 40px, 0px)"
                                }}
                            >
                                <a href="#" className="dropdown-item top_search_type" onClick={() => handleItemClick('customer')} data-value="customer" data-view="w">
                                    Customer
                                </a>
                                <a href="#" className="dropdown-item top_search_type" onClick={() => handleItemClick('job')} data-value="other" data-view="w">
                                    Job/Opportunity Number
                                </a>
                                <a href="#" className="dropdown-item top_search_type" onClick={() => handleItemClick('tags')} data-value="tags" data-view="w">
                                    Tags
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </React.Fragment>
    );
};

export default SearchOption;