import { client } from "@/libs/microcms";
import dayjs from "dayjs";
import "@/components/syntaxHighlighter";
import SyntaxHighlighter from "@/components/syntaxHighlighter";

type Props = {
    id: string;
    title: string;
    body: string;
    publishedAt: string;
    category: { name: string };
};

const getBlogPost = async (id: string): Promise<Props> => {
    const data = await client.get({
        endpoint: `blog/${id}`,
    });
    return data;
};

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const post = await getBlogPost(id);

    const formattedDate = dayjs(post.publishedAt).format("YYYY-MM-DD");

    return (
        <main className="prose lg:prose-lg mx-auto px-5 py-5">
            <h1>{post.title}</h1>
            <div className="text-gray-500">{formattedDate}</div>{" "}
            <div>カテゴリー：{post.category && post.category.name}</div>
            <SyntaxHighlighter content={post.body} />
        </main>
    );
}

export async function generateStaticParams() {
    const contentIds = await client.getAllContentIds({ endpoint: "blog" });

    return contentIds.map((contentId) => ({
        id: contentId, // 各記事のIDをパラメータとして返す
    }));
}
