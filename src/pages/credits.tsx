import React from 'react'
import {Link} from  'gatsby'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import { config, useSpring } from 'react-spring'

const Credit = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="Crédits | Cyril Crespeau - Photographe" desc="Cyril Crespeau - Photographe. Mon domaine d’activité s’étend de l’événementiel à la publicité." />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Crédits </h1>
        <h2>Website</h2>
        <p>
         Olivier Genevest : <a href ='https://oliviergenevest.info' target="_blank" rel="noopener noreferrer" >https://oliviergenevest.info</a> 
        </p>

        <h2>Photos</h2>
        <p>
         Cyril Crespeau : <a href ='https://crespeauphoto.fr' target="_blank" rel="noopener noreferrer" >https://crespeauphoto.fr</a> 
        </p>
      </AnimatedBox>
    </Layout>
  )
}

export default Credit
