import React, {useState} from 'react';
import "./style.css";
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
require("dotenv").config();

function Site() {
    const [Active, setActive] = useState(false);
    const [Active_link, setActive_link] = useState("active");
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Message, setMessage] = useState("");
    

    const burgerclicked = (event) => {
        setActive(!Active); /* Allows the state value to be toggled */ 
        setActive_link("active");
    }

    const linksclicked = (event) => {
        setActive_link("active-links"); /* Allows the state value to be toggled */ 
        
    }

    const NameFunc = (event) => {
        setName(event.target.value);
    }
    const EmailFunc = (event) => {
        setEmail(event.target.value);
    }
    const MessageFunc = (event) => {
        setMessage(event.target.value);
    }

    const SendData = async (event) => {
        event.preventDefault();
        //const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const Data_rough = await fetch(/*proxyurl +*/ process.env.REACT_APP_API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ /* Converts the JS data to a JSON string which is stored 
            inside the body parameter. Coversion is necessary, otherwise, data will not be post 
            successfully */ 
            name: Name,
            email: Email,
            message: Message
            })
        })
        const Data_jsonformat = await Data_rough.json();
        console.log(Data_jsonformat.status);
        
        setName("");
        setEmail("");
        setMessage("");

        if (Data_jsonformat.outcome) {
            alert("Your message has been sent. Thank you.");
        } else {
            alert("An error has occurred. Please try again.");
        }
        
    }

    return (
        <div>
            <div className="navbar_homesection">
                {/* Navigation bar */} 
                <a name="home"></a>
                <header className="navbar">
                    <h1>P. Trainer</h1>
                    <nav className="navitems" id="navitems">
                        <ul className={Active ? `navlinks navlinks-${Active_link}` : "navlinks"} id="navlinks"> {/* If 
                        "Active" is "true" then use first/left option, otherwise use second/right 
                        option */}
                            <li><a href="#home" onClick={linksclicked}>Home</a></li>
                            <li><a href="#about" onClick={linksclicked}>About</a></li>
                            <li><a href="#testimonials" onClick={linksclicked}>Testimonials</a></li>
                            <li><a href="#programs" onClick={linksclicked}>Programs</a></li>
                            <li><a href="#contact" onClick={linksclicked}>Contact</a></li>
                        </ul>
                        <div className="burgermenu" id="burger" onClick={burgerclicked}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </nav>
                    
                </header>
                {/* Home section */}
                <section className="homesection">
                    <h2>Fitness Made Easy</h2>
                    <h3>Premium personal training services in the North area</h3>
                </section>
            </div>
            {/* About section */}
            <a name="about"></a>
            <section className="aboutsection">
                <h2>About Us</h2>
                <p>Our training programmes are designed not only to help you 
                    learn correct exercise form, but also to help you improve 
                    your strength, lose weight if needed and create a quality 
                    of life you can enjoy. This way your confidence will soar, 
                    your body will feel and look amazing and there won't be 
                    anything you can't achieve with dedication and commitment.
                </p>
            </section>
            {/* Testimonial section */}
            <a name="testimonials"></a>
            <section className="testimonialsection">
                <div className="testimonialheading">
                    <h2>Testimonials</h2>
                </div>
                <div className="clienttestimonial">
                    <h4>Name Surname</h4>
                    <p>Our training programmes are designed not only to help you 
                    learn correct exercise form, but also to help you improve 
                    your strength, lose weight if needed and create a quality 
                    of life you can enjoy.
                    </p>
                </div>
                <div className="clienttestimonial">
                    <h4>Name Surname</h4>
                    <p>Our training programmes are designed not only to help you 
                    learn correct exercise form, but also to help you improve 
                    your strength, lose weight if needed and create a quality 
                    of life you can enjoy.
                    </p>
                </div>
            </section>
            {/* Program section */}
            <a name="programs"></a>
            <section className="programsection">
                <h2>Our Programs</h2>
                <p>Our training programmes are designed not only to help you 
                    learn correct exercise form, but also to help you improve 
                    your strength, lose weight if needed and create a quality 
                    of life you can enjoy. This way your confidence will soar, 
                    your body will feel and look amazing and there won't be 
                    anything you can't achieve with dedication and commitment.
                </p>
            </section>
            {/* Contact section */}
            <a name="contact"></a>
            <section className="contactsection">
                <h2>Contact Us</h2>
                <form>
                    <input type="text" placeholder="Name" value={Name} onChange={NameFunc}/>
                    <input type="email" placeholder="Email" value={Email} onChange={EmailFunc}/>
                    <textarea cols="30" rows="3" placeholder="Message" value={Message} onChange={MessageFunc}></textarea>
                    <input type="submit" value="Send" className="sendbtn" onClick={SendData}/>
                </form>
                <ul>
                    <li>
                        <h4>Address</h4>
                        <p>Untitled Corp
                            1234 Somewhere Rd
                            Nashville, TN 00000
                        </p>
                    </li>
                    <li>
                        <h4>Email</h4>
                        <p>info@untitled.tld</p>
                    </li>
                    <li>
                        <h4>Phone</h4>
                        <p>(000) 555-0000</p>
                    </li>
                    <li className="icons">
                        <a href="#"><i><FaFacebookF/></i></a>
                        <a href="#"><i><FaTwitter/></i></a>
                        <a href="#"><i><FaInstagram/></i></a>
                    </li>
                </ul>
            </section>
            {/* Footer section */}
            <footer className="footersection">
                <h2>P. Trainer</h2>
                <p>Copyright &copy; 2020 - 2021</p>
                <p>Designed by S. Mlangeni</p>
            </footer>
        </div>
    )
}
 
export default Site;

/* const navlinks = document.getElementById("navlinks");
const burger = document.getElementById("burger");

burger.addEventListener("click", slidemenu);

function slidemenu () {
    navlinks.classNameList.toggle("navlinks-active"); *//* "toggle" adds and removes
    the specified className to an element when the event occurs, unlike "add" and
    "remove" which only add and remove respectively. *//*
}

*/
