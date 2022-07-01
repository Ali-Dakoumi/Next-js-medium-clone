import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import postcss from "postcss";
import Header from "../components/Header";
import { createClient } from "../prismicio";
import Hero from "../components/Hero";

const Home = ({ page }) => {
  console.log(page);
  if (page.length > 9) {
    page = page.slice(0, 8);
  }
  return (
    <>
      <Head>
        <title>كالشيو</title>
      </Head>
      <Hero title={"كالشيو هو مكان للكتابة والقراءة والتواصل"} />
      <div className="max-w-7xl mx-auto mt-5 pr-7">
        <h3 className="text-right font-bold">آخر الأخبار والمقالات </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 max-w-7xl mx-auto">
        {page.map((post) => (
          <Link key={post.id} href={`/post/${post.uid}`}>
            <div className="group overflow-hidden cursor-pointer border rounded-lg ">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out "
                src={post.data.img.url}
                alt=""
              />
              <div className="flex justify-between items-end p-2 bg-white ">
                <div className="text-right self-end ">
                  <p className="text-lg font-bold pb-2"> {post.data.title} </p>
                  <p className="text-xs ">
                    {post.data.description[0].text} -
                    <br />
                    بقلم {post.data.author[0]?.text} - {post.data.date}
                  </p>
                </div>
                <img src="" alt="" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export async function getStaticProps({ params, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getAllByType("blogpost", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  return {
    props: { page },
  };
}
export default Home;
