import NoteForm from "@/components/NoteForm";
import React from "react";

type Props = {
  params: { id: string };
};

const getNoteById = async (id: string) => {
  try {
    const response = await fetch(`${process.env.API_URL}/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText + " , Failed to fetch note");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching note:", error);
  }
};

const page = async ({ params }: Props) => {
  const { id } = params;
  const { _id, title, description } = await getNoteById(id);
  return (
    <NoteForm
      action="Update"
      id={_id}
      titleProp={title}
      descriptionProp={description}
    />
  );
};

export default page;
