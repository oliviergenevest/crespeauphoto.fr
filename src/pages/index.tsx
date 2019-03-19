import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import styled from 'styled-components'
import { animated, useSpring, config } from 'react-spring'
import Layout from '../components/layout'
import GridItem from '../components/grid-item'
import SEO from '../components/SEO'
import { ChildImageSharp } from '../types'
import GalleryLightbox from '../components/galleryLightbox/GalleryLightbox.js'
type PageProps = {
  data: {
    firstProject: {
      title: string
      slug: string
    }
    threeProjects: {
      edges: {
        node: {
          title: string
          slug: string
          cover: ChildImageSharp
        }
      }[]
    }
    aboutUs: ChildImageSharp
    references: ChildImageSharp
  }
}

const Area = styled(animated.div)`
  display: grid;
  grid-gap: 2vw;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 35vw 40vw 25vw;
  grid-template-areas:
    'first-project about-us about-us'
    'three-projects three-projects three-projects'
    'instagram instagram instagram';

  @media (max-width: ${props => props.theme.breakpoints[3]}) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 35vw 30vw 30vw 25vw;

    grid-template-areas:
      'first-project first-project about-us about-us'
      'three-projects three-projects three-projects three-projects'
      'three-projects three-projects three-projects three-projects'
      'instagram instagram instagram instagram';
  }

  @media (max-width: ${props => props.theme.breakpoints[1]}) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 38vw);

    grid-template-areas:
      'first-project about-us'
      'three-projects three-projects'
      'three-projects three-projects'
      'three-projects three-projects'
      'instagram instagram';
  }

  @media (max-width: ${props => props.theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 50vw);

    grid-template-areas:
      'first-project'
      'about-us'
     
      'instagram';
  }
`

const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`



const Homepage = styled(GridItem)`
  grid-area: first-project;
`





const Index: React.FunctionComponent<PageProps> = ({ data: { projectHomepage, images } }) => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })
  const descAnimation = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })
 
  const PHOTO_SET = images.edges.map((image, i) => {
      // creer 2 jeux de données un pour lightbox (fullsize) l'autre pour gallery (thumbnails , c'est celui-ci)
      // pour cela : modifier la requele graphql en bas, la list des props en haut et passer en prop les 2 listes au composant GalleryLightbox
        return {
          src: image.node.childImageSharp.fluid.src,
          srcSet: image.node.childImageSharp.fluid.srcSet,
          title: image.node.name,
          alt: image.node.name,
          width: image.node.childImageSharp.original.width,
          height: image.node.childImageSharp.original.height,
          fluid: image.node.childImageSharp.fluid
        }
  });

  return (
    <Layout>
      <SEO />

        <GalleryLightbox 
            photos={PHOTO_SET} 
            direction={"column"} 
            margin={1}             
          />
     
    </Layout>
  )
}

export default Index

export const query = graphql`
  query IndexQuery {
    projectHomepage: projectsYaml {
      title
      slug
      desc
      }

    images: allFile(filter: { relativeDirectory: {eq:"homepage" } }, sort: { fields: [birthtime], order: DESC }) {
      edges {
        node {
          name
          relativeDirectory
          childImageSharp {
            original{width, height}
            fluid(quality: 95, maxWidth: 550) {
              ...GatsbyImageSharpFluid
            }

          }
        }
      }
    }



  }
`
