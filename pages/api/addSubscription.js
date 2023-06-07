import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_API_SERVER,
});

export default async function addSubscription(req, res) {
  const { email } = req.body;
  try {
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: "subscribed",
      }
    );
    res.status(200).json({ ok: true, response });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err,
    });
  }
}
