"use client";

import Link from "next/link";
import { usePersonStore } from "../stores";
import { redirect } from "next/navigation";

type Validate = {
  status: boolean;
  message?: string;
} | null;

function getBirthdate(age: { years: number; months: number; days: number }) {
  const date = new Date();
  date.setFullYear(date.getFullYear() - age.years);
  date.setMonth(date.getMonth() - age.months);
  date.setDate(date.getDate() - age.days);
  return date;
}

function validate(dateOfBirth: string): Validate {
  const birthday = new Date(dateOfBirth);
  const startDate = new Date("2023-06-01");
  const endDate = new Date("2023-08-31");
  const today = endDate;

  if (
    startDate.getTime() <= today.getTime() &&
    today.getTime() <= endDate.getTime()
  ) {
    console.log("อยู่ในช่วงรับวัคซีน");
    if (birthday > _0Y6M0DBirthdate) {
      return {
        status: false,
        message: `เนื่องจากอายุไม่ถึง 6 เดือน วันที่ ${birthday.toLocaleDateString(
          "th-TH",
          {
            month: "long",
            day: "numeric",
          }
        )} พ.ศ. ${birthday.getFullYear() + 543}`,
      };
    } else if (birthday >= _2Y0M0DBirthdate) {
      return { status: true };
    } else if (birthday > _65Y0M0DBirthdate) {
      return {
        status: false,
        message: `เนื่องจากอายุไม่ถึง 65 ปี วันที่ ${birthday.toLocaleDateString(
          "th-TH",
          {
            month: "long",
            day: "numeric",
          }
        )} พ.ศ. ${birthday.getFullYear() + 543}`,
      };
    } else if (birthday <= _65Y0M0DBirthdate) {
      return {
        status: false,
        message: `เนื่องจากอายุเกิน 65 ปี`,
      };
    } else {
      return { status: true };
    }
  } else {
    return { status: false, message: "เนื่องจากไม่อยู่ในช่วงรับวัคซีน" };
  }
}

const _0Y6M0DBirthdate = getBirthdate({
  years: 0,
  months: 6,
  days: 0,
});
const _2Y0M0DBirthdate = getBirthdate({
  years: 2,
  months: 0,
  days: 0,
});
const _65Y0M0DBirthdate = getBirthdate({
  years: 65,
  months: 0,
  days: 0,
});

export default function Result() {
  const { person, setPerson } = usePersonStore();

  if (!person) {
    redirect("/");
  }

  const personValidate = validate(person.dateOfBirth);

  return (
    <div className="flex flex-col gap-4 p-4 border border-slate-50 rounded bg-white drop-shadow-sm w-full min-w-96 max-w-[512px]">
      <h1 className="flex text-2xl font-bold">ผลลัพธ์</h1>
      <hr />
      <div>ชื่อ-นามสกุล : {person?.personName}</div>
      <div>
        เลขบัตรประจำตัวประชาชน :{" "}
        {person?.personId.replace(
          /(\d{1})(\d{4})(\d{5})(\d{2})(\d{1})/,
          "$1-$2-$3-$4-$5"
        )}
      </div>
      <div>เพศ{person?.gender == "male" ? "ชาย" : "หญิง"}</div>
      <div>
        เกิด
        {new Date(person?.dateOfBirth as string).toLocaleDateString("th-TH", {
          year: "numeric",
          month: "long",
          day: "numeric",
          weekday: "long",
        })}
      </div>
      <div
        className={`px-4 py-2 border ${
          personValidate?.status ? "border-green-200" : "border-red-200"
        } ${
          personValidate?.status ? "bg-green-100" : "bg-red-100"
        } rounded text-center ${
          personValidate?.status ? "text-green-400" : "text-red-400"
        } text-sm`}
      >
        {!!personValidate &&
          (personValidate.status
            ? "สามารถเข้ารับบริการได้"
            : "ไม่สามารถเข้ารับบริการได้")}{" "}
        {(!!personValidate && personValidate.status) || personValidate?.message}
      </div>

      <hr />
      <Link
        href={"/"}
        className="px-4 py-2 border border-slate-400 rounded bg-slate-300 active:bg-slate-400 drop-shadow text-center w-full transition"
        type="submit"
        onClick={() => {
          setPerson({
            personName: "",
            personId: "",
            gender: "",
            dateOfBirth: "",
          });
        }}
      >
        ย้อนกลับ
      </Link>
    </div>
  );
}
