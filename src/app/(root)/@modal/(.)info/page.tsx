import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  const router = useRouter();
  return (
    <div className=" w-screen h-screen container flex flex-col items-center gap-4 backdrop-blur">
      <div className="flex flex-col gap-4 p-4 border border-slate-50 rounded bg-white drop-shadow-sm w-full min-w-96 max-w-[512px]">
        <h1 className="flex text-2xl font-bold">ยืนยันข้อมูล</h1>
        <hr />
        <button
          onClick={() => {
            router.push("/");
          }}
          className="px-4 py-2 border border-slate-400 rounded bg-slate-300 active:bg-slate-400 drop-shadow text-center w-full transition"
          type="submit"
        >
          ย้อนกลับ
        </button>
        <Link
          href={"/result"}
          className="px-4 py-2 border border-sky-500 rounded bg-sky-400 active:bg-sky-600 drop-shadow text-white text-center w-full transition"
          type="submit"
        >
          ตรวจสอบ
        </Link>
      </div>
    </div>
  );
}
