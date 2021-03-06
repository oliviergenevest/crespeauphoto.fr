import React from 'react'
import { graphql, Link } from 'gatsby'
import Img from 'gatsby-image'
import { transparentize, readableColor } from 'polished'
import styled from 'styled-components'
import { config, useSpring, animated } from 'react-spring'
import Layout from '../components/layout'
import { Box, AnimatedBox, Button } from '../elements'
import SEO from '../components/SEO'
import GalleryLightbox from '../components/galleryLightbox/GalleryLightbox.js'
/*import Menu from 'react-burger-menu/lib/menus/slide'*/
/*
 bloc qui rendait une Img par ligne sur le starter
          {images.edges.map(image => (
            <Img
              alt={image.node.name}
              key={image.node.childImageSharp.fluid.src}
              fluid={image.node.childImageSharp.fluid}
            />
          ))}

*/
const PBox = styled(AnimatedBox)`
  max-width: 1400px;
  margin: 0 auto;
 
`

const Content = styled(Box)<{ bg: string }>`
  background-color: ${props => transparentize(1, props.bg)};

  .gatsby-image-wrapper:not(:last-child) {
    margin-bottom: ${props => props.theme.space[10]};

    @media (max-width: ${props => props.theme.breakpoints[3]}) {
      margin-bottom: ${props => props.theme.space[8]};
    }
  }
`

const References = styled(AnimatedBox)`
  letter-spacing: 0.05em;
  font-size: ${props => props.theme.fontSizes[1]};
  text-transform: uppercase;
`

const Description = styled(animated.div)`
  max-width: 960px;
  letter-spacing: -0.003em;
  --baseline-multiplier: 0.179;
  --x-height-multiplier: 0.35;
  line-height: 1.58;
`

const PButton = styled(Button)<{ color: string }>`
  background: ${props => (props.color === 'white' ? 'black' : props.color)};
  color: ${props => readableColor(props.color === 'white' ? 'black' : props.color)};
  cursor:pointer;
`

type PageProps = {
  data: {
    project: {
      title_detail: string
      color: string
      references: string
      desc: string
      slug: string
      parent: {
        modifiedTime: string
        birthTime: string
      }
      cover: {
        childImageSharp: {
          resize: {
            src: string
          }
        }
      }
    }
    images: {
      edges: {
        node: {
          name: string
          childImageSharp: {
            original: {
              width: number
              height: number
            }
            fluid: {
              aspectRatio: number
              src: string
              srcSet: string
              sizes: string
              base64: string
              tracedSVG: string
              srcWebp: string
              srcSetWebp: string
            }
          }
        }
      }[]
    }
  }
}

  

  
const Project: React.FunctionComponent<PageProps> = ({ data: { project, images, imagesFull } }) => {
  const categoryAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0, transform: 'translate3d(0, -30px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
  })

  const titleAnimation = useSpring({ config: config.slow, delay: 300, from: { opacity: 0 }, to: { opacity: 1 } })
  const descAnimation = useSpring({ config: config.slow, delay: 600, from: { opacity: 0 }, to: { opacity: 1 } })
  const imagesAnimation = useSpring({ config: config.slow, delay: 800, from: { opacity: 0 }, to: { opacity: 1 } })

  const PHOTO_SET = images.edges.map((image, i) => {
    // creer 2 juex de données un pour lightbox (fullsize) l'autre pour gallery (thumbnails , c'est celui-ci)
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

 const PHOTO_SET_FULL = imagesFull.edges.map((image, i) => {
    // creer 2 juex de données un pour lightbox (fullsize) l'autre pour gallery (thumbnails , c'est celui-ci)
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
    <Layout color={project.color}>
      <SEO
        pathname={project.slug}
        title={`${project.title_detail} | Cyril Crespeau - Photographe`}
        desc={project.desc}
        node={project.parent}
        banner={project.cover.childImageSharp.resize.src}
        individual={true}
      />

      <PBox py={10} px={[6, 6, 8, 10]}>
        <References style={categoryAnimation}>{project.references}</References>
        <animated.h1 style={titleAnimation}>{project.title_detail}</animated.h1>
        <Description style={descAnimation}>
          <div dangerouslySetInnerHTML={{ __html: project.desc }} />
        </Description>
      </PBox>
      <Content bg={project.color} py={0}>
        <PBox style={imagesAnimation} px={[6, 6, 8, 10]}>
          <GalleryLightbox 
            photos={PHOTO_SET} 
            fullSizePhotos={PHOTO_SET_FULL} 
            direction={"column"} 
            margin={5}             
          />
        </PBox>
      </Content>
      <PBox py={10} px={[6, 6, 8, 10]}>
        <h2>Vous avez un projet ?</h2>
        <Link to ="/contact"><PButton color={project.color} py={4} px={8}>
         Me contacter
        </PButton></Link>
      </PBox>
    </Layout>
  )
}

export default Project

export const query = graphql`
  query ProjectTemplate($slug: String!, $images: String!) {
    project: projectsYaml(slug: { eq: $slug }) {
      title_detail
      color
      references
      desc
      slug
      parent {
        ... on File {
          modifiedTime
          birthTime
        }
      }
      cover {
        childImageSharp {
          resize(width: 1200, height: 675, quality: 80) {
            src
          }
        }
      }
    }
    images: allFile(filter: { relativePath: { regex: $images } }, sort: { fields: [birthtime], order: DESC }) {
      edges {
        node {
          name
          relativeDirectory
          childImageSharp {
            original{width, height}
            fluid(quality: 75, maxWidth: 550) {
              ...GatsbyImageSharpFluid
            }

          }
        }
      }
    }
    imagesFull: allFile(filter: { relativePath: { regex: $images } }, sort: { fields: [birthtime], order: DESC }) {
      edges {
        node {
          name
          relativeDirectory
          childImageSharp {
            original{width, height}
            fluid(quality: 95, maxWidth: 1800) {
              ...GatsbyImageSharpFluid
            }

          }
        }
      }
    }
  }
`

