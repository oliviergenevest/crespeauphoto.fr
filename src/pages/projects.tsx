import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { config, animated, useSpring } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'

type PageProps = {
  data: {
    projects: {
      edges: {
        node: {
          title: string
          slug: string
          cover: ChildImageSharp
        }
      }[]
    }
  }
}

const Area = styled(animated.div)`
  display: grid;
  padding:0 2vw;
   grid-gap:2vw;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 50vw;

  @media (max-width: ${props => props.theme.breakpoints[2]}) {
    padding:0;
    grid-template-columns: 1fr;
    grid-auto-rows: 60vw;
  }
`

const Projects: React.FunctionComponent<PageProps> = ({ data: { projects } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout color="#fff">
      <SEO title="Portfolio | Cyril Crespeau - Photographe" />
      <Area style={pageAnimation}>
        {projects.edges.map(({ node: project }) => (
          <GridItem key={project.slug} to={project.slug}>
            <Img fluid={project.cover.childImageSharp.fluid} />
            <span>{project.title}</span>
          </GridItem>
        ))}
      </Area>
    </Layout>
  )
}

export default Projects

export const query = graphql`
  query ProjectsQuery {
    projects: allProjectsYaml {
      edges {
        node {
          title
          slug
          cover {
            childImageSharp {
              fluid(quality: 95, maxWidth: 1200) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      }
    }
  }
`
