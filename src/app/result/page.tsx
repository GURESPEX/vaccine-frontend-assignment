import Link from "next/link";

export default function Result() {
  return (
    <div className="flex flex-col gap-4 p-4 border border-slate-50 rounded bg-white drop-shadow-sm w-full min-w-96 max-w-[512px]">
      <h1 className="flex text-2xl font-bold">ผลลัพท์</h1>
      <hr />
      <Link
        href={"/"}
        className="px-4 py-2 border border-slate-400 rounded bg-slate-300 active:bg-slate-400 drop-shadow text-center w-full transition"
        type="submit"
      >
        ย้อนกลับ
      </Link>
    </div>
  );
}
