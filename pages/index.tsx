import { GetStaticProps } from "next";
import { allPosts, allProjects, Post, Project } from ".contentlayer/generated";
import { pick } from "@contentlayer/client";

import Link from "components/Link";
import Section from "components/Section";
import PostList from "components/postlist";

import { FullName } from "./about";

type HomeProps = {
  posts: Post[];
  projects: Project[];
};

export default function Home({ posts, projects }: HomeProps) {
  return (
    <>
      <div className="flex flex-col gap-20 md:gap-28">
        <div>
          <h1 className="animate-in">{`Zenan "Alan" Chen`}</h1>
          <p
            className="text-secondary animate-in"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            Ph.D. candidate in Information Systems. <br></br>
            I study Technologies ✕ Productivity. <br></br><br></br>
            <Link href="https://zenan.ch/cv.pdf" >CV</Link>
          </p>
        </div>
        <div
          className="flex flex-col gap-4 animate-in"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <h2>Selected research projects</h2>
          <ul className="flex flex-col gap-16">
            {projects.map((project) => (
              <li key={project.title}>
                <Section heading={project.time}>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                      <h3>{project.title}</h3>
                      <p className="text-secondary">{project.description}</p>
                      <Link href={`/project/${project.slug}`} underline>
                        Read More
                      </Link>
                    </div>
                    {/* <Link href={`/project/${project.slug}`}>
                      {project.slug === "tracklib" && <TracklibGraphic />}
                      {project.slug === "bitrefill" && <BitrefillGraphic />}
                      {project.slug === "trailroutes" && <TrailRoutesGraphic />}
                    </Link> */}
                  </div>
                </Section>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex flex-col items-start gap-8 animate-in"
          style={{ "--index": 3 } as React.CSSProperties}
        >
          <h2>Recent blog posts</h2>
          <PostList posts={posts} />
          <Link href="/blog" className="items-start underline">
            See all posts
          </Link>
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = allPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .filter((_, i) => i < 4)
    .map((post) => pick(post, ["slug", "title", "publishedAt", "image"]));

  const projects = allProjects
    .sort((a, b) => parseInt(b.time.slice(0, 4)) - parseInt(a.time.slice(0, 4)))
    .map((post) =>
    pick(post, ["slug", "title", "description", "time"])
  );

  return {
    props: { posts, projects },
  };
};
