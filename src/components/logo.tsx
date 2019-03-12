import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'


const Logo = () => (

<StaticQuery query={graphql`
  query {
    file(relativePath: { eq: "logo-cyril-crespeau.png" }) {
      childImageSharp {
        fixed(width: 160) {
          ...GatsbyImageSharpFixed_tracedSVG
        }
      }
    }
  }
`}

 render = { 
    data => (<Img fixed={data.file.childImageSharp.fixed} /> )
     
 }

/>
)

export default Logo
