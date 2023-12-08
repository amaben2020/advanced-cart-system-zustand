import Plunk from "@plunk/node";
import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import Email from "../../../components/module/email/index";

export const POST = async (req: NextRequest, _: NextResponse) => {
  try {
    const { url, subject, to } = await req.json();

    if (!url || !subject || !to) {
      return NextResponse.json({ message: "Check the request body" });
    }

    const plunk = new Plunk(process.env.PLUNK_API_KEY!);

    const emailHtml = render(Email({ url }));
    plunk.emails.send({
      to,
      subject,
      body: emailHtml,
    });

    return NextResponse.json(
      { message: "Message delivered" },
      { status: 201, statusText: "Delivered successfully" },
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Check email properly",
      },

      {
        status: 401,
        statusText: "Something went wrong",
      },
    );
  }
};
