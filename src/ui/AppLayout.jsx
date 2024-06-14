import {Outlet} from "react-router-dom";
import {Header} from "./Header.jsx";
import {Sidebar} from "./Sidebar.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    height: 100vh;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    //box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    //box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
`;

const Container = styled.div`
    display: flex;
    max-width: 120rem;
    margin: 0 auto;
    flex-direction: column;
    gap: 3.2rem;
`;

export function AppLayout() {
    return (
        <StyledAppLayout>
            <Header/>
            <Sidebar/>
            <Main>
                <Container>
                    <Outlet/>
                </Container>
            </Main>
        </StyledAppLayout>
    )
}
