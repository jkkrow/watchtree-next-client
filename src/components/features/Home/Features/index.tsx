import { motion } from 'framer-motion';

import Row from './Row';
import TreeVisual from './Visual/Tree';
import PlayerVisual from './Visual/Player';
import SelectionVisual from './Visual/Selection';
import { featureVariants } from '@/constants/variants';

export default function Features() {
  return (
    <motion.section
      className="flex flex-col max-w-8xl py-32 m-auto gap-12"
      variants={featureVariants.container}
      initial="inActive"
      whileInView="active"
      viewport={{ once: true }}
    >
      <h2 className="font-bold text-3xl">What is Tree-Structured Video?</h2>
      <ul className="flex flex-col gap-32">
        <Row
          index={1}
          header="Interactive Multi-Path Video Format"
          description={
            <>
              <p>
                Our innovative tree-structured video format redefines the way
                you experience video streaming. The <b>root video</b> serves as
                the starting point of your journey, branching out into multiple
                <b> child videos</b> that present you with a range of choices.
              </p>
              <p>
                The unique format allows you to actively participate in the
                video by selecting your desired path, creating a personalized
                and dynamic viewing experience. With each decision you make,
                you&apos;re drawn deeper into a world of creative content.
              </p>
            </>
          }
          visual={TreeVisual}
        />
        <Row
          index={2}
          header="Unleash Your Creativity"
          description={
            <>
              <p>
                Our platform empowers content creators to think outside the box
                and explore new possibilities with their videos. By leveraging
                the tree-structured video format, you can produce captivating
                stories that unfold in multiple directions, allowing viewers to
                immerse themselves in your creative universe.{' '}
              </p>
              <p>
                Whether it&apos;s an
                <b> interactive film</b>, an <b>educational series</b>, or an
                <b> engaging product demonstration</b>, our platform provides
                you with the tools and freedom to craft truly innovative
                content.
              </p>
            </>
          }
          visual={PlayerVisual}
        />
        <Row
          index={3}
          header="Active Viewer Engagement"
          description={
            <>
              <p>
                Say goodbye to passive video consumption! Our platform
                encourages viewers to become active participants in the content
                they watch. By offering a <b>choice</b> between different child
                videos, viewers can shape their own experiences and engage with
                content in a more meaningful way.
              </p>
              <p>
                This interactive format fosters a deeper connection between
                viewers and creators, resulting in a more memorable and
                satisfying experience for all.
              </p>
            </>
          }
          visual={SelectionVisual}
        />
      </ul>
    </motion.section>
  );
}
