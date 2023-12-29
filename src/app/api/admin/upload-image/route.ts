import * as dateFn from "date-fns";
import { mkdir, stat, writeFile } from "fs/promises";
import mime from "mime";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("image") as Blob | null;

  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 },
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  console.log(buffer);
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  console.log(relativeUploadDir);
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  console.log(uploadDir);

  try {
    // stat: used to fetch the static information of a directory
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e,
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 },
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    //@ts-ignore
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      "",
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 },
    );
  }
}
