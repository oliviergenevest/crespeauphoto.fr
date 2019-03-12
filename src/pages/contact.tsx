import React from 'react'
import Layout from '../components/layout'
import { AnimatedBox } from '../elements'
import SEO from '../components/SEO'
import { config, useSpring } from 'react-spring'

const About = () => {
  const pageAnimation = useSpring({
    config: config.slow,
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  return (
    <Layout>
      <SEO title="Contact | Cyril Crespeau - Photographe" desc="Cyril Crespeau - Photographe. Mon domaine d’activité s’étend de l’événementiel à la publicité." />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Ne pas hésiter ...</h1>
        <p>
          ... à me contacter par email ou téléphone, je serai ravi de vous répondre.
         
        </p>
        <h2>Adresse :</h2>
        <p> 8, impasse Charles Dickens<br/>
        26000 VALENCE
        </p>
        <h2>Téléphone :</h2>
        <p>+33 (0)6 62 89 41 81
        </p>
        <h2>E-mail :</h2>
        <p> <a href="mailto:cyril@crespeauphoto.fr">cyril@crespeauphoto.fr</a>
        </p>




      </AnimatedBox>
    </Layout>
  )
}

export default About
