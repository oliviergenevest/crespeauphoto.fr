import React from 'react'
import {Link} from 'gatsby'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import { config, useSpring } from 'react-spring'

const page404 = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="Page introuvable | Cyril Crespeau - Photographe" desc="Cyril Crespeau - Photographe. Mon domaine d’activité s’étend de l’événementiel à la publicité." />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Oups...cette page est introuvable</h1>
        <p>
          <Link to='/'>Retour à l'accueil</Link>
        </p>
      </AnimatedBox>
    </Layout>
  )
}

export default page404
