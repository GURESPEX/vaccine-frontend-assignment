"use client";
import InputForm from "@/components/InputForm";
import SelectForm from "@/components/SelectForm";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { submit } from "./actions";

const initialState = { message: null };

type PersonData = {
  personName: string;
  personId: string;
  gender: string;
  dateOfBirth: string;
};

export default function Home() {
  const personData = useState<PersonData>();
  const [state, formAction] = useFormState<{
    success: boolean;
    message: string;
  }>(submit, initialState);
  console.log(state);

  let reset = false;
  useEffect(() => {}, [reset]);

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
          validate={(str: string) => {
            if (new RegExp("[$&+,:;=?@#|'<>.-^*()%!0-9]", "g").test(str)) {
              return true;
            }
            return false;
          }}
          required
        />
        <InputForm
          name="personId"
          type="text"
          labelName="เลขบัตรประจำตัวประชาชน"
          placeholder="กรอกเลขบัตรประจำตัวประชาชน 13 หลัก"
          validate={(str: string) => {
            if (new RegExp("[0-9]{13}").test(str)) {
              return true;
            }
            return false;
          }}
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
            validate={(str: string) => {
              if (!str) {
                return {
                  status: false,
                  message: "จำเป็นต้องระบุ",
                };
              }
              return { status: true };
            }}
            required
          />
          <InputForm
            name="dateOfBirth"
            type="date"
            labelName="วัน/เดือน/ปี เกิด"
            max={new Date().toISOString().split("T")[0]}
            validate={(str: string) => {
              if (!str) {
                return {
                  status: false,
                  message: "จำเป็นต้องระบุ",
                };
              }
              return { status: true };
            }}
            required
          />
        </div>
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
            onClick={() => {
              reset = !reset;
            }}
          >
            ล้างค่า
          </button>
        </div>
        {state?.message}
      </form>
    </>
  );
}
