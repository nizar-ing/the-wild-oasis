import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";

const StyledSidebar = styled.aside`
    display: flex;
    background-color: var(--color-grey-0);
    padding: 3.2rem 2.4rem;
    border: 1px solid var(--color-grey-100);
    grid-row: 1 / -1;
    flex-direction: column;
    gap: 3.2rem;
`;
export function Sidebar() {
    return (
        <StyledSidebar>
            <Logo />
            <MainNav />
        </StyledSidebar>
    )
}
