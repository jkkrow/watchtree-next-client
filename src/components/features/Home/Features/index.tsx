import Row from './_fragments/Row';

export default function Features() {
  return (
    <section className="flex flex-col max-w-9xl py-32 m-auto gap-12">
      <h2 className="font-bold text-3xl">What is Tree-Structued Video?</h2>
      <ul className="flex flex-col gap-20">
        <Row
          header="Interactive Multi-Path Video Format"
          description={
            <>
              <p>
                Our innovative tree-structured video format redefines the way
                you experience video streaming. The root video serves as the
                starting point of your journey, branching out into multiple
                child videos that present you with a range of choices.
              </p>
              <p>
                The unique format allows you to actively participate in the
                video by selecting your desired path, creating a personalized
                and dynamic viewing experience. With each decision you make,
                you&apos;re drawn deeper into a world of engaging content
                that&apos;s tailored to your preferences.
              </p>
            </>
          }
        />
        <Row
          header="Unleash Your Creativity"
          description={
            <p>
              Our platform empowers content creators to think outside the box
              and explore new possibilities with their videos. By leveraging the
              tree-structured video format, you can produce captivating stories
              that unfold in multiple directions, allowing viewers to immerse
              themselves in your creative universe. Whether it&apos;s an
              interactive film, an educational series, or an engaging product
              demonstration, our platform provides you with the tools and
              freedom to craft truly innovative content.
            </p>
          }
        />
        <Row
          header="Active Viewer Engagement"
          description={
            <p>
              Say goodbye to passive video consumption! Our platform encourages
              viewers to become active participants in the content they watch.
              By offering a choice between different child videos, viewers can
              shape their own experiences and engage with content in a more
              meaningful way. This interactive format fosters a deeper
              connection between viewers and creators, resulting in a more
              memorable and satisfying experience for all.
            </p>
          }
        />
      </ul>
    </section>
  );
}
