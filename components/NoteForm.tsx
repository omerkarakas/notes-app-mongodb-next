"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  id?: string;
  action: "Update" | "Add";
  titleProp?: string;
  descriptionProp?: string;
};

const NoteForm = ({ action, id, titleProp, descriptionProp }: Props) => {
  const router = useRouter();

  const [title, setTitle] = useState(() => titleProp || "");
  const [description, setDescription] = useState(() => descriptionProp || "");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!title || !description) {
      alert("title and desc are required!");
      return;
    }

    try {
      let resp: any;
      if (action === "Add") {
        resp = await fetch(`http://localhost:3000/api/notes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
          }),
        });
      } else if (action === "Update") {
        resp = await fetch(`http://localhost:3000/api/notes/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            title,
            description,
          }),
        });
      }

      if (resp.ok) {
        router.push("/");
        router.refresh();
      } else {
        throw new Error(`Failed to ${action.toLowerCase()} note`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
      <label className="input input-bordered flex items-center gap-6 font-semibold">
        Title
        <input
          type="text"
          className="grow font-normal"
          placeholder="Note Title"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
        />
      </label>
      <label className="input input-bordered flex items-center gap-6 font-semibold">
        Description
        <input
          type="text"
          className="grow font-normal"
          placeholder="Note Description"
          value={description}
          onChange={(e: any) => setDescription(e.target.value)}
        />
      </label>
      <button type="submit" className="btn btn-success text-white ">
        {action} Note
      </button>
    </form>
  );
};

export default NoteForm;
