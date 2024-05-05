"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { HiTrash } from "react-icons/hi";

type Props = { id: string };

const RemoveButton = ({ id }: Props) => {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirmed = confirm("Are you sure you want to delete this note?");
    if (!confirmed) {
      return;
    }

    try {
      const resp = await fetch(`http://localhost:3000/api/notes?id=${id}`, {
        method: "DELETE",
      });
      if (resp.ok) {
        console.log("successfully deleted");
        router.refresh();
      } else {
        throw new Error("Failed to add note");
      }
    } catch (error) {}
  };

  return (
    <button
      onClick={() => handleDelete(id)}
      className="btn btn-circle btn-outline btn-sm text-red-600"
    >
      <HiTrash size={18} />
    </button>
  );
};

export default RemoveButton;
