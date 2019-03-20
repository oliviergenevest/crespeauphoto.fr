import React from 'react'
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components'
import { graphql, Link, useStaticQuery } from 'gatsby'
import { readableColor } from 'polished'
import Menu from 'react-burger-menu/lib/menus/slide'
import 'typeface-raleway'
import { Box, Flex } from '../elements'
import theme from '../../config/theme'
import config from '../../config'
import reset from '../styles/reset'
import Logo from './logo'
import { FaFacebook, FaInstagram} from 'react-icons/fa'

const StyledBurgerMenu = styled.div`

display: none;
    a {
      color:#4343e2;
      text-decoration:none;
      :hover{
        color:white;
      }
    }
    .bm-item {
      text-transform:uppercase;
        text-align:right;  
        display: inline-block;
        text-decoration: none;
        margin-bottom: 2vh;
        color: #d1d1d1;
        transition: color 0.2s;
    }
    .bm-item:hover {
        color: white;
    }
    .bm-burger-button {
        position: fixed;
        width: 30px;
        height: 25px;
        right: 2vw;
        top: 1.5rem;
        @media (min-width: ${props => props.theme.breakpoints[1]}) {
          top: 2.3rem;
         }

    }
    .bm-burger-bars {
       background:  ${props => readableColor(`${props.color}`)};

    }
    .bm-cross-button {
        height: 30px;
        width: 25px;
    }
    .bm-cross {
        background: #fff;
          height:24px!important;
    }
    .bm-menu {
        background: rgba(0, 0, 0, 1);
        padding: 2.5em 1.2em 0;
        font-size: 1.5em;
    }
    .bm-morph-shape {
        fill: #373a47;
    }
    .bm-item-list {
        color: #fff;
    }

    .bm-overlay {
        background: rgba(0, 0, 0, 0.5);
    }

      @media (max-width: ${props => props.theme.breakpoints[2]}) {
    display: block;
  }
`

const GlobalStyles = createGlobalStyle`
  *::before,
  *::after {
    box-sizing: border-box;
  }
  ::selection {
    color: white;
    background-color: #f6993f;
  }
  html {
    box-sizing: border-box;
    border: 0;
    margin: 0;
    
    h1, h2, h3, h4, h5, h6 {
      font-weight: ${theme.fontWeights.bold};
    }
    
    h1 {
      font-size: ${theme.fontSizes[5]};
    }
    h2 {
      font-size: ${theme.fontSizes[4]};
    }
    h3 {
      font-size: ${theme.fontSizes[3]};
    }
    h4 {
      font-size: ${theme.fontSizes[2]};
    }
    h5 {
      font-size: ${theme.fontSizes[1]};
    }
    h6 {
      font-size: ${theme.fontSizes[0]};
    }
    
    @media (max-width: 600px) {
      font-size: 16px;
      
      h1 {
        font-size: ${theme.fontSizes[4]};
      }
      h2 {
        font-size: ${theme.fontSizes[3]};
      }
      h3 {
        font-size: ${theme.fontSizes[2]};
      }
      h4 {
        font-size: ${theme.fontSizes[1]};
      }
      h5 {
        font-size: ${theme.fontSizes[0]};
      }
      h6 {
        font-size: ${theme.fontSizes[0]};
      }
    }
  }
  body {
    border: 0;
    margin: 0;
    padding: 0;
    color: black;
    font-family: 'Raleway', '-apple-system', 'Roboto', 'Helvetica', 'Arial', sans-serif;
    background: white;
    font-size: 18px;
  }
  a {
    transition: all 0.3s ease-in-out;
   color:black;
    text-decoration: underline;
    &:hover,
    &:focus {
      color: ${theme.colors.primary};
    }
  }

  ul {
    list-style-type:none;
    li {
      text-align:right;
     
     
     
      
    }


  }
  
  ${reset}
`

const isPartiallyActive = ({ isPartiallyCurrent }: { isPartiallyCurrent: boolean }) => {
  return isPartiallyCurrent ? { className: 'navlink-active navlink' } : { className: 'navlink' }
}

const PartialNavLink = (props: any) => (
  <Link getProps={isPartiallyActive} {...props}>
    {props.children}
  </Link>
)


const Wrapper = styled.div`
  display: grid;

  grid-template-columns: ${props => props.theme.sidebarWidth.big} 1fr;
  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    grid-template-columns: ${props => props.theme.sidebarWidth.normal} 1fr;
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    grid-template-columns: 1fr;
  }
`


const SideBarInner = styled(Box)<{ bg: string }>`
  position: fixed;
  height: 100%;
 
  width: ${props => props.theme.sidebarWidth.big};
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;

  background: ${props => props.bg};

  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    width: ${props => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }

  svg {
    fill: ${props => readableColor(`${props.bg}`)};
  }
`

const Nav = styled(Flex)<{ color: string }>`


  @media (max-width: ${props => props.theme.breakpoints[2]}) {
      display:none;  
  }

  a {
    text-transform: uppercase;
    text-decoration: none;
    color: ${props => readableColor(`${props.color}`)};

    font-weight:bold;
    line-height: 1.5;

    &:hover,
    &:focus,
    &.navlink-active {
      color: ${props => props.theme.colors.primary};
    }

    @media (max-width: ${props => props.theme.breakpoints[2]}) {
      font-size: ${props => props.theme.fontSizes[1]};
      margin-left: ${props => props.theme.space[4]};
    }

    @media (max-width: ${props => props.theme.breakpoints[1]}) {
 
      font-size: ${props => props.theme.fontSizes[1]};
      margin-left: ${props => props.theme.space[3]};
    }

    @media (max-width: ${props => props.theme.breakpoints[0]}) {
   
      font-size: ${props => props.theme.fontSizes[0]};
      margin-left: ${props => props.theme.space[2]};
    }


  }

  }

`

const Main = styled.main`
  
  @media (min-width: calc(${props => props.theme.breakpoints[2]} + 1px)) {
    grid-column-start: 2;
  }
`

const Footer = styled.footer<{ color: string }>`
  position: fixed;
  font-size: ${props => props.theme.fontSizes[0]};
  width: ${props => props.theme.sidebarWidth.big};
  bottom: 0;
  text-align: right;
  background: ${props => props.color};

  color: ${props => readableColor(`${props.color}`, `${props.theme.colors.grey}`, '#c3c3c3')};

  a {
    color: ${props => readableColor(`${props.color}`)};
    text-decoration: none;
    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: ${props => props.theme.breakpoints[4]}) {
    width: ${props => props.theme.sidebarWidth.normal};
  }

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    position: relative;
    width: 100%;
  }
`

const SocialLinks = styled.div`
   
    a{
        display: inline-block;
        margin: .5vw;
    }
`

type LayoutProps = { children: React.ReactNode } & typeof defaultProps

const defaultProps = {
  color: 'white',
}

interface QueryResult {
  navigation: {
    edges: {
      node: {
        name: string
        link: string
    
      }
    }[]
  }
}

const Layout = ({ children, color }: LayoutProps) => {
  const data: QueryResult = useStaticQuery(query)

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Wrapper>
        <StyledBurgerMenu  color={color}>
        <Menu right>
            <Link to="/" key="Crespeau">
                   Cyril Crespeau
            </Link>
             <ul>
               {data.projects.edges.map(({ node: project }) => (
                  <li  key={project.title}><PartialNavLink to={project.slug}>
                    {project.title}  
                  </PartialNavLink>
                  </li>

                ))}
            </ul>
            {data.navigation.edges.map(({ node: item }) => (
              <Link to={item.link} key={item.link}>
                {item.name}
              </Link>
            ))}

          <SocialLinks>
              <a target="_blank" rel="noopener noreferrer" href={config.userFacebook} ><FaFacebook size={30} color='white'/></a>           
              <a target="_blank" rel="noopener noreferrer" href={config.userInstagram}><FaInstagram size={30} color='white'/></a>
            </SocialLinks>
        </Menu>
        </StyledBurgerMenu>
          <SideBarInner bg={color} as="aside" p={[6, 6, 8]}>
            <Flex
              flexWrap="nowrap"
              flexDirection={['row', 'row', 'row', 'column']}
              alignItems={['center', 'center', 'center', 'flex-end']}
              justifyContent="space-between"
            >
              <Box >
                <Link to="/" aria-label="Cyril Crespeau, retour à l'accueil">
                  <Logo />
                </Link>
              </Box>
              <Nav
                color={color}
                mt={[0, 0, 0, 10]}
                as="nav"
                flexWrap="nowrap"
                flexDirection={['row', 'row', 'row', 'column']}
                alignItems="flex-end"
              >
              
                <ul>
                {data.projects.edges.map(({ node: project }) => (
                  <li  key={project.title}><PartialNavLink to={project.slug}>
                    {project.title}  
                  </PartialNavLink>
                  </li>

                ))}
                </ul>
                {data.navigation.edges.map(({ node: item }) => (
                  <PartialNavLink to={item.link} key={item.name}>
                    {item.name}  
                  </PartialNavLink>

                ))}

              </Nav>
               
            </Flex>
          </SideBarInner>
          <Main>{children}</Main>
          <Footer color={color}>
            <Box p={[6, 6, 8]} fontSize={0}>
            <SocialLinks>
                <a target="_blank" rel="noopener noreferrer" href={config.userFacebook}><FaFacebook size={20} color={readableColor(color)}/></a>           
                <a target="_blank" rel="noopener noreferrer" href={config.userInstagram}><FaInstagram size={20} color={readableColor(color)}/></a>
              </SocialLinks>
              (c) Cyril Crespeau, 2019. 
              <br />
             Tous droits réservés. <Link to={'/credits'}>crédits</Link>
              
            </Box>
          </Footer>
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

export default Layout

Layout.defaultProps = defaultProps

const query = graphql`
  query LayoutQuery {
    navigation: allNavigationYaml (skip:1){
      edges {
        node {
          name
          link
        }
      }
    }
    projects: allProjectsYaml(skip:1) {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
