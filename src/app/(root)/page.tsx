"use client";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";
import { useState } from "react";
import { useFormState } from "react-dom";
import { submit } from "../actions";
import { FormError } from "../types/form";
import Link from "next/link";

const initialState: FormError = null;

type PersonData = {
  personName: string;
  personId: string;
  gender: string;
  dateOfBirth: string;
};

export default function Page() {
  const personData = useState<PersonData>();
  const [state, formAction] = useFormState<FormError>(submit, initialState);
  console.log(state);

  return (
    <>
      <form
        className="flex flex-col gap-4 p-4 border border-slate-50 rounded bg-white drop-shadow-sm w-full min-w-96 max-w-[512px]"
        action={formAction}
      >
        <h1 className="flex text-2xl font-bold">ลงทะเบียน</h1>
        <hr />
        <InputForm
          name="personName"
          type="text"
          labelName="ชื่อ-นามสกุล"
          placeholder="กรอกชื่อและนามสกุล"
          maxLength={100}
          required
        />
        <InputForm
          name="personId"
          type="number"
          labelName="เลขบัตรประจำตัวประชาชน"
          placeholder="กรอกเลขบัตรประจำตัวประชาชน 13 หลัก"
          maxLength={13}
          required
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <SelectForm
            options={[
              {
                optionName: "ชาย",
                value: "male",
              },
              {
                optionName: "หญิง",
                value: "male",
              },
            ]}
            name="gender"
            labelName="เพศ"
            defaultValueName="ระบุเพศ"
            required
          />
          <InputForm
            name="dateOfBirth"
            type="date"
            labelName="วัน/เดือน/ปี เกิด"
            max={new Date().toISOString().split("T")[0]}
            required
          />
        </div>
        {state && (
          <div
            className={`px-2 py-1 border ${
              state.status ? "border-green-200" : "border-red-200"
            } ${
              state.status ? "bg-green-100" : "bg-red-100"
            } rounded text-center ${
              state.status ? "text-green-400" : "text-red-400"
            } text-sm`}
          >
            {state.message}
          </div>
        )}
        <div className="flex flex-row gap-4">
          <button
            className="px-4 py-2 border border-sky-500 rounded bg-sky-400 active:bg-sky-600 drop-shadow text-white w-full transition"
            type="submit"
          >
            ยืนยัน
          </button>
          <button
            className="px-4 py-2 border border-slate-400 rounded bg-slate-300 active:bg-slate-400 drop-shadow w-full transition"
            type="reset"
          >
            ล้างค่า
          </button>
        </div>
        <div className="flex flex-row gap-4">
          <Link
            href={"/info"}
            className="px-4 py-2 border border-sky-500 rounded bg-sky-400 active:bg-sky-600 drop-shadow text-white text-center w-full transition"
            type="submit"
          >
            Go to Info
          </Link>
        </div>
      </form>
    </>
  );
}
