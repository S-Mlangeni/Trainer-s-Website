import styled from "styled-components";

export const Navlinks = styled.ul`
    @media (max-width: 700px) {
        flex-direction: column;
        position: absolute;
        left: 100%;
        border-left: gray solid 0.5px;
        top: 70px;
        background-color: rgba(0, 11, 48, 0.7);
        height: 100%;
        align-items: center;
        /*transform: translateX(0%); *//* Transforms the element as specified
        */
        /*transition-property: transform; /* Identifies the css property to
        be changed or transitioned when an event occurs. */
        /*transition-duration: 6s; /* Specfies the time duration for the property
        to transition/change from its intial to its final state. */
        /*transition-timing-function: ease-in; *//* Specifies a speed gradient
        for property (i.e. "ease-in" starts slow and ends fast, the opposite
        is true with "ease-out" */
        transition: transform ${props => props.time}; /* (transition-property, -duration,
        -timing-function, -delay) */
        transform: ${props => props.slide};
    }
`;