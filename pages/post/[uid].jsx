import Link from "next/link";
import Header from "../../components/Header";
import { createClient, linkResolver } from "../../prismicio";
// import PortableText from "react-portable-text";
// import richTextToMarkdown from "@edwinjoseph/prismic-richtext-markdown";
// import MarkdownIt from "markdown-it";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

const Home = ({ page, portableTextContent }) => {
  // const md = new MarkdownIt();
  // const rich = page.data.content[0].text;
  // const mkdown = richTextToMarkdown(rich, linkResolver);
  // const result = md.render(mkdown);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = async function SubmitHandler(data) {
    setSubmitted(true);
    console.log(submitted);
  };
  const { data } = page;

  return (
    <main className="max-w-7xl mx-auto">
      <img className="w-full h-72 object-cover " src={data.img.url} alt="" />
      <article className="max-w-3xl mx-auto p-5 text-right">
        <h1 className="text-3xl mt-10 mb-3">{data.title}</h1>
        <div>
          <p>
            {" "}
            بقلم <span className="text-green-600">{data.author[0]?.text}</span>
            <br />
            نشر في {data.date}
          </p>
          <p className="my-10"> {data.content[0].text} </p>
        </div>
      </article>
      <hr className="max-w-g mx-auto border border-yellow-500" />
      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bold">Thanks for commenting this!</h3>
          <p>once it has been approved, it will appear below!</p>
        </div>
      ) : (
        <form className="mx-5 my-10" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-sm text-yellow-500 ">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below</h4>
          <hr className="max-w-3xl  border border-yellow-200" />

          <label className="block mb-5" htmlFor="">
            <input name="id" value={data.uid} type="hidden" />
            <span className="text-gray-700 ">Name</span>
            <input
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 "
              placeholder="Jhon ..."
              type="text"
              {...register("name", { required: true })}
            />
          </label>
          <label className="block mb-5" htmlFor="">
            <span className="text-gray-700 ">Email</span>
            <input
              {...register("email", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 "
              type="text"
            />
          </label>
          <label className="block mb-5" htmlFor="">
            <span className="text-gray-700 ">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="outline-none focus:ring shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500"
              placeholder="your comment"
              rows={8}
            />
          </label>
          <div>
            {errors.name && (
              <p className="text-red-500">-The name is required</p>
            )}
            {errors.email && (
              <p className="text-red-500">-The comment field is required</p>
            )}
            {errors.comment && (
              <p className="text-red-500">-The Email is required</p>
            )}
          </div>
          <input
            className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
            type="submit"
          />
        </form>
      )}
    </main>
  );
};
export async function getStaticPaths({ previewData }) {
  const client = createClient({ previewData });

  const page = await client.getAllByType("blogpost", {
    orderings: {
      field: "document.last_publication_date",
      direction: "desc",
    },
  });

  const paths = page.map((post) => ({
    params: {
      uid: post.uid,
    },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
export async function getStaticProps({ previewData, params }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("blogpost", params?.uid);

  return {
    props: { page },
  };
}
export default Home;
