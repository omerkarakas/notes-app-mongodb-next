import React from "react";
import RemoveButton from "./RemoveButton";
import Link from "next/link";
import { BsPencilSquare } from "react-icons/bs";

const getNotes = async () => {
  try {
    const response = await fetch(`${process.env.API_URL}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(response.statusText + " , notes not fetched");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching notes", error);
  }
};

const Note = ({
  title,
  description,
  id,
}: {
  id: string;
  title: String;
  description: String;
}) => {
  console.log("id:", id, "title:", title, "description:", description);
  return (
    <div className="flex justify-between items-center rounded-md border border-slate-300 p-6 mt-6 ">
      <div>
        <h2 className="fond-bold text-2xl">{title}</h2>
        <div>{description}</div>
      </div>
      <div className="flex gap-2">
        <RemoveButton id={id} />
        <Link
          href={`/edit-note/${id}`}
          className="btn btn-circle btn-outline btn-sm "
        >
          <BsPencilSquare size={18} />
        </Link>
      </div>
    </div>
  );
};

type Props = {};

const NotesList = async (props: Props) => {
  const notes = await getNotes();
  console.log("notes:", notes);
  return (
    <>
      {notes &&
        notes.map((note: any) => (
          <Note
            key={note._id}
            id={note._id}
            title={note.title}
            description={note.description}
          />
        ))}
    </>
  );
};

export default NotesList;
