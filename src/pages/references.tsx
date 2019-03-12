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
      <SEO title="Références | Cyril Crespeau - Photographe" desc="Cyril Crespeau - Photographe. Mon domaine d’activité s’étend de l’événementiel à la publicité." />
      <AnimatedBox style={pageAnimation} py={[6, 6, 6, 8]} px={[6, 6, 8, 6, 8, 13]}>
        <h1>Références</h1>
        <p>
         Groupe la Varappe, EDF, Jars, Eau de Vals, AOC Cornas, ORANO, Les Villages Clubs du Soleil, Conseil Départemental de la Drôme, Provence Santé, Vibram, Lafuma, Domaine Lou Capitelle, ENJA Records, Les thermes de Vals les bains, Association Grande Traversée des Alpes (GTA), Crest Jazz Vocal, FFTRI, FFA, Laboratoire BIMONT, BEAL, CCI Drôme
        </p>
      </AnimatedBox>
    </Layout>
  )
}

export default About

