import { client } from "@/utils/sanityClient";

export default async function createComment(req, res) {
  const { id, name, email, comment } = JSON.parse(req.body);
  try {
    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: id,
      },
      name,
      email,
      comment,
      createdAt: new Date().toISOString(),
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: `Couldn't submit comment`, err });
  }
  return res.status(200).json({ message: "Comment submitted" });
}
